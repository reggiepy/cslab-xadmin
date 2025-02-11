import React from 'react'
import { FieldArray } from 'xadmin-form'
import { TrashIcon, PlusIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { objectBuilder, prefixFieldKey } from 'xadmin-form'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import app from 'xadmin'

const defaultItemsRender = ({ fields, meta: { touched, error }, field, fieldsBuilder }) => {
  const { items, label } = field
  return (
    <div className='space-y-4 flex flex-col'>
      <Button type="button" onClick={() => fields.push(null)}><PlusIcon /></Button>
      {fields.map((name, index) => {
        const removeBtn = (<Button type="button" variant="ghost" onClick={(e) => { fields.remove(index); e.persist() }}><TrashIcon /></Button>)
        const fieldsComponent = fieldsBuilder(name, index, removeBtn)
        return fieldsComponent.length > 1 ? (
          <Card
          >
            <CardHeader>
              <CardTitle>{label + ' ' + (index + 1)} {removeBtn}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
            {fieldsComponent}
            </CardContent>
          </Card>
        ) : fieldsComponent
      })}
      {(touched && error) ? error : null}
    </div>
  );
}

export default ({ input, label, meta, field, option, group }) => {
  let renderItems = field.itemsRender || defaultItemsRender
  if(typeof renderItems === 'string') {
    renderItems = app.load_dict('array_render')[renderItems]
  }
  const { items } = field
  const fieldsBuilder = (name, index, removeBtn, itemLable) => {
    const itemLabel = itemLable || (<div>{removeBtn ? removeBtn : ''}</div>)
    const itemFields = items.fields ? 
      (items.fields.map(f => prefixFieldKey(f, name + '.'))) : 
      [ { ...items, key: name, name: name, label: itemLabel } ]

    return objectBuilder(itemFields, items.render, option)
  }
  return (
    <FieldArray name={field.name} label={label} meta={meta} input={input} component={renderItems} field={field} group={group} fieldsBuilder={fieldsBuilder} />
  )
}
