import React from 'react'
import _ from 'lodash'
import {
  Button,
  DropdownMenuItem,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  Spin,
} from "xui";
import { SchemaForm } from 'xadmin-form'
import { app, use } from 'xadmin'

const BatchChangeBtn = props => {
  const { _t } = app.context
  const [show, setShow] = React.useState(false)
  const { canEdit, fields, loading, onBatchChange } = use('actons.batch_change')
  const { selected } = use('model.select')
  const { model } = use('model')

  const onClose = () => setShow(false)

  const renderModel = () => {
    const fs = fields.map(f => f.split('.')[0])
    return (
      <SchemaForm key="actions_batch_change_form" formKey={`model_batch.${model.key}`}
        schema={_.omit({
          ...model,
          properties: _.pick(model.properties, fs),
          form: model.form !== undefined ? fs.map(name => _.find(model.form, f => f && f.key == name) || name) : ['*']
        }, 'required')}
        onSubmit={onBatchChange}
        onSubmitSuccess={onClose}
        onClose={onClose}>
        {({ children, invalid, handleSubmit, submitting, onClose }) => (
          <Dialog
            key="actions_batch_change_modal"
            open={show}
            onOpenChange={setShow}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{_t('Please input the value to batch change items')}</DialogTitle>
              </DialogHeader>
              <form className="flex flex-col gap-y-4 pt-4 pb-4" onSubmit={handleSubmit}>{children}</form>
              <DialogFooter>
                <Button variant="secondary" onClick={onClose}>
                  {_t('Cancel')}
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={invalid || submitting || loading}
                >
                  {loading && <Spin />}{_t('Change')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </SchemaForm>
    )
  }

  return (canEdit && fields.length > 0) ? [(
    <DropdownMenuItem {...props} key="actions_batch_change"
      onClick={(e) => {
        props.onClick && props.onClick(e)
        setShow(true)
      }} disabled={selected.length == 0}>
      {_t('Batch Change Items')}
    </DropdownMenuItem>
  ),
  selected.length > 0 ? renderModel() : null
  ] : null

}

export default BatchChangeBtn
