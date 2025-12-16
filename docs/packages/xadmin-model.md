# Xadmin Model 数据模型包使用指南

## 概述

xadmin-model 是 Xadmin 框架的核心数据模型管理模块，基于 Jotai 状态管理构建，提供了完整的 CRUD 操作、数据查询、关联处理、批量操作等功能。

## 安装

```bash
npm install xadmin-model
# 或
yarn add xadmin-model
```

## 基础使用

### 1. 集成到 Xadmin

```javascript
import xadmin from 'xadmin'
import modelPlugin from 'xadmin-model'

// 注册模型插件
xadmin.use(modelPlugin)
```

### 2. 定义模型

```javascript
import xadmin from 'xadmin'

// 定义用户模型
const userModel = {
  name: 'user',
  title: '用户',
  api: '/api/users',

  // 字段定义
  properties: {
    id: { type: 'integer', title: 'ID' },
    username: { type: 'string', title: '用户名' },
    email: { type: 'string', title: '邮箱', format: 'email' },
    age: { type: 'integer', title: '年龄' },
    active: { type: 'boolean', title: '激活状态' },
    created_at: { type: 'string', title: '创建时间', format: 'datetime' }
  },

  // 列表显示字段
  listFields: ['id', 'username', 'email', 'active', 'created_at'],

  // 权限配置
  permission: {
    view: true,
    add: true,
    edit: true,
    delete: true
  }
}

// 注册模型
xadmin.set('models.user', userModel)
```

### 3. 使用模型

```javascript
import { Model } from 'xadmin-model'

function UserPage() {
  return (
    <Model name="user">
      <ModelRoutes />
    </Model>
  )
}
```

## 组件系统

### Model - 模型容器

Model 组件提供模型上下文和状态管理：

```javascript
import { Model } from 'xadmin-model'

function UserManagement() {
  return (
    <Model
      name="user"
      initialValues={{ active: true }}
      forceNewAtoms={false}
    >
      <ModelContent />
    </Model>
  )
}

function ModelContent() {
  // 在子组件中可以使用所有模型相关的hooks
  const { items, loading } = use('model.list')
  const { saveItem, deleteItem } = use('model')

  return (
    <div>
      {/* 渲染用户列表 */}
    </div>
  )
}
```

### ModelRoutes - 自动路由

自动生成 CRUD 路由：

```javascript
import { Model, ModelRoutes } from 'xadmin-model'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users/*" element={
          <Model name="user">
            <ModelRoutes />
          </Model>
        } />
      </Routes>
    </Router>
  )
}

// 自动生成的路由：
// /users/ - 列表页
// /users/add - 添加页
// /users/:id - 详情页
// /users/:id/edit - 编辑页
```

### ModelBlock - 模型作用域块

```javascript
import { ModelBlock } from 'xadmin-model'

function CustomUserSection() {
  return (
    <ModelBlock name="user">
      <C is="Model.List" />
      <C is="Model.Pagination" />
    </ModelBlock>
  )
}
```

## Hooks 使用

### 基础Hooks

#### useModel - 获取模型上下文

```javascript
import { useModel } from 'xadmin-model'

function UserComponent() {
  const { model, schema, name } = useModel()

  return (
    <div>
      <h1>{model.title || name}</h1>
      <p>总共有 {model.properties} 个字段</p>
    </div>
  )
}
```

#### useModelValue - 获取状态值

```javascript
import { useModelValue } from 'xadmin-model'

function UserCount() {
  const count = useModelValue('count')

  return (
    <div>
      用户总数: {count}
    </div>
  )
}
```

### 数据操作Hooks

#### useModel.item - CRUD 操作

```javascript
import { useModel } from 'xadmin-model'

function UserActions({ userId }) {
  const {
    item,           // 获取单个用户
    saveItem,       // 保存用户
    deleteItem,     // 删除用户
    loading        // 加载状态
  } = useModel('item')

  const handleSave = async (userData) => {
    try {
      const savedUser = await saveItem(userData)
      console.log('保存成功:', savedUser)
    } catch (error) {
      console.error('保存失败:', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('确定删除吗？')) {
      await deleteItem(id)
    }
  }

  return (
    <div>
      <button onClick={() => item(userId)}>
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

#### useModel.getItems - 获取列表

```javascript
import { useModel } from 'xadmin-model'

