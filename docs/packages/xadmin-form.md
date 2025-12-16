# Xadmin Form 表单包使用指南

## 概述

xadmin-form 是 Xadmin 框架的表单解决方案，基于 react-final-form 构建，提供了强大的表单功能，包括动态表单生成、验证、国际化支持等。

## 安装

```bash
npm install xadmin-form
# 或
yarn add xadmin-form
```

## 基础使用

### 1. 集成到 Xadmin

```javascript
import xadmin from 'xadmin'
import formPlugin from 'xadmin-form'

// 注册表单插件
xadmin.use(formPlugin)
```

### 2. 基础表单

```javascript
import { Form } from 'xadmin-form'

function MyForm() {
  const handleSubmit = (values) => {
    console.log('表单数据:', values)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      fields={[
        { name: 'username', title: '用户名', type: 'text', required: true },
        { name: 'email', title: '邮箱', type: 'email', required: true },
        { name: 'age', title: '年龄', type: 'number' },
        { name: 'active', title: '激活', type: 'checkbox' }
      ]}
    >
      {({ handleSubmit, pristine, invalid, submitting }) => (
        <form onSubmit={handleSubmit}>
          {/* 字段会自动渲染 */}
          <button type="submit" disabled={submitting || invalid}>
            提交
          </button>
        </form>
      )}
    </Form>
  )
}
```

### 3. Schema 表单

```javascript
import { SchemaForm } from 'xadmin-form'

const userSchema = {
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
    },
    gender: {
      type: 'string',
      title: '性别',
      enum: ['male', 'female', 'other'],
      enum_titles: { male: '男', female: '女', other: '其他' }
    },
    birthday: {
      type: 'string',
      title: '生日',
      format: 'date'
    }
  },
  required: ['username', 'email']
}

function UserForm() {
  return (
    <SchemaForm
      schema={userSchema}
      onSubmit={values => console.log(values)}
    />
  )
}
```

## 表单组件

### Form - 基础表单

```javascript
import { Form } from 'xadmin-form'

function ExampleForm() {
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={{ username: 'admin', active: true }}
      validate={validateForm}
      mutators={{ setFieldData }}
      fields={fieldConfig}
      title="表单标题"
      subTitle="表单副标题"
    >
      {({
        form,
        values,
        errors,
        touched,
        pristine,
        invalid,
        submitting,
        handleSubmit,
        reset
      }) => (
        <form onSubmit={handleSubmit}>
          {/* 自定义表单内容 */}
          <button type="submit" disabled={submitting}>
            提交
          </button>
          <button type="button" onClick={reset}>
            重置
          </button>
        </form>
      )}
    </Form>
  )
}
```

### SchemaForm - Schema驱动表单

```javascript
import { SchemaForm } from 'xadmin-form'

function DynamicForm() {
  return (
    <SchemaForm
      schema={schema}
      uiSchema={uiSchema}
      formData={initialData}
      onChange={({ formData }) => console.log('数据变化:', formData)}
      onSubmit={handleSubmit}
      onError={handleError}
      liveValidate={true}
      showErrorList={true}
    />
  )
}
```

### BaseForm - 底层表单组件

```javascript
import { BaseForm } from 'xadmin-form'

function CustomForm() {
  return (
    <BaseForm
      render={renderFunction}
      fieldRender={fieldRenderFunction}
      {...props}
    />
  )
}
```

## 字段类型

xadmin-form 支持多种字段类型，通过 JSON Schema 自动映射：

### 基础字段类型

```javascript
const fields = [
  // 文本输入
  { name: 'text', title: '文本', type: 'text' },

  // 数字输入
  { name: 'number', title: '数字', type: 'number' },
  { name: 'integer', title: '整数', type: 'integer' },

  // 日期时间
  { name: 'date', title: '日期', type: 'date' },
  { name: 'time', title: '时间', type: 'time' },
  { name: 'datetime', title: '日期时间', type: 'datetime' },

  // 选择器
  { name: 'select', title: '选择', type: 'select', enum: ['a', 'b', 'c'] },
  { name: 'numselect', title: '数字选择', type: 'numselect', enum: [1, 2, 3] },

  // 布尔值
  { name: 'checkbox', title: '勾选', type: 'checkbox' },

  // 对象
  { name: 'fieldset', title: '字段组', type: 'object', properties: {...} },

  // 数组
  { name: 'array', title: '数组', type: 'array', items: {...} }
]
```

### Schema 映射规则

```javascript
// 字符串映射
string -> text
string + format: date -> date
string + format: time -> time
string + format: datetime -> datetime
string + enum -> select

// 数字映射
number -> number
number + enum -> numselect
integer -> integer

// 其他类型
boolean -> checkbox
object -> fieldset
array -> array
```

## 验证功能

### Schema 验证

