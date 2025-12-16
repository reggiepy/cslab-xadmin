# Xadmin Model API 参考文档

## 概述

xadmin-model 是 Xadmin 框架的数据模型管理模块，基于 Jotai 状态管理构建，提供了完整的 CRUD 操作、数据查询、关联处理等功能。本文档详细描述了其API接口。

## 导入方式

```javascript
// 默认导入 - 获取插件
import modelPlugin from 'xadmin-model'

// 命名导入 - 获取组件和函数
import {
  Model,
  ModelRoutes,
  ModelBlock,
  ModelContext,
  useModel,
  useModelValue,
  useModelState,
  useModelEffect
} from 'xadmin-model'
```

## 核心组件

### Model - 模型容器

提供模型上下文和状态管理的核心容器组件。

#### 组件Props

```typescript
interface ModelProps {
  name: string                    // 模型名称
  schema?: Schema                 // 自定义schema
  modelKey?: string             // 模型键（用于区分相同类型的多个模型）
  initialValues?: object        // 初始值
  atoms?: AtomMap               // 外部原子
  forceNewAtoms?: boolean       // 强制创建新原子
  children?: ReactNode
}
```

#### 使用示例

```javascript
<Model name="user" initialValues={{ active: true }}>
  <ModelContent />
</Model>

<Model name="order" modelKey="sale" forceNewAtoms>
  <OrderContent />
</Model>
```

### ModelRoutes - 自动路由

自动生成 CRUD 路由的组件。

#### 组件Props

该组件无需props，自动根据模型配置生成路由。

#### 使用示例

```javascript
<Model name="user">
  <ModelRoutes />
</Model>
```

### ModelBlock - 模型作用域块

在特定模型作用域内渲染内容的组件。

#### 组件Props

```typescript
interface ModelBlockProps {
  name: string                  // 模型名称
  modelKey?: string            // 模型键
  children?: ReactNode
}
```

#### 使用示例

```javascript
<ModelBlock name="user">
  <C is="Model.List" />
  <C is="Model.Pagination" />
</ModelBlock>
```

### ModelContext - React Context

模型上下文对象，用于在组件树中传递模型信息。

#### 使用示例

```javascript
import { ModelContext } from 'xadmin-model'

function CustomComponent() {
  const model = useContext(ModelContext)
  console.log('模型信息:', model)
}
```

## Hooks

### useModel - 获取模型上下文

获取当前模型上下文的Hook。

#### 返回值

```typescript
interface UseModelResult {
  model: ModelDefinition       // 模型定义
  schema: Schema              // Schema定义
  name: string                // 模型名称
  modelKey?: string          // 模型键
}
```

#### 使用示例

```javascript
function ModelInfo() {
  const { model, schema, name } = useModel()

  return (
    <div>
      <h1>{model.title || name}</h1>
      <p>字段数量: {Object.keys(schema.properties || {}).length}</p>
    </div>
  )
}
```

### useModelValue - 获取状态值

获取模型原子状态值的Hook。

#### 函数签名

```typescript
function useModelValue<T>(atom: string | Atom<T>, fkey?: any): T
```

#### 参数

- `atom`: 原子标识符或Atom对象
- `fkey`: 可选，原子键参数（用于atomFamily）

#### 使用示例

```javascript
// 获取列表数据
const items = useModelValue('items')

// 获取特定用户
const user = useModelValue('item', userId)

// 获取总数
const count = useModelValue('count')

// 获取加载状态
const loading = useModelValue('loading', 'items')
```

### useModelState - 获取状态对象

获取模型原子完整状态对象的Hook。

#### 函数签名

```typescript
function useModelState<T>(atom: string | Atom<T>, fkey?: any): {
  value: T
  set: (value: T) => void
  reset: () => void
}
```

#### 使用示例

```javascript
function UserEditor({ userId }) {
  const { value: user, set: setUser } = useModelState('item', userId)

  const handleUpdate = (field, value) => {
    setUser({
      ...user,
      [field]: value
    })
  }

  return (
    <div>
      <Input
        value={user?.name || ''}
        onChange={(e) => handleUpdate('name', e.target.value)}
      />
    </div>
  )
}
```

