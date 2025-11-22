import React from 'react'
import { Textarea } from "@/components/ui/textarea"

export default ({ input, field }) => {
  return <Textarea rows={4} {...input} {...field.attrs} />
}