```javascript
const schema = {
  type: 'object',
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
    password: {
      type: 'string',
      title: '密码',
      minLength: 8
    },
    confirmPassword: {
      type: 'string',
      title: '确认密码'
    },
    age: {
      type: 'integer',
      title: '年龄',
      minimum: 0,
      maximum: 120
    }
  },
  required: ['username', 'email', 'password'],
  // 自定义验证规则
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

### 自定义验证函数

```javascript
function validateForm(values) {
  const errors = {}

  if (!values.username) {
    errors.username = '用户名不能为空'
  } else if (values.username.length < 3) {
    errors.username = '用户名至少3个字符'
  }

  if (values.password && values.password !== values.confirmPassword) {
    errors.confirmPassword = '密码确认不匹配'
  }

  return errors
}

function MyForm() {
  return (
    <Form
      validate={validateForm}
      onSubmit={handleSubmit}
      fields={fields}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {/* 表单内容 */}
        </form>
      )}
    </Form>
  )
}
```

### 字段级验证

```javascript
const fields = [
  {
    name: 'email',
    title: '邮箱',
    type: 'text',
    validate: value => {
      if (!value) return '邮箱不能为空'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return '邮箱格式不正确'
      }
    }
  },
  {
    name: 'confirm',
    title: '确认',
    type: 'text',
    validate: (value, allValues) => {
      if (value !== allValues.password) {
        return '两次输入不一致'
      }
    }
  }
]
```

## 字段渲染器

### 使用字段构建器

```javascript
import { fieldBuilder, objectBuilder } from 'xadmin-form'

// 单个字段渲染
const renderField = fieldBuilder(fieldConfig, {
  // 渲染选项
  prefix: 'user.',
  wrapper: 'div',
  errorComponent: 'span'
})

// 多个字段渲染
const renderFields = objectBuilder(fieldsConfig, renderField, {
  // 构建选项
  layout: 'vertical',
  columns: 2
})
```

### 自定义字段组件

```javascript
import { C } from 'xadmin-ui'
import { Field } from 'react-final-form'

// 自定义输入组件
const CustomInput = ({ input, meta, ...rest }) => (
  <div>
    <input {...input} {...rest} />
    {meta.error && meta.touched && (
      <span className="error">{meta.error}</span>
    )}
  </div>
)

// 注册自定义字段
xadmin.set('fieldRenders', [
  {
    type: 'custom',
    component: CustomInput
  }
])

// 使用自定义字段
const fields = [
  { name: 'custom', title: '自定义字段', type: 'custom' }
]
```

## 数组字段

### FieldArray 组件

```javascript
import { FieldArray } from 'xadmin-form'

function ArrayFieldExample() {
  return (
    <Form onSubmit={handleSubmit}>
      {() => (
        <form>
          <FieldArray name="users">
            {({ fields }) => (
              <div>
                {fields.map((name, index) => (
                  <div key={name}>
                    <Field name={`${name}.name`} component="input" placeholder="姓名" />
                    <Field name={`${name}.email`} component="input" placeholder="邮箱" />
                    <button type="button" onClick={() => fields.remove(index)}>
                      删除
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => fields.push({})}>
                  添加用户
                </button>
              </div>
            )}
          </FieldArray>
        </form>
      )}
    </Form>
  )
}
```

### Schema 数组

```javascript
const schema = {
  type: 'object',
  properties: {
    tags: {
      type: 'array',
      title: '标签',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', title: '名称' },
          color: { type: 'string', title: '颜色' }
        }
      }
    }
  }
}
```

## 国际化支持

### 错误消息国际化

xadmin-form 内置了中英文错误消息支持：

```javascript
// 错误消息会根据当前语言自动显示
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 3,
      errorMessage: {
        minLength: '名称至少需要3个字符'
      }
    }
  }
}
```

### 字段标题国际化

```javascript
import { _t } from 'xadmin-i18n'

const fields = [
  {
    name: 'username',
    title: _t('Username'),
    type: 'text'
  }
]
```

## Hooks 使用

### useForm Hook

```javascript
import { useForm } from 'xadmin-form'

function MyComponent() {
  const {
    form,
    values,
    errors,
    touched,
    pristine,
    invalid,
    submitting
  } = useForm({
    initialValues: { name: '' },
    onSubmit: handleSubmit,
    validate: validateForm
  })

  return (
    <form onSubmit={form.submit}>
      <input {...form.getFieldProps('name')} />
      {errors.name && touched.name && (
        <span>{errors.name}</span>
      )}
      <button type="submit" disabled={invalid}>
        提交
      </button>
    </form>
  )
}
```

## 高级功能

### 条件显示

```javascript
import { C } from 'xadmin-ui'

function ConditionalField({ condition, children }) {
  return (
    <Field name={condition.field} subscription={{ value: true }}>
      {({ input: { value } }) =>
        condition.test(value) ? children : null
      }
    </Field>
  )
}

