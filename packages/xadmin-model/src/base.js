import React from 'react'
import _ from 'lodash'
import { Block, app, use } from 'xadmin'
import { C } from 'xadmin-ui'
import { Routes, Route } from "react-router-dom"
import modelAtoms from './atoms'
import { useAtomCallback } from 'jotai/utils'

const ModelContext = React.createContext(null)

const modelAtomsMap = {}

const getModel = (name, key, props) => {
  const model = app.get('models')[name]
  if(!model) {
    throw Error(`Model '${name}' not found!`)
  }
  model.name = model.name || name
  return {
    ...model,
    key: key || model.name,
    ...props
  }
}

const ModelInitial = ({ model, initialValues, children }) => {
  const query = use('query')
  const [ loading, setLoading ] = React.useState(true)

  const initializeState = useAtomCallback(React.useCallback((get, set) => {
    let initial = initialValues || {}
    if(model.initialValues) {
      let modelInitial = _.isFunction(model.initialValues) ? model.initialValues() : model.initialValues
      initial = { ...modelInitial, ...initial }
    }
    const { wheres={}, ...option } = initial

    const defaultOpt = {
      fields: [ ...(model.listFields || []) ],
      order: model.defaultOrder || model.orders || {},
      limit: model.defaultPageSize || 15,
      skip: 0
    }
    if(query && !_.isEmpty(query)) {
      const filterQuery = Object.keys(query).reduce((p, key) => {
        if(key.startsWith('f_')) {
          p[key.substring(2)] = query[key]
        }
        return p
      }, {})
      if(!_.isEmpty(filterQuery)) {
        wheres.param_filter = filterQuery
      }
    }
    
    set(model.atoms.option, { ...defaultOpt, ...option })
    set(model.atoms.wheres, wheres)
  }, [initialValues, model, query]))

  React.useEffect(() => {
    initializeState()
    setLoading(false)
  }, [])

  return !loading ? children : null
}

const Model = ({ name, schema, modelKey, initialValues, children, atoms: outterAtoms, forceNewAtoms, props: modelProps }) => {
  const model = React.useMemo(() => {
    const model =  name ? getModel(name, modelKey, modelProps) : {
      ...schema,
      key: modelKey || schema.name,
      ...modelProps
    }
    let atoms
    if(outterAtoms) {
      atoms = outterAtoms
    } else if(forceNewAtoms){
      atoms = [ modelAtoms, ...app.get('modelAtoms') ].reduce((p, getAtoms) => {
        return { ...p, ...getAtoms(id => `model.${model.key}.${id}`, model)}
      }, {})
    } else {
      if(!modelAtomsMap[model.key]) {
        modelAtomsMap[model.key] = [ modelAtoms, ...app.get('modelAtoms') ].reduce((p, getAtoms) => {
          return { ...p, ...getAtoms(id => `model.${model.key}.${id}`, model)}
        }, {})
      }
      atoms = modelAtomsMap[model.key]
    }
    return { ...model, atoms }
  }, [ name, schema, modelKey, outterAtoms ])

  return model && (
    <ModelContext.Provider value={model}>
      <ModelInitial initialValues={initialValues} model={model} >
        {children}
      </ModelInitial>
    </ModelContext.Provider>
  )
}

const ModelBlock = (props) => (
  <ModelContext.Consumer>
    { model => (
      <Block model={model} {...props} >
        { blocks => {
          const modelBlock = model && model.blocks && model.blocks[props.name]
          if(modelBlock) {
            const mb = modelBlock(props)
            blocks = blocks ? [ mb, ...blocks ] : [ mb ]
          }
          return props.children ? props.children(blocks) : blocks
        } }
      </Block>
    ) }
  </ModelContext.Consumer>
)

const ModelRoutes = () => {
  const { model } = use('model')

  const ModelList = model.components && model.components['ListPage'] || C('Model.ListPage')
  const ModelDetail =  model.components && model.components['DetailPage'] || C('Model.DetailPage')
  const ModelAddForm = model.components && model.components['AddPage'] || C('Model.FormPage')
  const ModelEditForm = model.components && model.components['EditPage'] || C('Model.FormPage')

  return (
    <Routes>
      { (!model.permission || model.permission.view) && <Route
        path="/"
        element={<ModelList />}
      /> }
      { (!model.permission || model.permission.view) && <Route
        path="list"
        element={<ModelList />}
      /> }
      { (!model.permission || model.permission.view) && <Route
        path=":id/detail"
        element={<ModelDetail />}
      /> }
      { (!model.permission || model.permission.add) && <Route
        path="add"
        element={<ModelAddForm />}
      /> }
      { (!model.permission || model.permission.edit) && <Route
        path=":id/edit"
        element={<ModelEditForm />}
      /> }
    </Routes>
  )
}

export {
  ModelContext,
  ModelBlock,
  ModelRoutes,
  Model
}
