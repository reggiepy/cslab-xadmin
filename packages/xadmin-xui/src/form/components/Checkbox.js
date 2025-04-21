import React from 'react'
import { Checkbox } from "xui"
import { Label } from "xui"
import { useFormField } from 'xui'

const CheckboxComponent = ({ input, label, field, meta, group: FieldGroup }) => {
  const { formItemId } = useFormField()
  return (
    <FieldGroup meta={meta} input={input} field={field} tailLayout={true}>
      <div className="flex items-center gap-2">
        <Checkbox
          id={formItemId}
          checked={input.value}
          onCheckedChange={input.onChange}
        />
        <Label htmlFor={formItemId}>{label}</Label>
      </div>
    </FieldGroup>
  )
}
CheckboxComponent.useGroup = false
export default CheckboxComponent
