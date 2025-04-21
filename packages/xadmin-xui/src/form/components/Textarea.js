import React from 'react'
import { Textarea } from "xui"

export default ({ input, field }) => {
  return <Textarea rows={4} {...input} {...field.attrs} />
}
