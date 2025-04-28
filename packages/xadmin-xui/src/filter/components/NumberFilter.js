import React from 'react'
import _ from 'lodash'
import app from 'xadmin'
import { InputNumber } from 'xui'

const NumberFilter = props => {
  const { input: { name, value, onBlur, onChange, ...inputProps }, field } = props
  const { _t } = app.context

  const gte = !_.isNil(value.gte) ? value.gte : ''
  const lte = !_.isNil(value.lte) ? value.lte : ''

  const inputChange = (v, k) => {
    const vs = _.pickBy({ ...value, [k]: _.toNumber(v) }, _.isNumber)
    onChange(_.isEmpty(vs) ? null : vs)
  }
  return (
    <div className='flex space-x-1 items-center'>
      <InputNumber type="number" {...inputProps} {...field.attrs} value={gte}
        placeholder={field.minimum ? `Minimum(${field.minimum})` : _t('No limit')}
        onChange={value => inputChange(value, 'gte')} />
      <div>~</div>
      <InputNumber type="number" {...inputProps} {...field.attrs} value={lte}
        placeholder={field.maximum ? `Maximum(${field.maximum})` : _t('No limit')}
        onChange={value => inputChange(value, 'lte')} />
    </div>
  )
}

export default NumberFilter
