import React from 'react'
import app, { use } from 'xadmin'
import { Loading } from 'xadmin-ui'
import { TransferList } from 'xui'
import _ from 'lodash'

const RelateMultiTransfer = ({ input: { value, onChange }, field }) => {
  const { loading, options } = use('model.relate.select', { field })
  const data = React.useMemo(() => options.map(opt => ({ key: opt.value, label: opt.label })), [ options ])

  const onSelectChange = (targetKeys) => {
    onChange(options.filter(opt=>targetKeys.indexOf(opt.value)>=0).map(opt => opt.item))
  }

  return loading ? <Loading /> : (
    <TransferList
      items={data}
      value={value ? value.map(item=>item.id) : []}
      onChange={onSelectChange}
      {...field.attrs}
    />
  )

}

export default RelateMultiTransfer
