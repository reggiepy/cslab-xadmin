import React from 'react'
import _ from 'lodash'
import { Input } from 'xui'

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "xui"

const AuthGroup = ({ label, meta, input, field, children }) => {
  const attrs = field.attrs || {}
  const error = meta.touched && (meta.error || meta.submitError)
  const extra = field.description || field.help

  const controlComponent = children ? children : (<Input {...input} {...attrs} />)
  return (
    <FormItem error={error}>
      <FormLabel>{label}{field.required && <span className='text-destructive'>*</span>}</FormLabel>
      <FormControl>
        {controlComponent}
      </FormControl>
      { extra && <FormDescription>{extra}</FormDescription> }
      <FormMessage>{field.formText}</FormMessage>
    </FormItem>
  )
}

export default AuthGroup