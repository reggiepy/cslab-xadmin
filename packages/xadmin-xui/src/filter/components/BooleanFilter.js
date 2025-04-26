import React from 'react'
import _ from 'lodash'
import { _t } from 'xadmin-i18n'
import { Select } from 'xui'

export default props => {
  const { input: { name, value, onChange, ...inputProps }, field } = props
  return <Select
      {...inputProps} {...field.attrs}
      value={value}
      onChange={onChange}
      options={[{ label: _t('True'), value: true }, { label: _t('False'), value: false } ]}
    />
}
