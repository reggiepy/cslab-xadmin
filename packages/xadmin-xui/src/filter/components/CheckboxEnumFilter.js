import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Checkbox } from 'xui'
import app from 'xadmin'

const EnumFilter = (props) => {
  const initChecks = () => {
    const value = props.input.value
    if (value) {
      if (typeof value !== 'object') {
        return [value]
      } else {
        return [...value['inq']]
      }
    }
    return []
  }

  const [checks, setChecks] = useState(initChecks())

  const getValue = () => {
    if (checks.length > 1) {
      return { inq: checks }
    } else if (checks.length > 0) {
      return checks[0]
    } else {
      return null
    }
  }

  const onChange = (e, value) => {
    const { onChange } = props.input
    let newChecks = [...checks]
    
    if (e.target.checked) {
      if (checks.indexOf(value) === -1) {
        newChecks = [...checks, value]
      }
    } else {
      if (checks.indexOf(value) >= 0) {
        newChecks = [..._.pull([...checks], value)]
      }
    }
    
    if (!_.isEqual(newChecks, checks)) {
      setChecks(newChecks)
      onChange(newChecks.length > 1 ? { inq: newChecks } : newChecks.length ? newChecks[0] : null)
    }
  }

  const clear = () => {
    const { onChange } = props.input
    setChecks([])
    onChange(null)
  }

  useEffect(() => {
    setChecks(initChecks())
  }, [props.input.value])

  const { input: { name, value, onBlur, onChange: inputOnChange, ...inputProps }, field } = props
  const { _t } = app.context

  return (
    <>
      <Checkbox
        key="check-clear"
        id="check-clear"
        checked={checks.length === 0}
        onChange={(e) => {
          if (e.target.checked) {
            clear()
          }
        }}
        {...inputProps}
      >
        {_t('All')}
      </Checkbox>
      
      {field.titleMap.map(option => (
        <Checkbox
          key={option.name}
          id={option.name}
          checked={checks.indexOf(option.value) >= 0}
          onChange={(e) => onChange(e, option.value)}
          {...inputProps}
          value={option.value}
        >
          {option.name}
        </Checkbox>
      ))}
    </>
  )
}

export default EnumFilter
