import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default ({ input, label, field }) => {
  return (
    <Select onValueChange={input.onChange} defaultValue={input.value}>
      <SelectTrigger className="min-w-60 max-w-md w-auto">
        <SelectValue placeholder={field.placeholder}/>
      </SelectTrigger>
      <SelectContent>
      {[ ...field.titleMap ].map(option => { return (
        <SelectItem value={option.value}>{option.name}</SelectItem>) })}
      </SelectContent>
    </Select>
  )
}
