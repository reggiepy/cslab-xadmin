import React from 'react'
import {
  Button,
  Card,
  CardContent,
  Spin,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "xui"

import app from 'xadmin'
import _ from 'lodash'

const FormLayout = props => {
  const { children, invalid, handleSubmit, submitting, onCancel } = props
  const { _t } = app.context
  
  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {children}
          <div className='flex gap-4 justify-center'>
            <Button type="submit" disabled={invalid || submitting}>{submitting && <Spin /> }{_t('Save')}</Button>
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
    <Dialog open={show} onOpenChange={open => !open && onClose ? onClose() : null}>
      <DialogContent className="sm:max-w-4xl w-5/6 max-h-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-6 space-y-6">
            {children}
          </div>
          <DialogFooter>
            <div className='flex gap-4 mt-6'>
              <Button type="submit" disabled={invalid || submitting}>{submitting && <Spin /> }{saveText || _t('Save')}</Button>
              <Button onClick={() => onClose ? onClose() : history.back()}>{_t('Cancel')}</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { FormLayout, ModalLayout }