// 使用
<ConditionalField
  condition={{ field: 'type', test: v => v === 'premium' }}
>
  <Field name="premiumFeatures" component={PremiumComponent} />
</ConditionalField>
```

### 异步验证

```javascript
const asyncValidate = async (values) => {
  const errors = {}

  if (values.username) {
    try {
      const response = await fetch(`/api/check-username/${values.username}`)
      if (response.status === 409) {
        errors.username = '用户名已存在'
      }
    } catch (err) {
      errors.username = '验证失败'
    }
  }

  return errors
}

function AsyncValidationForm() {
  return (
    <Form
      onSubmit={handleSubmit}
      validate={syncValidate}
      validateOnBlur={true}
      fields={fields}
    />
  )
}
```

### 表单状态管理

```javascript
import { useModel } from 'xadmin-model'

function ConnectedForm() {
  const { saveItem } = useModel('user')

  return (
    <Form
      onSubmit={async (values) => {
        await saveItem(values)
        // 保存成功后的处理
      }}
    >
      {({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <button type="submit" disabled={submitting}>
            {submitting ? '保存中...' : '保存'}
          </button>
        </form>
      )}
    </Form>
  )
}
```

## 最佳实践

### 1. 字段配置复用

```javascript
// 基础字段配置
const baseFields = {
  username: {
    type: 'text',
    title: '用户名',
    required: true,
    validate: value => {
      if (!value) return '用户名不能为空'
      if (value.length < 3) return '用户名至少3个字符'
    }
  },
  email: {
    type: 'email',
    title: '邮箱',
    required: true
  }
}

// 在不同表单中复用
const createForm = {
  ...baseFields,
  password: { type: 'password', title: '密码', required: true }
}

const editForm = {
  ...baseFields,
  lastLogin: { type: 'datetime', title: '最后登录', readonly: true }
}
```

### 2. 表单拆分

```javascript
// 大型表单拆分为多个组件
function UserBasicInfo() {
  return <FormSection fields={basicFields} />
}

function UserContactInfo() {
  return <FormSection fields={contactFields} />
}

function UserForm() {
  return (
    <Form onSubmit={handleSubmit}>
      {() => (
        <form>
          <UserBasicInfo />
          <UserContactInfo />
        </form>
      )}
    </Form>
  )
}
```

### 3. 错误处理

```javascript
function ErrorHandlingForm() {
  const [globalError, setGlobalError] = useState('')

  return (
    <Form
      onSubmit={async (values) => {
        try {
          await submitForm(values)
        } catch (error) {
          if (error.field) {
            // 字段错误由表单处理
            throw error
          } else {
            // 全局错误
            setGlobalError(error.message)
          }
        }
      }}
    >
      {({ handleSubmit, submitError }) => (
        <form onSubmit={handleSubmit}>
          {globalError && <div className="global-error">{globalError}</div>}
          {submitError && <div className="submit-error">{submitError}</div>}
          {/* 表单字段 */}
        </form>
      )}
    </Form>
  )
}
```

## API 参考

### 组件 Props

#### Form
- `onSubmit`: Function - 提交回调
- `initialValues`: Object - 初始值
- `validate`: Function - 同步验证函数
- `validateOnBlur`: Boolean - 失焦验证（默认: true）
- `fields`: Array - 字段配置
- `title`: String - 表单标题
- `subTitle`: String - 表单副标题

#### SchemaForm
- `schema`: Object - JSON Schema
- `uiSchema`: Object - UI Schema
- `formData`: Object - 表单数据
- `onChange`: Function - 数据变化回调
- `onSubmit`: Function - 提交回调
- `liveValidate`: Boolean - 实时验证（默认: false）

### 字段配置

```typescript
interface FieldConfig {
  name: string           // 字段名
  title: string          // 字段标题
  type: string          // 字段类型
  required?: boolean    // 必填
  readonly?: boolean    // 只读
  placeholder?: string  // 占位符
  help?: string         // 帮助文本
  validate?: Function   // 验证函数
  component?: Component // 自定义组件
  props?: Object        // 组件属性
}
```

### 工具函数

- `fieldBuilder`: 字段构建器
- `objectBuilder`: 对象构建器
- `prefixFieldKey`: 字段键前缀处理
- `schemaConvert`: Schema转换器

## 技术栈

- react-final-form (^6.3.4)
- final-form (^4.18.7)
- final-form-arrays (^3.0.2)
- react-final-form-arrays (^3.1.1)
- ajv (^6.10.0) - JSON Schema 验证
- ajv-i18n (^3.4.0) - 国际化错误消息
- lodash
- moment

## 版本信息

当前版本: 3.2.5

## 更多资源

- [React Final Form 文档](https://final-form.org/react)
- [JSON Schema 规范](https://json-schema.org/)
- [AJV 文档](https://ajv.js.org/)
- [Xadmin 其他包文档](./)