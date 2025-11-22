import React from 'react'
import { Input } from '@/components/ui/input'

export default ({ input, field }) => {
  return <Input {...input} {...field.attrs} />
}
