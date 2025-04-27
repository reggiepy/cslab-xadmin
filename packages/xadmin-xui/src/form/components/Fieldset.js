import React from 'react'

import { objectBuilder } from 'xadmin-form'

export default ({ input, label, meta: { touched, error }, field, group, option }) => {
  return (
    <div className='rounded-md border p-4 space-y-4'>
      {objectBuilder(field.fields, field.fieldsRender, { ...option, group })}
    </div>
  )
}
