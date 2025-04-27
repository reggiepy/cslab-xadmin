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

const FieldGroup = ({ label, meta, input, field, tailLayout, children }) => {
  const attrs = field.attrs || {}
  const error = meta.touched && (meta.error || meta.submitError)
  const extra = field.description || field.help

  const controlComponent = children ? children : (<Input {...input} {...attrs} />)
  return (
    <FormItem error={error} className='flex space-x-4 space-y-0'>
      <FormLabel className='w-1/6 h-9 flex items-center justify-end'>{field.required && <span className='text-destructive'>*</span>}{label}</FormLabel>
      <div className='flex-2'>
        <FormControl>
          {controlComponent}
        </FormControl>
        { extra && <FormDescription>{extra}</FormDescription> }
        <FormMessage>{field.formText}</FormMessage>
      </div>
    </FormItem>
  )
}

const InlineGroup = ({ label, meta, input, field, children }) => {
  const attrs = field.attrs || {}
  const error = meta.touched && (meta.error || meta.submitError)
  const extra = field.description || field.help

  const controlComponent = children ? children : (<Input {...input} {...attrs} placeholder={label} />)
  return (
    <FormItem error={error} className='flex flex-col space-y-2'>
      <FormControl>
        {controlComponent}
      </FormControl>
      { extra && <FormDescription>{extra}</FormDescription> }
      <FormMessage>{field.formText}</FormMessage>
    </FormItem>
  )
}

const SimpleGroup = ({ label, meta, input, field, children }) => {
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

const ColGroup = ({ label, meta, input, field, children }) => {
  const attrs = field.attrs || {}
  const error = meta.touched && (meta.error || meta.submitError)
  const extra = field.description || field.help

  const controlComponent = children ? children : (<Input {...input} {...attrs} />)

  return (
    <FormItem error={error}>
      <FormLabel>{field.required && <span className='text-destructive'>*</span>}{label}</FormLabel>
      <FormControl>
        {controlComponent}
      </FormControl>
      { extra && <FormDescription>{extra}</FormDescription> }
      <FormMessage>{field.formText}</FormMessage>
    </FormItem>
  )
}

export {
  FieldGroup, InlineGroup, ColGroup, SimpleGroup
}
