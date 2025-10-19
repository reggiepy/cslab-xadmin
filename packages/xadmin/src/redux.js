import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import _ from 'lodash'
import { Routes, BrowserRouter, HashRouter, Route, Outlet, useRoutes, useNavigate, useHref, useLocation, useMatch, useParams, useOutlet, useSearchParams } from "react-router-dom"
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

// redux app
const redux_app = {
  name: 'redux',
  items: {
    reducers: { type: 'mapArray' },
    'redux/subscribe': { type: 'array' },
    'redux/on_create': { type: 'array' },
    'redux/middlewares': { type: 'array' },
    'redux/store_enhancers': { type: 'array' },
    'redux/reducer_enhance': { type: 'mapArray' }
  },
  context: (app) => (context, cb) => {

    const enhancers = [
      applyMiddleware(...app.get('redux/middlewares')),
      ...app.$('redux/store_enhancers')
    ]

    const enhance_reducer = (key, reducer) => {
      const reducer_enhance = app.get('redux/reducer_enhance')
      if(reducer_enhance[key] !== undefined) {
        const reducers = [ reducer, ...reducer_enhance[key] ]
        return (state, action) => {
          return reducers.reduce((prev, reducer) => reducer(prev, action), state)
        }
      }
      return reducer
    }

    const combine_reducer = (key, reducers) => {
      if(reducers.length > 1) {
        return (state, action) => {
          return reducers.reduce((prev, reducer) => reducer(prev, action) , state)
        }
      } else {
        return reducers[0]
      }
    }
    
    const create_reducers = () => {
      const reducers_map = app.get('reducers')
      let reducers = {}
      for(const key in reducers_map) {
        reducers[key] = combine_reducer(key, reducers_map[key])
      }
      return combineReducers(reducers)
    }
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    // create store
    const store = createStore(
      create_reducers(),
      context['initial_state'] || {},
      composeEnhancers(...enhancers)
    )

    cb(null, { ...context, store })
  },
  start: (app) => () => {
    // store change
    const { store } = app.context
    const listeners = app.get('redux/subscribe')
    for (const listener of listeners) {
      store.subscribe(listener)
    }
    app.get('redux/on_create').forEach((callback) => callback(store))
  }
}

// saga app
const sagaMiddleware = createSagaMiddleware()
const sage_app = {
  items: {
    effects: { type: 'array' }
  },
  context: (app) => (context, cb) => {
    // extend store
    const { store } = context
    store.runSaga = sagaMiddleware.run

    // start saga
    const effects = app.get('effects')
    effects.forEach(sagaMiddleware.run)
    cb(null, context)
  },
  'redux/middlewares': (app) => { return sagaMiddleware }
}

// react-redux app
const react_redux_app = {
  name: 'react_redux',
  root_component: (app) => (children) => (
    <Provider store={app.context.store}>{children}</Provider>
  ),
  hooks: (app) => ({
    'redux': (select) => {
      const store = app.context.store
      const { getState, dispatch, subscribe } = store

      if(select) {
        const state = getState()
        const [ values, setValues ] = React.useState(select(state) || {})
        const lastValues = React.useRef()
        lastValues.current = values

        const updateState = () => {
          const newValues = select(getState())
          if (!_.isEqual(lastValues.current, newValues)) {
            setValues(newValues)
          }
        }
        React.useEffect(() => {
          return subscribe(updateState)
        }, [])

        return { store, dispatch: dispatch, state, ...values }
      } else {
        return { store, dispatch: dispatch, state: getState() }
      }
    }
  })
}

export default app => {
  return app.use(redux_app).use(sage_app).use(react_redux_app)
}
