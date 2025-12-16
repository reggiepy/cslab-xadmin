# Xadmin Form API 参考文档

## 概述

xadmin-form 是 Xadmin 框架的表单解决方案，基于 react-final-form 构建，提供了强大的表单功能。本文档详细描述了其API接口。

## 导入方式

```javascript
// 默认导入 - 获取插件
import formPlugin from 'xadmin-form'

// 命名导入 - 获取组件和函数
import {
  BaseForm,
  Form,
  SchemaForm,
  useForm,
  fieldBuilder,
  objectBuilder,
  prefixFieldKey,
  schemaConvert,
  FieldArray
} from 'xadmin-form'
```

## 核心组件

### BaseForm

基础表单组件，提供表单渲染的核心功能。

#### 组件Props

```typescript
interface BaseFormProps {
  render: (formProps: FormRenderProps) => ReactNode
  fieldRender?: (field: FieldConfig, options?: any) => ReactNode
  fields?: FieldConfig[]
  schema?: Schema
  initialValues?: object
  onSubmit?: (values: any) => void | Promise<void>
  validate?: (values: any) => object | Promise<object>
  mutators?: object
  subscription?: Subscription
  decorators?: Function[]
}
```

#### 使用示例

```javascript
<BaseForm
  initialValues={{ username: 'admin' }}
  validate={validateForm}
  onSubmit={handleSubmit}
>
  {({ handleSubmit, pristine, invalid, submitting }) => (
    <form onSubmit={handleSubmit}>
      {/* 表单内容 */}
      <button type="submit" disabled={submitting || invalid}>
        提交
      </button>
    </form>
  )}
</BaseForm>
```

### Form

主要表单组件，集成了完整的表单功能。

#### 组件Props

```typescript
interface FormProps {
  onSubmit: (values: any) => void | Promise<void>
  initialValues?: object
  validate?: (values: any) => object | Promise<object>
  validateOnBlur?: boolean
  fields?: FieldConfig[]
  title?: ReactNode
  subTitle?: ReactNode
  mutators?: object
  render?: (formProps: FormRenderProps) => ReactNode
  children?: ReactNode | ((formProps: FormRenderProps) => ReactNode)
}
```

#### 使用示例

```javascript
<Form
  onSubmit={handleSubmit}
  initialValues={{ active: true }}
  fields={[
    { name: 'username', title: '用户名', type: 'text', required: true },
    { name: 'email', title: '邮箱', type: 'email', required: true },
    { name: 'active', title: '激活', type: 'checkbox' }
  ]}
>
  {({ handleSubmit, pristine, invalid, submitting, values }) => (
    <form onSubmit={handleSubmit}>
      <pre>{JSON.stringify(values, null, 2)}</pre>
      <button type="submit" disabled={submitting || invalid}>
        提交
      </button>
    </form>
  )}
</Form>
```

### SchemaForm

基于 JSON Schema 的动态表单组件。

#### 组件Props

```typescript
interface SchemaFormProps {
  schema: Schema
  uiSchema?: UISchema
  formData?: object
  onChange?: ({ formData }: { formData: any }) => void
  onSubmit?: ({ formData }: { formData: any }) => void | Promise<void>
  onError?: (errors: any) => void
  liveValidate?: boolean
  showErrorList?: boolean
  validate?: (formData: any, errors: any) => any
  transformErrors?: (errors: any) => any
}
```

#### 使用示例

```javascript
const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: '用户名',
      minLength: 3,
      maxLength: 20
    },
    email: {
      type: 'string',
      title: '邮箱',
      format: 'email'
    },
    age: {
      type: 'integer',
      title: '年龄',
      minimum: 0,
      maximum: 120
    }
  },
  required: ['username', 'email']
}

<SchemaForm
  schema={schema}
  formData={initialData}
  onSubmit={({ formData }) => console.log('提交:', formData)}
  liveValidate={true}
/>
```

### FieldArray

数组字段组件，用于处理可变长度的字段数组。

#### 组件Props

```typescript
interface FieldArrayProps {
  name: string
  children: (fields: FieldArrayRenderProps) => ReactNode
}
```

#### 使用示例

```javascript
<FieldArray name="tags">
  {({ fields }) => (
    <div>
      {fields.map((name, index) => (
        <div key={name}>
          <Field name={`${name}.name`} component="input" placeholder="标签名" />
          <Field name={`${name}.color`} component="input" placeholder="颜色" />
          <button type="button" onClick={() => fields.remove(index)}>
            删除
          </button>
        </div>
      ))}
      <button type="button" onClick={() => fields.push({})}>
        添加标签
      </button>
    </div>
  )}
</FieldArray>
```

