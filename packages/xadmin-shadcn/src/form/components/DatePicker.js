import React from 'react'
import moment from 'moment'

import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const DatePickerInput = ({ input, field }) => {
  const format = field.datetimeFormat || 'YYYY-MM-DD'

  const getValue = (value) => {
    return value
  }

  const onChange = (value) => {
    input.onChange(getValue(value))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full w-[240px] pl-3 text-left font-normal",
            !input.value && "text-muted-foreground"
          )}
        >
          {input.value ? (
            getValue(input.value)
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={getValue(input.value)}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePickerInput
