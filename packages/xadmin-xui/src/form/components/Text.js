import React from 'react'
import { Input } from 'xui'

export default ({ input, field }) => {
  return <Input {...input} {...field.attrs} />
}