## Hooks

### useForm

表单核心Hook，基于 react-final-form 的 useForm 扩展。

#### 返回值

```typescript
interface UseFormResult {
  form: FormApi
  values: any
  errors: any
  touched: any
  pristine: boolean
  invalid: boolean
  submitting: boolean
  handleSubmit: (event?: React.SyntheticEvent) => void
  reset: () => void
  // 扩展方法
  useField: (name: string) => any
  useEffect: (effect: Function, deps?: any[]) => void
}
```

#### 使用示例

```javascript
function MyForm() {
  const {
    form,
    values,
    errors,
    handleSubmit,
    submitting
  } = useForm({
    initialValues: { name: '' },
    onSubmit: async (values) => {
      await submitForm(values)
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <input {...form.getFieldProps('name')} />
      {errors.name && <span>{errors.name}</span>}
      <button type="submit" disabled={submitting}>
        提交
      </button>
    </form>
  )
}
```

## 工具函数

### fieldBuilder

字段构建器，用于创建单个表单字段。

#### 函数签名

```typescript
function fieldBuilder(
  field: FieldConfig,
  options?: FieldBuilderOptions
): ReactNode
```

#### 参数

- `field` (FieldConfig): 字段配置
- `options` (FieldBuilderOptions, 可选): 构建选项
  - `prefix` (string): 字段名前缀
  - `wrapper` (string | Component): 包装组件
  - `errorComponent` (Component): 错误显示组件

#### 使用示例

```javascript
const field = {
  name: 'username',
  title: '用户名',
  type: 'text',
  required: true
}

const element = fieldBuilder(field, {
  prefix: 'user.',
  wrapper: 'div',
  errorComponent: 'span'
})
```

### objectBuilder

对象构建器，用于创建多个字段。

#### 函数签名

```typescript
function objectBuilder(
  fields: FieldConfig[],
  render: Function,
  options?: ObjectBuilderOptions
): ReactNode[]
```

#### 参数

- `fields` (FieldConfig[]): 字段配置数组
- `render` (Function): 渲染函数
- `options` (ObjectBuilderOptions, 可选): 构建选项
  - `layout` (string): 布局方式 ('vertical' | 'horizontal')
  - `columns` (number): 列数

#### 使用示例

```javascript
const fields = [
  { name: 'username', title: '用户名', type: 'text' },
  { name: 'email', title: '邮箱', type: 'email' },
  { name: 'age', title: '年龄', type: 'number' }
]

const formFields = objectBuilder(fields, fieldBuilder, {
  layout: 'horizontal',
  columns: 2
})
```

### prefixFieldKey

字段键前缀处理函数。

#### 函数签名

```typescript
function prefixFieldKey(prefix: string, key: string): string
```

#### 使用示例

```javascript
const fullKey = prefixFieldKey('user', 'profile.name')  // 'user.profile.name'
```

### schemaConvert

JSON Schema 转换器，将 Schema 转换为字段配置。

#### 函数签名

```typescript
function schemaConvert(schema: Schema): FieldConfig[]
```

#### 使用示例

```javascript
const schema = {
  type: 'object',
  properties: {
    username: { type: 'string', title: '用户名' },
    email: { type: 'string', format: 'email', title: '邮箱' }
  }
}

const fields = schemaConvert(schema)
// [
//   { name: 'username', title: '用户名', type: 'text' },
//   { name: 'email', title: '邮箱', type: 'email' }
// ]
```

## 数据类型

### FieldConfig 字段配置

```typescript
interface FieldConfig {
  name: string              // 字段名
  title: string            // 字段标题
  type: string             // 字段类型
  required?: boolean       // 必填
  readonly?: boolean       // 只读
  disabled?: boolean       // 禁用
  placeholder?: string     // 占位符
  help?: string           // 帮助文本
  description?: string    // 描述
  defaultValue?: any      // 默认值
  validate?: ValidateFunction  // 验证函数
  component?: Component   // 自定义组件
  props?: object         // 组件属性
  render?: RenderFunction // 自定义渲染
  condition?: ConditionFunction // 条件显示
  enum?: any[]           // 枚举值
  enum_titles?: object   // 枚举标题映射
  format?: string        // 格式
  minimum?: number       // 最小值
  maximum?: number       // 最大值
  minLength?: number     // 最小长度
  maxLength?: number     // 最大长度
  pattern?: string       // 正则表达式
}
```

### Schema JSON Schema

```typescript
interface Schema {
  type: 'object' | 'array' | 'string' | 'number' | 'integer' | 'boolean'
  title?: string
  description?: string
  properties?: Record<string, Schema>
  items?: Schema
  required?: string[]
  enum?: any[]
  format?: string
  minimum?: number
  maximum?: number
  minLength?: number
  maxLength?: number
  pattern?: string
  dependencies?: any
}
```

