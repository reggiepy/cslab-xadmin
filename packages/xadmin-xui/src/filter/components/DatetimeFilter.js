import React, { useState } from 'react'
import moment from 'moment'
import { _t } from 'xadmin-i18n'
import { DateTimePicker } from 'xui'

const DateRange = ({ input, field }) => {
  const [endOpen, setEndOpen] = useState(false);

  const disabledStartDate = (startValue) => {
    const endValue = input.value && input.value.lte && moment(input.value.lte).toDate();
    if (!startValue || !endValue) {
      return false;
    }
    if (field.attrs && field.attrs.maxDate && field.attrs.maxDate < startValue) {
      return true;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  const disabledEndDate = (endValue) => {
    const startValue = input.value && input.value.gte && moment(input.value.gte).toDate();
    if (!endValue || !startValue) {
      return false;
    }
    if (field.attrs && field.attrs.maxDate && field.attrs.maxDate < endValue) {
      return true;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  const onChange = (fieldKey, newValue) => {
    const { onChange, value } = input;
    const format = field.datetimeFormat || 'YYYY-MM-DD HH:mm:ss';

    onChange({
      ...value,
      [fieldKey]: newValue ? moment(newValue).format(format) : null,
      rule: 'range'
    });
  }

  const onStartChange = (value) => {
    onChange('gte', value);
  }

  const onEndChange = (value) => {
    onChange('lte', value);
  }

  const handleStartOpenChange = (open) => {
    if (!open) {
      setEndOpen(true);
    }
  }

  const handleEndOpenChange = (open) => {
    setEndOpen(open);
  }

  const format = field.datetimeFormat || 'YYYY-MM-DD HH:mm:ss';
  const inputValue = input.value;

  const startValue = inputValue && inputValue.gte && moment(inputValue.gte).toDate();
  const endValue = inputValue && inputValue.lte && moment(inputValue.lte).toDate();

  return (
    <div className='flex space-x-1 items-center'>
      <DateTimePicker
        disabledDate={disabledStartDate}
        clearable
        value={startValue}
        placeholder="起始"
        onChange={onStartChange}
        onOpenChange={handleStartOpenChange}
      /> <div>{_t("to")}</div>
      <DateTimePicker
        disabledDate={disabledEndDate}
        clearable
        value={endValue}
        placeholder="结束"
        onChange={onEndChange}
        open={endOpen}
        onOpenChange={handleEndOpenChange}
      />
    </div>
  );
}

export default DateRange
