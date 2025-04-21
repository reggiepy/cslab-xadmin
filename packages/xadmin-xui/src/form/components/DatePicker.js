import React from 'react'
import moment from 'moment'

import { DateTimePicker } from 'xui'

const DatePickerInput = ({ input, field }) => {
  const format = field.datetimeFormat || 'YYYY-MM-DD'

  const getValue = (value) => {
    return moment(value).toDate()
  }

  const formatValue = (value) => {  
    return moment(value).format(format)
  }

  const onChange = (value) => {
    input.onChange(formatValue(value))
  }

  return (
      <div className='w-60'>
        <DateTimePicker
          clearable
          value={input.value ? getValue(input.value) : new Date()}
          onChange={onChange}
          onBlur={input.onBlur}
          hideTime
        />
      </div>
  )
}

export default DatePickerInput
