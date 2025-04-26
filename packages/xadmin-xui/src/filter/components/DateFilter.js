import React, { useCallback } from 'react'
import { DateRangePicker } from 'xui'
import moment from 'moment'
import _ from 'lodash'

const DatePickerFilter = (props) => {
  const { input, field } = props
  
  const getValue = useCallback(({dateFrom, dateTo}) => {
    const format = field.datetimeFormat || 'YYYY-MM-DD'
    
    return {
      rule: 'range',
      gte: moment(dateFrom).format(format),
      lte: moment(dateTo).format(format)
    }
  }, [field]);
  
  const onRangeChange = useCallback((value) => {
    input.onChange(getValue(value))
  }, [input, getValue]);
  
  let value = input.value;
  if(_.isPlainObject(value) && value.gte && value.lte) {
    const format = field.datetimeFormat || 'YYYY-MM-DD'
    value = { 
      dateFrom: moment(value.gte, format), 
      dateTo: moment(value.lte, format) 
    }
  }
  
  return <DateRangePicker onUpdate={onRangeChange} {...value} />
}

export default DatePickerFilter