### UISchema UI Schema

```typescript
interface UISchema {
  'ui:order'?: string[]
  'ui:widget'?: string
  'ui:options'?: {
    rows?: number
    inline?: boolean
    autocomplete?: string
  }
  [fieldName: string]: any
}
```

## 字段类型映射

xadmin-form 支持以下字段类型映射：

```javascript
const TYPE_MAPPING = {
  // 基础类型
  'string': 'text',
  'string:email': 'email',
  'string:date': 'date',
  'string:time': 'time',
  'string:datetime': 'datetime',
  'string:url': 'url',
  'string:textarea': 'textarea',
  'string:password': 'password',
  'string:enum': 'select',

  'number': 'number',
  'number:enum': 'numselect',

  'integer': 'integer',
  'integer:enum': 'intselect',

  'boolean': 'checkbox',
  'boolean:radio': 'radio',

  'object': 'fieldset',
  'array': 'array',
  'array:file': 'file'
}
```

## 验证系统

### 同步验证

```typescript
type ValidateFunction = (value: any, allValues?: any) => string | undefined

const validateUsername = (value) => {
  if (!value) return '用户名不能为空'
  if (value.length < 3) return '用户名至少3个字符'
  if (value.length > 20) return '用户名最多20个字符'
  if (!/^[a-zA-Z0-9_]+$/.test(value)) return '用户名只能包含字母、数字和下划线'
}
```

### 异步验证

```typescript
type AsyncValidateFunction = (
  value: any,
  allValues?: any
) => Promise<string | undefined>

const validateUsernameUnique = async (value) => {
  if (!value) return
  try {
    const response = await fetch(`/api/check-username/${value}`)
    if (response.status === 409) {
      return '用户名已存在'
    }
  } catch (error) {
    return '验证失败'
  }
}
```

### Schema验证

```javascript
const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 3,
      maxLength: 20,
      pattern: '^[a-zA-Z0-9_]+$',
      errorMessage: {
        minLength: '用户名至少3个字符',
        maxLength: '用户名最多20个字符',
        pattern: '用户名只能包含字母、数字和下划线'
      }
    }
  },
  required: ['username']
}
```

### 依赖验证

```javascript
const schema = {
  type: 'object',
  properties: {
    password: { type: 'string', title: '密码' },
    confirmPassword: { type: 'string', title: '确认密码' }
  },
  dependencies: {
    confirmPassword: {
      properties: {
        confirmPassword: { const: { "$data": "1/password" } }
      },
      errorMessage: {
        confirmPassword: '两次输入的密码不一致'
      }
    }
  }
}
```

## 自定义组件

### 自定义字段组件

```javascript
import { Field } from 'react-final-form'

const CustomInput = ({ input, meta, label, required, ...props }) => (
  <div className="form-field">
    {label && (
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>
    )}
    <input {...input} {...props} className={meta.error && meta.touched ? 'error' : ''} />
    {meta.error && meta.touched && (
      <span className="error-message">{meta.error}</span>
    )}
  </div>
)

// 注册自定义组件
xadmin.set('fieldComponents', {
  custom: CustomInput
})

// 使用
const fields = [
  { name: 'custom_field', title: '自定义字段', type: 'custom' }
]
```

### 自定义渲染函数

```javascript
const customRender = (field, options) => {
  const { name, title, required } = field

  return (
    <Field name={name} validate={field.validate}>
      {({ input, meta }) => (
        <div className="custom-field">
          <label>{title}{required && '*'}</label>
          <input {...input} className={meta.error ? 'error' : ''} />
          {meta.error && <span className="error">{meta.error}</span>}
        </div>
      )}
    </Field>
  )
}

// 使用自定义渲染
<Form fields={fields} fieldRender={customRender} />
```

## 表单装饰器

### 装饰器函数

```typescript
type Decorator = (form: FormApi) => (decorators: any[]) => any[]

const focusOnError: Decorator = (form) => (decorators) => [
  ...decorators,
  (form) => {
    let unsubscribe
    if (pristine) {
      unsubscribe = form.subscribe(
        ({ submitFailed, errors }) => {
          if (submitFailed) {
            const errorFields = Object.keys(errors)
            if (errorFields.length > 0) {
              form.focus(errorFields[0])
            }
          }
        },
        { submitFailed: true, errors: true }
      )
    }
    return () => unsubscribe && unsubscribe()
  }
]

// 使用装饰器
<Form decorators={[focusOnError]} />
```

## 表单状态管理

### 订阅表单状态

