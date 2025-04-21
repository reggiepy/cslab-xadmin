import React from 'react'
import {
  ToggleGroup,
  ToggleGroupItem,
} from "xui"

export default ({ input, field }) => {
  return (
    <ToggleGroup
      {...input}
      value={input.value}
      onValueChange={input.onChange(value)}
    >
      {field.titleMap.map(option => (<ToggleGroupItem value={option.value}>{option.name}</ToggleGroupItem>))}
    </ToggleGroup>
  )
}
