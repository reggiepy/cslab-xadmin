import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import { Routes, BrowserRouter, HashRouter, Route, Outlet, useRoutes, useNavigate, useHref, useLocation, useMatch, useParams, useOutlet, useSearchParams } from "react-router-dom"

const configToRouter = r => {
  // ole router format
  if(!r.element && r.component) {
    const RouterComponent = r.component
    r.element = <RouterComponent><Outlet /></RouterComponent>
    delete r.component
  }
  if(r.childRoutes) {
    r.children = r.childRoutes
    delete r.childRoutes
  }
  return <Route {..._.omit(r, 'children')} >{(r.children || []).map(configToRouter)}</Route>
}

const AppRouters = ({ app, routers }) => {
  app.go = useNavigate()

  const find_childs = (path) => {
    return (routers[path] || []).map((r) => {
      const childs = r.path ? find_childs((path == '@' ? '' : path) + r.path) : []

      let routerElement = null
      if(React.isValidElement(r)) {
        routerElement = r
      } else if(_.isPlainObject(r)) {
        routerElement = configToRouter(r)
      }
      if(childs.length > 0) {
        routerElement = React.cloneElement(routerElement, {}, ...(routerElement.props?.children || []), ...childs)
      }
      return routerElement
    }).filter(Boolean)
  }

  return <Routes>{find_childs('@')[0]}</Routes>
}

// react & react-router app
const react_app = {
  name: 'react',
  items: {
    routers: { type: 'mapArray' },
    root_component: { type: 'array' }
  },
  hooks: {
    location: () => useLocation(),
    navigate: () => useNavigate(),
    params: () => useParams(),
    outlet: () => useOutlet(),
    match: props => useMatch(props),
    href: props => useHref(props),
    routes: () => useRoutes(),
    searchParams: () => useSearchParams(),
    query: () => {
      const [ searchParams ] = useSearchParams()
      return _.fromPairs(Array.from(searchParams.entries()))
    }
  },
  start: (app) => () => {
    // init container
    let { container='#app' } = app.context
    if (typeof container === 'string') {
      container = document.querySelector(container)
    }

    const routerType = app.config('router') || 'browser'
    const RootRouter = (typeof routerType === 'string') ? {
      browser: BrowserRouter,
      hash: HashRouter
    }[routerType] : routerType

    const routers = app.get('routers')
    
    const root = app.get('root_component').reduce((children, render) => {
      return render(children)
    }, (routers && !_.isEmpty(routers)) ? (
      <RootRouter>
        <AppRouters app={app} routers={routers} />
      </RootRouter> 
    ) : <span>Please config routers or Main component.</span>)

    if(ReactDOM.createRoot) {
      ReactDOM.createRoot(container).render(root)
    } else {
      ReactDOM.render(root, container)
    }
  }
}

export default app => {
  return app.use(react_app)
}
