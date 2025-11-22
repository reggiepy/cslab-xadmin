import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useFormField } from '@/components/ui/formui'

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
