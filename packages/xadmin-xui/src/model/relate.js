import React from 'react'
import _ from 'lodash'
import { _t } from 'xadmin-i18n'
import { Button, Select, Spin,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'xui'
import { Inbox as Empty } from 'lucide-react'
import app, { use } from 'xadmin'
import { Icon } from 'xadmin-ui'

const Option = Select.Option

const AsyncSelect = ({ value, isOptionSelected, label, onChange, style, field, ...extraProps }) => {
  const { loadOptions, loading, options } = use('model.relate.select', { field })
  
  const data = React.useMemo(() => options.reduce((prev, opt) => {
    prev[opt.value] = { key: opt.value, ...opt }
    return prev
  }, {}), [ options ])

  const onItemChange = (selectOpt) => {
    onChange(_.isArray(selectOpt) ?
      selectOpt.map(({ key }) => data[key] || _.find(value, v => v.key == key) || null).filter(Boolean) :
      data[selectOpt.key])
  }

  const useOptions = React.useMemo(() => {
    let options = Object.values(data)
    if(extraProps.mode == 'multiple' && value) {
      const selected = value.map(v => v.key)
      options = options.filter(opt => selected.indexOf(opt.key) == -1)
    }
    return options
  }, [ data, extraProps.mode, value ])

  return (
    <Select
      showSearch
      labelInValue
      value={value ? value : ( isOptionSelected ? Object.values(data).filter(isOptionSelected) : undefined )}
      notFoundContent={loading ? <Spin size="small" /> : <Empty />}
      onSearch={loadOptions}
      onChange={onItemChange}
      onBlur={()=>{ loadOptions(null) }}
      filterOption={false}
      placeholder={label}
      style={{ minWidth: 150, ...style }}
      {...extraProps}
    >
      {useOptions.map(d => <Option key={d.key}>{d.label}</Option>)}
    </Select>
  )

}

const RelateSelect = props => {
  const { input: { value: item, onChange }, label, field } = props
  const displayField = field.displayField || 'name'
  return (
    <AsyncSelect 
      value={item ? { item, label: item[displayField], key: item.id } : null} 
      onChange={(option) => {
        onChange(option.item)
      }}
      field={field}
      label={label}
    />
  )
}

const RelateMultiSelect = props => {
  const { input: { value: items, onChange }, label, field } = props
  const displayField = field.displayField || 'name'
  return (
    <AsyncSelect mode="multiple"
      value={items ? items.map(item => ({ key: item.id, item, label: item[displayField] })) : null} 
      onChange={(options) => {
        onChange(options.map(opt => opt.item))
      }} 
      field={field}
      label={label}
    />
  )
}

const FilterRelateSelect = props => {
  const { input: { value: selectId, onChange }, label, field } = props

  return (
    <AsyncSelect 
      isOptionSelected={option => selectId && option.key == selectId}
      onChange={(option) => {
        onChange(option.value)
      }} 
      field={field}
      label={label}
    />
  )
}


const form_fields = {
  fkselect: {
    component: RelateSelect
  },
  multi_select: {
    component: RelateMultiSelect
  },
  filter_relate: {
    component: FilterRelateSelect,
    parse: (value, name) => {
      if(value && value.id) {
        return value.id
      }
      return value
    }
  }
}

const RelateContainer = ({ data, model, children }) => (
  <>
    <h4><Icon name={model.icon} /> {data[model.displayField || 'name']}</h4>
    {children}
  </>
)

const RelateAction = ({ model, item, actions=[], ...extraProps }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-8">
        <Button size="sm" variant="ghost">{_t('Relates')}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {actions.map((m, index) => (
          <DropdownMenuItem 
            key={index} 
            onClick={() => {
              app.go(`/app/model/${model.name}/${item.id}/relations/${m.name}/`);
            }}
          >
            {m.title || m.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default {
  components: {
    'Relate.Action': RelateAction,
    'Relate.Container': RelateContainer
  },
  form_fields
}
