import React from 'react'
import {
  Card,
  CardContent
} from "xui"
import { objectBuilder } from 'xadmin-form'

export default ({ input, label, meta: { touched, error }, field, group, option }) => {
  return (
    <Card>
      <CardContent className='space-y-6 mt-6'>
        {objectBuilder(field.fields, field.fieldsRender, { ...option, group })}
      </CardContent>
    </Card>
  )
}
