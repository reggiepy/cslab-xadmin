import React from 'react'
import _ from 'lodash'
import { Form, Col } from 'antd'
import { Input } from '@/components/ui/input'

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/formui"

const FieldGroup = ({ label, meta, input, field, tailLayout, children }) => {
  const attrs = field.attrs || {}
  const error = meta.touched && (meta.error || meta.submitError)
  const extra = field.description || field.help

  // const size = (field.option && field.option.groupSize) || attrs.groupSize || { 
  //   labelCol: {
  //     xs: { span: 24 },
  //     sm: { span: 5 }
  //   },
  //   wrapperCol: {
  //     xs: { span: 24 },
  //     sm: { span: 19,  offset: tailLayout ? 5 : 0 }
  //   }
  // }

  // const groupProps = { extra, ...size, required: field.required }

  // if (error) {
  //   groupProps['validateStatus'] = 'error'
  //   if(_.isString(error)) {
  //     groupProps['help'] = error
  //   }
  // }

  const controlComponent = children ? children : (<Input {...input} {...attrs} />)
  return (
    <FormItem error={error} className='flex space-x-4 space-y-0'>
      <FormLabel className='w-1/6 h-9 flex items-center justify-end'>{label}</FormLabel>
      <div className='flex-1'>
        <FormControl>
          {controlComponent}
        </FormControl>
        { extra && <FormDescription>{extra}</FormDescription> }
        <FormMessage>{field.formText}</FormMessage>
      </div>
    </FormItem>
  )
}

const FieldTableGroup = ({ label, meta, input, field, nav, children }) => {
  const attrs = field.attrs || {}
  const error = meta.touched && (meta.error || meta.submitError)
  const extra = field.description || field.help
  const size = (field.option && field.option.groupSize) || attrs.groupSize || { 
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 }
    }
  }

  const groupProps = { extra, ...size, required: field.required }

  if (error) {
    groupProps['validateStatus'] = 'error'
    groupProps['help'] = error
  }


  const controlComponent = children ? children : (<Input {...input} {...attrs} />)
  return (
    <>
      <Form.Item label={label} {...groupProps}>
        {nav}
        {field.formText ? <span className="ant-form-text"> {field.formText}</span> : null}
      </Form.Item>
      {controlComponent}
    </>
  )
}

const InlineGroup = ({ label, meta, input, field, children }) => {
  const attrs = field.attrs || {}
  const error = meta.touched && (meta.error || meta.submitError)
  const extra = field.description || field.help
  const groupProps = { extra, required: field.required }

  if (error) {
    groupProps['validateStatus'] = 'error'
    groupProps['help'] = error
  }

  const controlComponent = children ? children : (<Input {...input} {...attrs} />)
  return (
    <Form.Item {...groupProps}>
      {React.cloneElement(controlComponent, { inline: true } )}
      {field.formText ? <span className="ant-form-text"> {field.formText}</span> : null}
    </Form.Item>
  )
}

const SimpleGroup = ({ label, meta, input, field, children }) => {
  const attrs = field.attrs || {}
  const error = meta.touched && (meta.error || meta.submitError)
  const extra = field.description || field.help
  const groupProps = { extra, required: field.required }

  if (error) {
    groupProps['validateStatus'] = 'error'
    groupProps['help'] = error
  }

  const controlComponent = children ? children : (<Input {...input} {...attrs} />)
  return (
    <Form.Item label={label} {...groupProps}>
      {controlComponent}
      {field.formText ? <span className="ant-form-text"> {field.formText}</span> : null}
    </Form.Item>
  )
}

const ColGroup = ({ label, meta, input, field, children }) => {
  const attrs = field.attrs || {}
  const error = meta.touched && (meta.error || meta.submitError)
  const extra = field.description || field.help
  const size = (field.option && field.option.groupSize) || attrs.groupSize || { 
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  }

  const groupProps = { extra, ...size, required: field.required }

  if (error) {
    groupProps['validateStatus'] = 'error'
    groupProps['help'] = error
  }

  const controlComponent = children ? children : (<Input {...input} {...attrs} />)
  return (
    <Col span={8} xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
      <Form.Item label={label} {...groupProps}>
        {controlComponent}
        {field.formText ? <span className="ant-form-text">{field.formText}</span> : null}
      </Form.Item>
    </Col>
  )
}

export {
  FieldGroup, FieldTableGroup, InlineGroup, ColGroup, SimpleGroup
}
