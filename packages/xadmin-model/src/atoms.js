import _ from 'lodash'
import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'

const modelAtoms = (k, model) => {
  
  const ids = atom([])

  const item = atomFamily(() => atom({}))

  const items = atom(
    (get) => get(ids).map(id => get(item(id))).filter(item => !_.isNil(item)),
    (get, set, newItems) => {
      const newIds = newItems.map(record => {
        if(_.isNil(record.id)) {
          // record without id field should throw warnning.
          return null
        }
        set(item(record.id), record)
        return record.id
      }).filter(Boolean)
      set(ids, newIds)
    }
  )

  const count = atom(0)

  const selected = atom([])

  const option = atom({})

  const optionSelector = (key) => atom(
    (get) => get(option)[key],
    (get, set, value) => {
      set(option, {
        ...get(option),
        [key]: value
      })
    }
  )

  const fields = optionSelector('fields')

  const order = optionSelector('order')

  const limit = optionSelector('limit')

  const skip = optionSelector('skip')

  const wheres = atom({})

  const where = atomFamily((id) => atom(
    (get) => {
      return get(wheres)[id]
    },
    (get, set, whereValue) => {
      set(wheres, { ..._.omit(get(wheres), id), ...(!_.isEmpty(whereValue) ? { [id]: whereValue } : {}) })
      set(skip, 0)
    }
  ))

  const loading = atomFamily(() => atom(false))

  const itemSelected = atomFamily((id) => atom(
    (get) => {
      return get(selected).find(item => item.id == id) !== undefined
    },
    (get, set, isSelect) => {
      const selectedItems = get(selected).filter(i => { return i.id !== id })
      if (isSelect) {
        selectedItems.push(get(item(id)))
      }
      set(selected, selectedItems)
    }
  ))

  const allSelected = atom(
    (get) => {
      const selects = get(selected).map(item => item.id)
      return _.every(get(ids), id => selects.indexOf(id) >= 0)
    },
    (get, set, selectAll) => {
      if(selectAll) {
        set(selected, _.unionWith(get(selected), get(items), (a, b) => a.id == b.id))
      } else {
        set(selected, _.differenceWith(get(selected), get(items), (a, b) => a.id == b.id))
      }
    }
  )

  const itemOrder = atomFamily((field) => atom(
    (get) => {
      const orders = get(order)
      return orders !== undefined ? (orders[field] || '') : ''
    },
    (get, set, newOrder) => {
      const orders = get(order)
      set(order, { ...orders, [field]: newOrder })
    }
  ))
  
  return {
    ids, item, items, selected, count, option, optionSelector, fields, order, limit, skip, wheres, where, loading, itemSelected, allSelected, itemOrder
  }
}

export default modelAtoms