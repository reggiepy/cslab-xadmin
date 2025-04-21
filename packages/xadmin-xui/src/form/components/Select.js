import React from 'react'
import {
  Select
} from "xui"

export default ({ input, label, field }) => {
  return (
    <Select options={[ ...field.titleMap ].map(o => ({ label: o.name, value: o.value }))}  placeholder={label} {...input}>
    </Select>
  )
}