### useModelEffect - 副作用Hook

在模型状态变化时执行副作用的Hook。

#### 函数签名

```typescript
function useModelEffect(
  atom: string | Atom<any>,
  callback: (value: any, prevValue: any) => void | (() => void),
  deps?: any[]
)
```

#### 参数

- `atom`: 原子标识符
- `callback`: 状态变化回调
- `deps`: 依赖数组

#### 使用示例

```javascript
function AutoSave() {
  const { saveItem } = useModel('item')

  useModelEffect('formData', async (formData) => {
    if (formData.id) {
      await saveItem(formData)
    }
  }, [])

  return null
}
```

## 数据操作Hooks

### useModel.item - CRUD操作Hook

提供单个数据项CRUD操作的Hook。

#### 返回值

```typescript
interface UseModelItemResult {
  item: (id: any) => Promise<any>              // 获取单个项
  saveItem: (data: any, partial?: boolean) => Promise<any>  // 保存项
  deleteItem: (id: any) => Promise<void>       // 删除项
  loading: boolean                            // 加载状态
}
```

#### 使用示例

```javascript
function UserActions({ userId }) {
  const { item, saveItem, deleteItem, loading } = useModel('item')

  const handleSave = async (userData) => {
    try {
      const saved = await saveItem(userData)
      message.success('保存成功')
      return saved
    } catch (error) {
      message.error('保存失败')
      throw error
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('确定删除吗？')) {
      await deleteItem(id)
      message.success('删除成功')
    }
  }

  return (
    <div>
      <button onClick={() => item(userId)} disabled={loading}>
        加载用户
      </button>
      <button onClick={() => handleSave({ name: 'John' })}>
        保存用户
      </button>
      <button onClick={() => handleDelete(userId)}>
        删除用户
      </button>
    </div>
  )
}
```

### useModel.getItems - 获取列表Hook

提供列表数据获取功能的Hook。

#### 返回值

```typescript
interface UseModelGetItemsResult {
  getItems: (options?: QueryOptions) => Promise<{ items: any[], total: number }>
  items: any[]                                    // 列表数据
  loading: boolean                               // 加载状态
  count: number                                  // 总数
}
```

#### 参数

```typescript
interface QueryOptions {
  limit?: number
  skip?: number
  order?: string
  fields?: string[]
  wheres?: object
}
```

#### 使用示例

