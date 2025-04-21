import React from 'react'
import { RadioGroup, RadioGroupItem, useFormField } from "xui"

export default ({ input, field }) => {
  const { formItemId } = useFormField()

  return (
    <RadioGroup {...input} value={input.value} onValueChange={input.onChange(value)} >
      {field.titleMap.map((option, index) => (
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`${formItemId}-${index}`} />
            <Label htmlFor={`${formItemId}-${index}`}>{option.name}</Label>
          </div>
        ))}
    </RadioGroup>
  )
}