```javascript
function FormStateSubscriber() {
  const { values, errors, submitting, pristine } = useFormState()

  return (
    <div>
      <pre>Values: {JSON.stringify(values, null, 2)}</pre>
      <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>
      <p>Submitting: {submitting ? 'Yes' : 'No'}</p>
      <p>Pristine: {pristine ? 'Yes' : 'No'}</p>
    </div>
  )
}
```

### 条件字段

```javascript
const ConditionalField = ({ condition, children }) => (
  <Field name={condition.field} subscription={{ value: true }}>
    {({ input: { value } }) =>
      condition.test(value) ? children : null
    }
  </Field>
)

// 使用
<ConditionalField
  condition={{ field: 'type', test: v => v === 'premium' }}
>
  <Field name="premiumFeatures" component={PremiumComponent} />
</ConditionalField>
```

## 国际化支持

### 错误消息国际化

```javascript
import { _t } from 'xadmin-i18n'

// 自定义错误消息
const validateRequired = (value) => {
  if (!value) return _t('This field is required')
}

// Schema错误消息
const schema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      errorMessage: {
        format: _t('Please enter a valid email address')
      }
    }
  }
}
```

### 字段标题国际化

```javascript
const fields = [
  {
    name: 'username',
    title: _t('Username'),
    type: 'text'
  }
]
```

## 性能优化

### React.memo 包装

```javascript
const OptimizedField = React.memo(({ name, ...props }) => (
  <Field name={name} {...props} />
))

// 使用
<Form fields={fields} FieldComponent={OptimizedField} />
```

### 订阅优化

```javascript
// 只订阅需要的状态
<Field
  name="username"
  subscription={{ value: true, error: true, touched: true }}
>
  {({ input, meta }) => (
    <input {...input} />
    {meta.error && meta.touched && <span>{meta.error}</span>}
  )}
</Field>
```

## TypeScript 支持

### 类型定义

```typescript
interface FieldBuilderOptions {
  prefix?: string
  wrapper?: string | Component
  errorComponent?: Component
}

interface ObjectBuilderOptions {
  layout?: 'vertical' | 'horizontal'
  columns?: number
}

interface ValidateFunction {
  (value: any, allValues?: any): string | undefined | Promise<string | undefined>
}

interface RenderFunction {
  (field: FieldConfig, options?: any): ReactNode
}

interface ConditionFunction {
  (values: any): boolean
}

interface FormPlugin {
  name: 'xadmin.form'
  items: {
    fieldRenders: { type: 'array' }
    fieldComponents: { type: 'map' }
  }
  components: Record<string, Component>
  blocks: Record<string, Component>
}
```

## 示例代码

### 完整的表单示例

```javascript
import { SchemaForm } from 'xadmin-form'

const userSchema = {
  type: 'object',
  title: '用户信息',
  properties: {
    username: {
      type: 'string',
      title: '用户名',
      minLength: 3,
      maxLength: 20,
      pattern: '^[a-zA-Z0-9_]+$'
    },
    email: {
      type: 'string',
      title: '邮箱',
      format: 'email'
    },
    age: {
      type: 'integer',
      title: '年龄',
      minimum: 18,
      maximum: 100
    },
    gender: {
      type: 'string',
      title: '性别',
      enum: ['male', 'female', 'other'],
      enum_titles: { male: '男', female: '女', other: '其他' }
    },
    hobbies: {
      type: 'array',
      title: '爱好',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', title: '名称' },
          level: {
            type: 'string',
            title: '水平',
            enum: ['beginner', 'intermediate', 'advanced']
          }
        }
      }
    }
  },
  required: ['username', 'email', 'age']
}

const uiSchema = {
  'ui:order': ['username', 'email', 'age', 'gender', 'hobbies'],
  hobbies: {
    'ui:options': {
      addable: true,
      removable: true,
      orderable: true
    }
  }
}

function UserForm() {
  return (
    <SchemaForm
      schema={userSchema}
      uiSchema={uiSchema}
      onSubmit={async ({ formData }) => {
        await saveUser(formData)
        message.success('保存成功')
      }}
      onError={(errors) => {
        console.error('表单错误:', errors)
      }}
      liveValidate={true}
    />
  )
}
```

## 变更日志

### v3.2.5
- 新增SchemaForm组件
- 改进字段类型映射
- 增强验证功能
- 支持依赖验证

### v3.2.0
- 基于react-final-form重构
- 新增useForm hook
- 支持自定义字段渲染
- 改进国际化支持

### v3.0.0
- 重构表单系统
- 支持Jotai状态管理
- 新增字段构建器
- 简化API接口

### v2.x
- 基础表单功能
- Redux集成