```javascript
function UserList() {
  const { getItems, items, loading, count } = useModel('getItems')

  useEffect(() => {
    getItems({
      limit: 20,
      skip: 0,
      order: 'created_at desc'
    })
  }, [])

  return (
    <div>
      <p>共 {count} 个用户</p>
      {loading ? (
        <div>加载中...</div>
      ) : (
        <ul>
          {items.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

### useModel.query - 查询Hook

提供灵活查询功能的Hook。

#### 返回值

```typescript
interface UseModelQueryResult {
  query: (filter?: object, where?: object) => Promise<any>
  items: any[]                      // 查询结果
  loading: boolean                  // 加载状态
}
```

#### 使用示例

```javascript
function SearchableUserList() {
  const { query, items, loading } = useModel('query')

  const handleSearch = async (searchText) => {
    await query({
      limit: 10
    }, {
      name: { $like: `%${searchText}%` },
      active: true
    })
  }

  return (
    <div>
      <Input
        placeholder="搜索用户"
        onChange={(e) => handleSearch(e.target.value)}
      />
      {loading ? (
        <div>搜索中...</div>
      ) : (
        <ul>
          {items.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

## UI状态Hooks

### useModel.list - 列表状态Hook

管理列表显示状态的Hook。

#### 返回值

```typescript
interface UseModelListResult {
  items: any[]                    // 列表数据
  loading: boolean                // 加载状态
  count: number                   // 总数
  page: number                    // 当前页
  pageSize: number                // 每页数量
  setPage: (page: number) => void     // 设置页码
  setPageSize: (size: number) => void // 设置每页数量
  setOrder: (order: string) => void   // 设置排序
  next: () => void                    // 下一页
  prev: () => void                    // 上一页
  refresh: () => void                 // 刷新
}
```

#### 使用示例

```javascript
function UserTable() {
  const {
    items,
    loading,
    count,
    page,
    pageSize,
    setPage,
    setPageSize
  } = useModel('list')

  return (
    <div>
      <Table
        loading={loading}
        dataSource={items}
        pagination={false}
      />
      <Pagination
        current={page}
        pageSize={pageSize}
        total={count}
        onChange={setPage}
        onShowSizeChange={(_, size) => setPageSize(size)}
      />
    </div>
  )
}
```

### useModel.fields - 字段管理Hook

管理列表显示字段的Hook。

#### 返回值

```typescript
interface UseModelFieldsResult {
  fields: string[]               // 显示字段
  allFields: FieldConfig[]       // 所有可用字段
  setFields: (fields: string[]) => void
  toggleField: (field: string) => void
}
```

#### 使用示例

```javascript
function FieldSelector() {
  const { fields, allFields, toggleField } = useModel('fields')

  return (
    <div>
      <h3>显示字段</h3>
      {allFields.map(field => (
        <label key={field.name}>
          <input
            type="checkbox"
            checked={fields.includes(field.name)}
            onChange={() => toggleField(field.name)}
          />
          {field.title}
        </label>
      ))}
    </div>
  )
}
```

### useModel.select - 选择功能Hook

管理列表项选择状态的Hook。

#### 返回值

```typescript
interface UseModelSelectResult {
  selected: any[]               // 选中的项
  selectedIds: any[]            // 选中的ID
  allSelected: boolean          // 是否全选
  toggleSelect: (id: any) => void        // 切换选择
  toggleAll: () => void                // 切换全选
  clearSelect: () => void              // 清空选择
  isSelected: (id: any) => boolean     // 是否选中
}
```

#### 使用示例

```javascript
function BatchActions() {
  const { selected, selectedIds, toggleAll, clearSelect } = useModel('select')

  const handleBatchDelete = async () => {
    if (window.confirm(`确定删除 ${selected.length} 项吗？`)) {
      await Promise.all(selectedIds.map(id => deleteItem(id)))
      clearSelect()
      message.success('批量删除成功')
    }
  }

  return (
    <div>
      <button onClick={toggleAll}>全选</button>
      <button onClick={handleBatchDelete} disabled={selected.length === 0}>
        批量删除 ({selected.length})
      </button>
    </div>
  )
}
```

### useModel.permission - 权限Hook

检查模型权限的Hook。

#### 返回值

```typescript
interface UseModelPermissionResult {
  canView: boolean               // 查看权限
  canAdd: boolean                // 添加权限
  canEdit: boolean               // 编辑权限
  canDelete: boolean             // 删除权限
  canExport: boolean             // 导出权限
  check: (permission: string) => boolean  // 检查自定义权限
}
```

#### 使用示例

```javascript
function UserActions() {
  const { canAdd, canEdit, canDelete } = useModel('permission')

  return (
    <div>
      {canAdd && <Button>添加用户</Button>}
      {canEdit && <Button>编辑用户</Button>}
      {canDelete && <Button>删除用户</Button>}
    </div>
  )
}
```

## 数据模型定义

### ModelDefinition 模型定义

```typescript
interface ModelDefinition {
  name: string                   // 模型名称
  title?: string                // 模型标题
  api?: string                  // API路径
  properties: SchemaProperties  // 字段定义
  listFields?: string[]         // 列表显示字段
  detailFields?: string[]       // 详情显示字段
  formFields?: string[]         // 表单字段
  searchFields?: string[]       // 搜索字段
  filterFields?: string[]       // 过滤字段
  permission?: ModelPermission  // 权限配置
  defaults?: ModelDefaults      // 默认配置
  hooks?: ModelHooks           // 自定义钩子
  actions?: ModelActions       // 自定义操作
  relations?: ModelRelations   // 关联关系
}
```

### SchemaProperties 字段定义

```typescript
interface SchemaProperties {
  [fieldName: string]: SchemaProperty
}

interface SchemaProperty {
  type: 'string' | 'number' | 'integer' | 'boolean' | 'object' | 'array'
  title?: string
  description?: string
  format?: string
  enum?: any[]
  enum_titles?: object
  minimum?: number
  maximum?: number
  minLength?: number
  maxLength?: number
  pattern?: string
  required?: boolean
  readonly?: boolean
  default?: any
  relateTo?: string        // 关联到其他模型
  render?: string | Component  // 自定义渲染器
}
```

### ModelPermission 权限配置

```typescript
interface ModelPermission {
  view?: boolean | ((user?: User) => boolean)
  add?: boolean | ((user?: User) => boolean)
  edit?: boolean | ((user?: User, item?: any) => boolean)
  delete?: boolean | ((user?: User, item?: any) => boolean)
  export?: boolean | ((user?: User) => boolean)
  [customPermission: string]: boolean | ((...args: any[]) => boolean)
}
```

### 使用示例

```javascript
const userModel = {
  name: 'user',
  title: '用户',
  api: '/api/users',

  properties: {
    id: { type: 'integer', title: 'ID', readonly: true },
    username: { type: 'string', title: '用户名', required: true },
    email: { type: 'string', title: '邮箱', format: 'email', required: true },
    age: { type: 'integer', title: '年龄', minimum: 0, maximum: 120 },
    active: { type: 'boolean', title: '激活状态', default: true },
    created_at: { type: 'string', title: '创建时间', format: 'datetime', readonly: true }
  },

  listFields: ['id', 'username', 'email', 'active', 'created_at'],
  formFields: ['username', 'email', 'age', 'active'],
  searchFields: ['username', 'email'],
  filterFields: ['active', 'age'],

  permission: {
    view: true,
    add: () => hasPermission('user.add'),
    edit: (user, item) => hasPermission('user.edit') || item.id === user.id,
    delete: () => hasPermission('user.delete')
  },

  defaults: {
    pageSize: 20,
    order: 'created_at desc'
  }
}
```

## 关联数据处理

### 关联字段定义

```typescript
interface RelationField {
  type: 'object' | 'array'
  relateTo: string        // 关联的模型名称
  relationType?: 'hasOne' | 'hasMany' | 'belongsTo' | 'manyToMany'
  foreignKey?: string     // 外键字段
  localKey?: string       // 本地键
  pivotTable?: string     // 中间表（多对多关系）
}
```

### ModelRelate - 关联组件

```javascript
import { ModelRelate } from 'xadmin-model'

function OrderList() {
  return (
    <Model name="order">
      <ModelRelate
        name="user"                 // 关联到用户模型
        field="user_id"            // 关联字段
        render={(user) => user?.username || '-'}
      />
      <Model.List />
    </Model>
  )
}
```

### ModelRelDetail - 关联详情

```javascript
import { ModelRelDetail } from 'xadmin-model'

function OrderDetail({ orderId }) {
  return (
    <Model name="order">
      <ModelRelDetail id={orderId}>
        <Model.Detail />

        {/* 显示关联的用户信息 */}
        <ModelRelate
          name="user"
          render={(user) => (
            <Card title="用户信息">
              <p>姓名: {user.username}</p>
              <p>邮箱: {user.email}</p>
            </Card>
          )}
        />
      </ModelRelDetail>
    </Model>
  )
}
```

## 批量操作

### 定义批量操作

```javascript
import xadmin from 'xadmin'

// 注册批量操作
xadmin.set('modelBatchActions', {
  delete: {
    component: 'Model.BatchDelete',
    default: true,
    action: async (ids, model) => {
      await Promise.all(ids.map(id => model.api.delete(id)))
      message.success(`删除了 ${ids.length} 项`)
    }
  },
  export: {
    component: 'Model.BatchExport',
    default: false,
    action: async (ids, model) => {
      const data = ids.length > 0
        ? await model.query({ ids })
        : await model.query()
      exportToCSV(data, model.title)
    }
  }
})
```

### Model.BatchActions 组件

```javascript
function BatchActionButtons() {
  const { selected } = useModel('select')

  return (
    <Model.BatchActions
      selected={selected}
      actions={['delete', 'export', 'custom']}
    />
  )
}
```

## 过滤和搜索

### ModelFilter - 过滤器组件

```javascript
function FilteredList() {
  return (
    <Model name="user">
      <ModelFilter
        filters={[
          {
            field: 'active',
            title: '状态',
            type: 'select',
            options: [
              { label: '全部', value: null },
              { label: '激活', value: true },
              { label: '未激活', value: false }
            ]
          },
          {
            field: 'age',
            title: '年龄范围',
            type: 'range',
            min: 0,
            max: 100
          }
        ]}
        onChange={(filters) => {
          console.log('过滤器变化:', filters)
        }}
      />
      <Model.List />
    </Model>
  )
}
```

### ModelSearch - 搜索组件

```javascript
function SearchableList() {
  return (
    <Model name="user">
      <ModelSearch
        fields={['username', 'email']}  // 可搜索字段
        placeholder="搜索用户"
        onSearch={(keyword) => {
          console.log('搜索:', keyword)
        }}
      />
      <Model.List />
    </Model>
  )
}
```

## 状态管理

### Jotai Atoms

xadmin-model 使用 Jotai 进行状态管理，每个模型都有独立的原子：

```javascript
// 原子结构
const modelAtoms = (modelKey, model) => {
  return {
    ids: atom([]),                              // ID列表
    item: atomFamily(() => atom({})),           // 单项数据
    items: atom(derivedAtom),                   // 列表数据
    selected: atom([]),                         // 选中项
    count: atom(0),                             // 总数
    option: atom({}),                          // 查询选项
    fields: optionSelector('fields'),          // 显示字段
    order: optionSelector('order'),            // 排序
    limit: optionSelector('limit'),             // 每页数量
    skip: optionSelector('skip'),              // 偏移量
    wheres: atom({}),                          // 查询条件
    where: atomFamily(...),                    // 单个条件
    loading: atomFamily(...),                 // 加载状态
    itemSelected: atomFamily(...),             // 选中状态
    allSelected: atom(...),                    // 全选状态
    itemOrder: atomField(...)                  // 排序状态
  }
}
```

### 自定义原子

```javascript
import xadmin from 'xadmin'

// 注册自定义原子
xadmin.add('modelAtoms', (k, model) => {
  return {
    customState: atom(null),
    customSelector: atom((get) => {
      const items = get(modelAtom(`${k}.items`))
      return items.filter(item => item.active)
    })
  }
})

// 使用自定义原子
function CustomComponent() {
  const [customState, setCustomState] = useModelValue('customState')
  const activeItems = useModelValue('customSelector')

  return (
    <div>
      <p>自定义状态: {customState}</p>
      <p>活跃项: {activeItems.length}</p>
    </div>
  )
}
```

## 字段渲染

### 注册自定义渲染器

```javascript
import xadmin from 'xadmin'

// 注册渲染器
xadmin.add('fieldRenders', (schema) => {
  if (schema.type === 'currency') {
    return ({ value, wrap: WrapComponent }) => (
      <WrapComponent>
        ¥{value?.toFixed(2)}
      </WrapComponent>
    )
  }

  if (schema.type === 'avatar') {
    return ({ value, wrap: WrapComponent }) => (
      <WrapComponent>
        <Avatar src={value} icon="user" />
      </WrapComponent>
    )
  }
})

// 使用自定义渲染器
const fields = {
  price: {
    type: 'currency',
    title: '价格'
  },
  avatar: {
    type: 'avatar',
    title: '头像'
  }
}
```

### Model.Render 组件

```javascript
function CustomTable() {
  const { model } = useModel()

  const columns = [
    {
      title: '创建时间',
      dataIndex: 'created_at',
      render: (value) => (
        <C is="Model.Render"
          field={model.properties.created_at}
          value={value}
        />
      )
    }
  ]

  return <Table columns={columns} dataSource={items} />
}
```

## 错误处理

### 错误边界

xadmin-model 提供了内置的错误处理机制：

```javascript
// 全局错误处理
xadmin.set('models.errorBoundary', {
  onError: (error, errorInfo) => {
    console.error('模型错误:', error, errorInfo)
    // 发送错误监控
    errorReporting.captureException(error)
  },
  fallback: <div>出现错误，请刷新页面重试</div>
})
```

### API错误处理

```javascript
// 自定义API错误处理
xadmin.add('hooks.api.error', (app, error) => {
  if (error.status === 401) {
    // 未授权，跳转到登录页
    window.location.href = '/login'
  } else if (error.status >= 500) {
    // 服务器错误
    message.error('服务器错误，请稍后重试')
  }
  return error
})
```

## TypeScript 支持

### 类型定义

```typescript
interface ModelPlugin {
  name: 'xadmin.model'
  items: {
    models: { type: 'map' }
    fieldRenders: { type: 'array' }
    modelActions: { type: 'map' }
    modelAtoms: { type: 'array' }
  }
  components: Record<string, Component>
  blocks: Record<string, Component>
  routers: Record<string, RouteConfig>
}

interface AtomFamily<Value> {
  (param: any): Atom<Value>
}

interface Atom<Value> {
  init: Value | ((get: GetterFunction) => Value | Promise<Value>)
}

interface GetterFunction {
  <Value>(atom: Atom<Value>): Value
}
```

## 示例代码

### 完整的模型定义和使用

```javascript
import { Model, ModelRoutes, useModel } from 'xadmin-model'

// 1. 定义模型
const productModel = {
  name: 'product',
  title: '产品',
  api: '/api/products',

  properties: {
    id: { type: 'integer', title: 'ID' },
    name: { type: 'string', title: '产品名称', required: true },
    price: { type: 'number', title: '价格', minimum: 0 },
    category: {
      type: 'object',
      title: '分类',
      relateTo: 'category'
    },
    active: { type: 'boolean', title: '上架', default: true },
    created_at: { type: 'string', title: '创建时间', format: 'datetime' }
  },

  listFields: ['id', 'name', 'price', 'category', 'active'],
  formFields: ['name', 'price', 'category', 'active'],
  searchFields: ['name'],
  filterFields: ['category', 'active'],

  permission: {
    view: true,
    add: () => hasRole('product_manager'),
    edit: (user, item) => hasRole('product_manager') || item.created_by === user.id,
    delete: () => hasRole('admin')
  }
}

// 2. 注册模型
xadmin.set('models.product', productModel)

// 3. 使用模型
function ProductManagement() {
  return (
    <Model name="product">
      <ModelRoutes />
    </Model>
  )
}

// 4. 自定义组件
function ProductTable() {
  const {
    items,
    loading,
    count,
    page,
    setPage
  } = useModel('list')

  const { canAdd, canEdit, canDelete } = useModel('permission')

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '名称', dataIndex: 'name' },
    { title: '价格', dataIndex: 'price' },
    {
      title: '分类',
      dataIndex: 'category',
      render: (category) => category?.name || '-'
    },
    {
      title: '状态',
      dataIndex: 'active',
      render: (active) => (
        <Badge status={active ? 'success' : 'error'} text={active ? '上架' : '下架'} />
      )
    },
    {
      title: '操作',
      render: (_, record) => (
        <Space>
          {canEdit && <Button type="link">编辑</Button>}
          {canDelete && <Button type="link" danger>删除</Button>}
        </Space>
      )
    }
  ]

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        {canAdd && <Button type="primary">添加产品</Button>}
      </div>

      <Table
        columns={columns}
        dataSource={items}
        loading={loading}
        pagination={false}
        rowKey="id"
      />

      <Pagination
        current={page}
        total={count}
        pageSize={20}
        onChange={setPage}
        showSizeChanger
        showQuickJumper
      />
    </div>
  )
}
```

## 变更日志

### v3.3.5
- 新增关联数据处理
- 支持批量操作
- 改进字段渲染系统
- 优化性能

### v3.3.0
- 基于Jotai重构状态管理
- 新增完整的Hook系统
- 支持自定义原子
- 改进错误处理

### v3.0.0
- 重构模型系统
- 支持自动路由生成
- 新增权限控制
- 简化API接口

### v2.x
- 基础模型功能
- Redux集成