import React from 'react'
import { Form, Modal } from 'antd'
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import {
  Card,
  CardContent
} from "@/components/ui/card"

import {
  FormControl,
  FormItem
} from "@/components/ui/formui"

import app from 'xadmin'
import _ from 'lodash'

const FormLayout = props => {
  const { children, invalid, handleSubmit, submitting, onCancel } = props
  const { _t } = app.context
  
  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          {children}
          <div className='flex gap-4 justify-center'>
            <Button type="submit" disabled={invalid || submitting}>{submitting && <Loader2 className="animate-spin" /> }{_t('Save')}</Button>
            <Button onClick={() => onCancel ? onCancel() : history.back()}>{_t('Cancel')}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

const ModalLayout = ({ children, invalid, handleSubmit, submitting, title, show, onClose, saveText }) => {
  const { _t } = app.context

  return (
    <Modal visible={show} onClose={onClose} style={{ maxWidth: 700 }} width="95%"
      title={title}
      okText={saveText || _t('Save')}
      onOk={handleSubmit}
      okButtonProps={{ disabled: invalid, loading: submitting }}
      cancelText={_t('Cancel')}
      onCancel={onClose}
    >
      <Form onSubmit={handleSubmit}>{children}</Form>
    </Modal>
  )
}

export { FormLayout, ModalLayout }