function UserList() {
  const {
    getItems,       // 获取列表
    items,          // 列表数据
    loading,        // 加载状态
    count          // 总数
  } = useModel('getItems')

  useEffect(() => {
    // 获取用户列表
    getItems({
      limit: 20,
      skip: 0,
      order: 'created_at desc'
    })
  }, [])

  return (
    <div>
      {loading ? (
        <div>加载中...</div>
      ) : (
        <div>
          <p>共 {count} 个用户</p>
          <ul>
            {items.map(user => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
```

#### useModel.query - 查询功能

```javascript
import { useModel } from 'xadmin-model'

function SearchableUserList() {
  const { query, items, loading } = useModel('query')

  const handleSearch = async (searchText) => {
    await query({
      wheres: {
        username: { $like: `%${searchText}%` }
      }
    })
  }

  return (
    <div>
      <input
        placeholder="搜索用户"
        onChange={(e) => handleSearch(e.target.value)}
      />
      {loading ? (
        <div>搜索中...</div>
      ) : (
        <ul>
          {items.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

### UI Hooks

#### useModel.list - 列表状态

```javascript
import { useModel } from 'xadmin-model'

function UserTable() {
  const {
    items,           // 列表数据
    loading,         // 加载状态
    count,           // 总数
    page,            // 当前页
    pageSize,        // 每页数量
    setPage,         // 设置页码
    setPageSize      // 设置每页数量
  } = useModel('list')

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>用户名</th>
            <th>邮箱</th>
          </tr>
        </thead>
        <tbody>
          {items.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

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

#### useModel.fields - 字段管理

```javascript
import { useModel } from 'xadmin-model'

function FieldSelector() {
  const {
    fields,         // 显示字段
    allFields,      // 所有字段
    setFields       // 设置显示字段
  } = useModel('fields')

  const handleFieldToggle = (fieldName) => {
    const newFields = fields.includes(fieldName)
      ? fields.filter(f => f !== fieldName)
      : [...fields, fieldName]
    setFields(newFields)
  }

  return (
    <div>
      <h3>选择显示字段</h3>
      {allFields.map(field => (
        <label key={field.name}>
          <input
            type="checkbox"
            checked={fields.includes(field.name)}
            onChange={() => handleFieldToggle(field.name)}
          />
          {field.title}
        </label>
      ))}
    </div>
  )
}
```

#### useModel.permission - 权限检查

```javascript
import { useModel } from 'xadmin-model'

function UserActions() {
  const {
    canAdd,     // 添加权限
    canEdit,    // 编辑权限
    canDelete   // 删除权限
  } = useModel('permission')

  return (
    <div>
      {canAdd && <button>添加用户</button>}
      {canEdit && <button>编辑用户</button>}
      {canDelete && <button>删除用户</button>}
    </div>
  )
}
```

## 高级功能

### 关联数据

#### 定义关联

```javascript
const orderModel = {
  name: 'order',
  title: '订单',
  properties: {
    id: { type: 'integer', title: 'ID' },
    user: {
      type: 'object',
      title: '用户',
      relateTo: 'user'  // 关联到用户模型
    },
    user_id: { type: 'integer', title: '用户ID' },
    amount: { type: 'number', title: '金额' },
    items: {
      type: 'array',
      title: '订单项',
      items: {
        type: 'object',
        properties: {
          product: { type: 'object', relateTo: 'product' },
          quantity: { type: 'integer' },
          price: { type: 'number' }
        }
      }
    }
  }
}

xadmin.set('models.order', orderModel)
```

#### 使用关联数据

```javascript
import { Model, ModelRelate, ModelRelDetail } from 'xadmin-model'

function OrderList() {
  return (
    <Model name="order">
      <ModelRelate
        name="user"
        field="user_id"
        render={(user) => user?.username || '-'}
      />
      <Model.List />
    </Model>
  )
}

function OrderDetail({ orderId }) {
  return (
    <Model name="order">
      <ModelRelDetail id={orderId}>
        <C is="Model.Detail" />

        {/* 显示关联的用户信息 */}
        <C is="Model.Relate"
          name="user"
          render={(user) => (
            <div>
              <h3>用户信息</h3>
              <p>姓名: {user.username}</p>
              <p>邮箱: {user.email}</p>
            </div>
          )}
        />
      </ModelRelDetail>
    </Model>
  )
}
```

### 批量操作

```javascript
import xadmin from 'xadmin'

// 注册批量操作
xadmin.set('modelBatchActions', {
  delete: {
    component: 'Model.BatchDelete',
    default: true
  },
  export: {
    component: 'Model.BatchExport',
    default: false
  },
  custom: {
    component: CustomBatchAction,
    action: async (ids, model) => {
      // 自定义批量操作逻辑
      console.log('批量操作:', ids)
    }
  }
})

// 使用批量操作
function UserListWithBatchActions() {
  const {
    selected,      // 选中的项
    toggleSelect,  // 切换选中状态
    toggleAll      // 切换全选
  } = useModel('select')

  return (
    <div>
      <Model.BatchActions selected={selected} />

      <Table
        dataSource={items}
        rowSelection={{
          selectedRowKeys: selected,
          onChange: toggleSelect,
          onSelectAll: toggleAll
        }}
      />
    </div>
  )
}
```

### 搜索功能

```javascript
import { ModelSearch } from 'xadmin-model'

function SearchableList() {
  return (
    <Model name="user">
      <ModelSearch
        fields={['username', 'email']}  // 可搜索字段
        placeholder="搜索用户"
      />
      <Model.List />
    </Model>
  )
}

// 自定义搜索组件
function CustomSearch() {
  const { setWheres } = useModel('query')

  const handleSearch = (values) => {
    setWheres({
      username: { $like: `%${values.username || ''}%` },
      active: values.active
    })
  }

  return (
    <Form onFinish={handleSearch}>
      <Field name="username" component={Input} placeholder="用户名" />
      <Field name="active" component={Checkbox}>激活用户</Field>
      <Button htmlType="submit">搜索</Button>
    </Form>
  )
}
```

### 过滤器

```javascript
import { ModelFilter } from 'xadmin-model'

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
            title: '年龄',
            type: 'range',
            min: 0,
            max: 100
          }
        ]}
      />
      <Model.List />
    </Model>
  )
}
```

### 模态表单

```javascript
import { ModelModalForm } from 'xadmin-model'

function UserManagement() {
  return (
    <Model name="user">
      <Button onClick={() => showModal('add')}>
        添加用户
      </Button>

      <Model.ModalForm
        title="用户表单"
        width={600}
        onSuccess={() => {
          hideModal()
          // 刷新列表
        }}
      />
    </Model>
  )
}

// 自定义模态表单
function CustomModalForm() {
  const {
    modalItem,    // 当前编辑的项
    showModal,    // 显示模态框
    hideModal     // 隐藏模态框
  } = useModel('modal')

  return (
    <Modal
      visible={!!modalItem}
      onCancel={hideModal}
      title={modalItem?.id ? '编辑用户' : '添加用户'}
    >
      <SchemaForm
        schema={userModel}
        initialValues={modalItem}
        onSubmit={async (values) => {
          await saveItem(values)
          hideModal()
        }}
      />
    </Modal>
  )
}
```

## 字段渲染

### 使用默认渲染器

```javascript
import { C } from 'xadmin-ui'

function UserTable() {
  const { model } = useModel()

  return (
    <Table>
      <Column
        title="创建时间"
        dataIndex="created_at"
        render={(value) => (
          <C is="Model.Render"
            field={model.properties.created_at}
            value={value}
          />
        )}
      />
    </Table>
  )
}
```

### 自定义渲染器

```javascript
import xadmin from 'xadmin'

// 注册自定义渲染器
xadmin.add('fieldRenders', (schema) => {
  if (schema.type === 'currency') {
    return ({ value, wrap: WrapComponent }) => (
      <WrapComponent>
        ¥{value?.toFixed(2)}
      </WrapComponent>
    )
  }
})

// 使用
const moneyField = {
  type: 'currency',
  title: '金额'
}
```

## 状态管理

### Jotai Atoms

xadmin-model 使用 Jotai 进行状态管理，每个模型都有独立的原子：

```javascript
// 访问模型原子
import { useAtom } from 'jotai'
import { modelAtom } from 'xadmin-model'

function CustomComponent() {
  const [items, setItems] = useAtom(modelAtom('user.items'))

  // 直接操作状态
  const addItem = (item) => {
    setItems(prev => [...prev, item])
  }

  return <div>{items.length} 个用户</div>
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
function CustomHook() {
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

## 最佳实践

### 1. 模型定义

```javascript
// 良好的模型定义
const userModel = {
  name: 'user',
  title: '用户',
  api: '/api/users',

  // 清晰的字段定义
  properties: {
    id: {
      type: 'integer',
      title: 'ID',
      readonly: true  // 只读字段
    },
    username: {
      type: 'string',
      title: '用户名',
      minLength: 3,
      maxLength: 20,
      required: true
    },
    email: {
      type: 'string',
      title: '邮箱',
      format: 'email',
      required: true
    }
  },

  // 合理的默认配置
  defaults: {
    listFields: ['id', 'username', 'email'],
    pageSize: 20,
    order: 'created_at desc'
  },

  // 权限控制
  permission: {
    view: () => hasPermission('user.view'),
    add: () => hasPermission('user.add'),
    edit: (item) => hasPermission('user.edit') || item.id === currentUserId,
    delete: () => hasPermission('user.delete')
  }
}
```

### 2. 组件设计

```javascript
// 可复用的模型组件
function ModelList({ name, columns, actions }) {
  return (
    <Model name={name}>
      <Model.List>
        {({ items, loading, selected, toggleSelect }) => (
          <Table
            loading={loading}
            dataSource={items}
            columns={columns}
            rowSelection={{
              selectedRowKeys: selected,
              onChange: toggleSelect
            }}
          />
        )}
      </Model.List>

      <Model.Pagination />
      <Model.BatchActions actions={actions} />
    </Model>
  )
}

// 使用
function UserPage() {
  const userColumns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '用户名', dataIndex: 'username' }
  ]

  return (
    <ModelList
      name="user"
      columns={userColumns}
      actions={['delete', 'export']}
    />
  )
}
```

### 3. 错误处理

```javascript
function UserForm() {
  const { saveItem } = useModel('item')
  const [error, setError] = useState(null)

  const handleSubmit = async (values) => {
    try {
      setError(null)
      await saveItem(values)
      message.success('保存成功')
    } catch (err) {
      setError(err.message)
      message.error('保存失败')
    }
  }

  return (
    <div>
      {error && <Alert message={error} type="error" />}
      <SchemaForm onSubmit={handleSubmit} />
    </div>
  )
}
```

### 4. 性能优化

```javascript
// 使用选择器避免不必要的重渲染
function UserName({ userId }) {
  const user = useModelValue('item', userId)  // 只获取特定用户

  return <span>{user?.username}</span>
}

// 使用记忆化
function ExpensiveComponent() {
  const { items } = useModel('list')

  const processedItems = useMemo(() => {
    return items.map(item => ({
      ...item,
      displayName: `${item.firstName} ${item.lastName}`
    }))
  }, [items])

  return (
    <div>
      {processedItems.map(item => (
        <div key={item.id}>{item.displayName}</div>
      ))}
    </div>
  )
}
```

## API 参考

### 组件Props

#### Model
- `name`: string - 模型名称
- `schema`: object - 自定义schema
- `initialValues`: object - 初始值
- `forceNewAtoms`: boolean - 强制创建新原子

#### ModelRoutes
- 自动生成CRUD路由，无需props

### Hooks返回值

#### useModel.item
- `item(id)`: Promise - 获取单个项
- `saveItem(data, partial?)`: Promise - 保存项
- `deleteItem(id)`: Promise - 删除项
- `loading`: boolean - 加载状态

#### useModel.getItems
- `getItems(options?)`: Promise - 获取列表
- `items`: Array - 列表数据
- `loading`: boolean - 加载状态
- `count`: number - 总数

#### useModel.list
- `items`: Array
- `loading`: boolean
- `count`: number
- `page`: number
- `pageSize`: number
- `setPage(page)`: void
- `setPageSize(size)`: void
- `setOrder(order)`: void

#### useModel.permission
- `canView`: boolean
- `canAdd`: boolean
- `canEdit`: boolean
- `canDelete`: boolean

## 技术栈

- React (>= 16.8)
- Jotai (^2.15.1)
- Jotai Utils (^2.15.1)
- React Router 6
- Moment.js
- Xadmin Form
- Xadmin I18n
- Xadmin UI

## 版本信息

当前版本: 3.3.5

## 更多资源

- [Jotai 文档](https://jotai.org/)
- [React Router 文档](https://reactrouter.com/)
- [JSON Schema 规范](https://json-schema.org/)
- [Xadmin 其他包文档](./)