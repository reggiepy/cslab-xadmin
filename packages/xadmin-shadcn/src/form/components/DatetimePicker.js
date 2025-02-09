import React from 'react'
import moment from 'moment'
import { DateTimePicker } from '@/components/ui/datetime-picker'

export default ({ input, field }) => {
  const format = field.datetimeFormat || 'YYYY-MM-DD HH:mm:ss';

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
    <div className='w-80'>
      <DateTimePicker
        clearable
        value={input.value ? getValue(input.value) : new Date()}
        onChange={onChange}
        onBlur={input.onBlur}
      />
    </div>
  );
};
