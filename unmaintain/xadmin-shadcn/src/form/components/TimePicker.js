import React from 'react'
import { TimePicker } from '@/components/ui/time-picker'
import moment from 'moment'

export default ({ input: { onChange, value, ...inputProp }, field }) => {
  const format = field.timeFormat || 'HH:mm:ss'
  const onTimeChange = value => {
    onChange(value && moment(value).format(format))
  }
  return <div className='w-40'><TimePicker onChange={onTimeChange} value={value?moment(value, format).toDate(): new Date()} {...inputProp} /></div>
}
