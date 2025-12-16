# Xadmin UI API 参考文档

## 概述

xadmin-ui 是 Xadmin 框架的基础UI组件库，采用插件化架构，支持动态组件加载。本文档详细描述了其API接口。

## 导入方式

```javascript
// 默认导入 - 获取插件
import uiPlugin from 'xadmin-ui'

// 命名导入 - 获取组件和函数
import {
  C,
  lazy,
  Page,
  Icon,
  Loading,
  Main,
  App,
  Dashboard,
  Dropdown,
  Menu,
  Badge,
  Card,
  Modal,
  Button,
  Popover,
  Tooltip,
  Table,
  Tabs,
  Empty,
  List,
  Alert,
  Input,
  Check,
  Select
} from 'xadmin-ui'
```

## 核心API

### C - 组件渲染器

动态组件渲染函数，是 xadmin-ui 的核心功能。

#### 函数签名

```typescript
function C(args: string | CProps): ReactNode

interface CProps {
  is: string                    // 组件标识
  [key: string]: any           // 其他props
}
```

#### 参数

- `args`: string | CProps
  - 字符串形式: 组件名称
  - 对象形式: 包含 `is` 属性的配置对象

#### 返回值

ReactNode - 渲染的组件

#### 使用示例

```javascript
// 字符串形式
const button = <C is="Button" type="primary">按钮</C>

// 对象形式
const config = {
  is: 'Button',
  type: 'primary',
  children: '按钮',
  onClick: handleClick
}
const button2 = <C {...config} />

// 嵌套使用
const card = (
  <C is="Card" title="卡片标题">
    <C is="Button" type="primary">确定</C>
    <C is="Button">取消</C>
  </C>
)
```

### lazy - 懒加载包装器

React 组件懒加载包装器，支持自定义 fallback。

#### 函数签名

```typescript
function lazy(
  factory: () => Promise<{ default: ComponentType }>,
  fallback?: ReactNode
): ComponentType
```

#### 参数

- `factory`: 返回 Promise 的函数，Promise 解析为包含 default 组件的对象
- `fallback`: 可选，加载时显示的内容，默认为 `<Loading />`

#### 返回值

ComponentType - 懒加载的组件

#### 使用示例

```javascript
// 自动使用默认Loading
const LazyModal = C.lazy('Modal')

// 自定义fallback
const LazyTable = C.lazy(() => import('./HeavyTable'),
  <div className="loading-spinner">加载中...</div>
)

// 使用
function MyComponent() {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <button onClick={() => setVisible(true)}>
        打开表格
      </button>
      <LazyTable visible={visible} />
    </div>
  )
}
```

## 布局组件

### Main - 主容器

应用的主容器组件。

#### 组件Props

```typescript
interface MainProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
}
```

#### 使用示例

```javascript
<Main>
  <h1>应用标题</h1>
  <App />
</Main>
```

### App - 应用容器

应用级别的容器组件。

#### 组件Props

```typescript
interface AppProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
}
```

#### 使用示例

```javascript
<App>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/users" element={<UserManagement />} />
  </Routes>
</App>
```

### Page - 页面容器

页面级别的容器组件，包含标题和面包屑。

#### 组件Props

```typescript
interface PageProps {
  title?: ReactNode
  subTitle?: ReactNode
  breadcrumb?: BreadcrumbItem[]
  extra?: ReactNode
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

interface BreadcrumbItem {
  title: ReactNode
  path?: string
}
```

#### 使用示例

```javascript
<Page
  title="用户管理"
  subTitle="管理系统用户信息"
  extra={
    <Button type="primary">添加用户</Button>
  }
>
  <UserTable />
</Page>
```

### Dashboard - 仪表盘

仪表盘布局组件。

#### 组件Props

```typescript
interface DashboardProps {
  children?: ReactNode
  gutter?: number
  className?: string
}

interface DashboardItemProps {
  title?: ReactNode
  value?: ReactNode
  extra?: ReactNode
  span?: number
  children?: ReactNode
}
```

#### 使用示例

```javascript
<Dashboard>
  <Dashboard.Item title="总用户数" value={1234} extra="较昨日 +12%" />
  <Dashboard.Item title="今日访问" value={567} />
  <Dashboard.Item title="订单数量" value={89} />
</Dashboard>
```

## 导航组件

### Menu - 菜单

导航菜单组件。

#### 组件Props

```typescript
interface MenuProps {
  mode?: 'vertical' | 'horizontal' | 'inline'
  theme?: 'light' | 'dark'
  defaultOpenKeys?: string[]
  defaultSelectedKeys?: string[]
  selectedKeys?: string[]
  openKeys?: string[]
  onOpenChange?: (keys: string[]) => void
  onSelect?: (info: MenuInfo) => void
  children?: ReactNode
}

interface MenuInfo {
  key: string
  keyPath: string[]
  item: ReactNode
  domEvent: React.MouseEvent
}
```

#### Menu.Item Props

```typescript
interface MenuItemProps {
  key?: string
  disabled?: boolean
  icon?: ReactNode
  children?: ReactNode
}
```

#### Menu.SubMenu Props

```typescript
interface SubMenuProps {
  key?: string
  title: ReactNode
  icon?: ReactNode
  children?: ReactNode
}
```

#### 使用示例

```javascript
<Menu mode="vertical" theme="dark" onSelect={handleMenuSelect}>
  <Menu.Item key="dashboard" icon={<C is="Icon" type="home" />}>
    仪表盘
  </Menu.Item>
  <Menu.SubMenu key="user" title="用户管理" icon={<C is="Icon" type="user" />}>
    <Menu.Item key="user-list">用户列表</Menu.Item>
    <Menu.Item key="user-add">添加用户</Menu.Item>
  </Menu.SubMenu>
</Menu>
```

### Tabs - 标签页

标签页组件。

#### 组件Props

```typescript
interface TabsProps {
  activeKey?: string
  defaultActiveKey?: string
  onChange?: (key: string) => void
  type?: 'line' | 'card' | 'editable-card'
  size?: 'small' | 'middle' | 'large'
  tabBarExtraContent?: ReactNode
  children?: ReactNode
}

interface TabsItemProps {
  key: string
  title: ReactNode
  closable?: boolean
  children?: ReactNode
}
```

#### 使用示例

```javascript
<Tabs defaultActiveKey="1" onChange={handleTabChange}>
  <Tabs.Item key="1" title="基础信息">
    <BasicInfo />
  </Tabs.Item>
  <Tabs.Item key="2" title="高级设置">
    <AdvancedSettings />
  </Tabs.Item>
</Tabs>
```

### Dropdown - 下拉菜单

下拉菜单组件。

#### 组件Props

```typescript
interface DropdownProps {
  overlay: ReactNode
  trigger?: ('click' | 'hover' | 'contextMenu')[]
  placement?: string
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
  children?: ReactNode
}
```

#### 使用示例

```javascript
const menu = (
  <Menu>
    <Menu.Item key="edit">编辑</Menu.Item>
    <Menu.Item key="delete">删除</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="export">导出</Menu.Item>
  </Menu>
)

<Dropdown overlay={menu} trigger={['click']}>
  <Button>操作</Button>
</Dropdown>
```

## 交互组件

### Button - 按钮

按钮组件。

#### 组件Props

```typescript
interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger' | 'link' | 'text'
  size?: 'small' | 'middle' | 'large'
  shape?: 'circle' | 'round'
  loading?: boolean
  disabled?: boolean
  icon?: string | ReactNode
  ghost?: boolean
  block?: boolean
  onClick?: (event: React.MouseEvent) => void
  children?: ReactNode
}
```

#### 使用示例

```javascript
<Button type="primary" size="large" loading={submitting}>
  提交
</Button>

<Button type="danger" shape="circle" icon="delete" />

<Button block>块级按钮</Button>

<Button type="link">链接样式</Button>
```

### Modal - 模态框

模态框组件。

#### 组件Props

```typescript
interface ModalProps {
  visible?: boolean
  title?: ReactNode
  onOk?: () => void
  onCancel?: () => void
  okText?: string
  cancelText?: string
  width?: number | string
  height?: number | string
  centered?: boolean
  maskClosable?: boolean
  closable?: boolean
  footer?: ReactNode
  children?: ReactNode
}
```

#### 使用示例

```javascript
<Modal
  title="确认"
  visible={visible}
  onOk={handleOk}
  onCancel={handleCancel}
  okText="确定"
  cancelText="取消"
  width={600}
>
  <p>确定要执行此操作吗？</p>
</Modal>
```

### Popover - 弹出框

弹出框组件。

#### 组件Props

```typescript
interface PopoverProps {
  content?: ReactNode
  title?: ReactNode
  trigger?: ('click' | 'hover' | 'focus')[]
  placement?: string
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
  children?: ReactNode
}
```

#### 使用示例

```javascript
<Popover
  content={
    <div>
      <p>详细说明</p>
      <Button type="text">了解更多</Button>
    </div>
  }
  title="帮助信息"
  trigger="hover"
>
  <Button>悬停提示</Button>
</Popover>
```

### Tooltip - 提示框

提示框组件。

#### 组件Props

```typescript
interface TooltipProps {
  title?: ReactNode
  placement?: string
  trigger?: ('hover' | 'click' | 'focus')[]
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
  children?: ReactNode
}
```

#### 使用示例

```javascript
<Tooltip title="这是一个提示" placement="top">
  <Icon type="help" />
</Tooltip>
```

## 数据展示组件

### Table - 表格

表格组件。

#### 组件Props

```typescript
interface TableProps {
  columns?: Column[]
  dataSource?: any[]
  loading?: boolean
  pagination?: PaginationConfig | false
  rowSelection?: RowSelectionConfig
  size?: 'small' | 'middle' | 'large'
  bordered?: boolean
  scroll?: { x?: number, y?: number }
  onChange?: (
    pagination: any,
    filters: any,
    sorter: any,
    extra: any
  ) => void
  rowKey?: string | ((record: any) => string)
}

interface Column {
  title?: ReactNode
  dataIndex?: string
  key?: string
  width?: number | string
  fixed?: 'left' | 'right'
  sorter?: boolean | SorterConfig
  filters?: FilterConfig[]
  render?: (value: any, record: any, index: number) => ReactNode
}
```

#### 使用示例

```javascript
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    sorter: true
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <div>
        <Button type="link" size="small">编辑</Button>
        <Button type="link" danger size="small">删除</Button>
      </div>
    )
  }
]

<Table
  columns={columns}
  dataSource={users}
  loading={loading}
  pagination={{
    total: 100,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true
  }}
  rowSelection={{
    onChange: (selectedRowKeys) => {
      console.log('选中的行:', selectedRowKeys)
    }
  }}
/>
```

### Card - 卡片

卡片组件。

#### 组件Props

```typescript
interface CardProps {
  title?: ReactNode
  extra?: ReactNode
  bordered?: boolean
  hoverable?: boolean
  size?: 'small' | 'default'
  loading?: boolean
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

interface CardMetaProps {
  avatar?: ReactNode
  title?: ReactNode
  description?: ReactNode
}
```

#### 使用示例

```javascript
<Card
  title="用户信息"
  extra={<Button type="link">更多</Button>}
  hoverable
>
  <Card.Meta
    avatar={<Avatar>U</Avatar>}
    title="用户名"
    description="用户的详细描述信息"
  />
</Card>
```

### List - 列表

列表组件。

#### 组件Props

```typescript
interface ListProps {
  itemLayout?: 'horizontal' | 'vertical'
  dataSource?: any[]
  loading?: boolean
  pagination?: PaginationConfig
  renderItem?: (item: any, index: number) => ReactNode
}

interface ListItemProps {
  actions?: ReactNode[]
  extra?: ReactNode
  children?: ReactNode
}
```

#### 使用示例

```javascript
<List
  itemLayout="horizontal"
  dataSource={users}
  renderItem={user => (
    <List.Item
      actions={[
        <Button type="link" key="edit">编辑</Button>,
        <Button type="link" danger key="delete">删除</Button>
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar>{user.name[0]}</Avatar>}
        title={<a href="">{user.name}</a>}
        description={user.email}
      />
    </List.Item>
  )}
/>
```

### Badge - 徽章

徽章组件。

#### 组件Props

```typescript
interface BadgeProps {
  count?: number | ReactNode
  showZero?: boolean
  dot?: boolean
  status?: 'success' | 'error' | 'warning' | 'processing' | 'default'
  text?: string
  children?: ReactNode
}
```

#### 使用示例

```javascript
<Badge count={5}>
  <Button shape="circle" icon="bell" />
</Badge>

<Badge dot>
  <Button>小红点</Button>
</Badge>

<Badge status="success" text="成功" />
```

### Empty - 空状态

空状态组件。

#### 组件Props

```typescript
interface EmptyProps {
  image?: string | ReactNode
  description?: ReactNode
  children?: ReactNode
}
```

#### 使用示例

```javascript
<Empty
  description="暂无数据"
  image="https://example.com/empty.png"
>
  <Button type="primary">创建数据</Button>
</Empty>
```

### Alert - 提示

提示组件。

#### 组件Props

```typescript
interface AlertProps {
  message?: ReactNode
  description?: ReactNode
  type?: 'success' | 'error' | 'warning' | 'info'
  showIcon?: boolean
  closable?: boolean
  onClose?: () => void
}
```

#### 使用示例

```javascript
<Alert
  message="成功提示"
  description="操作已成功完成"
  type="success"
  showIcon
  closable
/>
```

## 表单组件

### Input - 输入框

输入框组件。

#### 组件Props

```typescript
interface InputProps {
  placeholder?: string
  disabled?: boolean
  size?: 'small' | 'middle' | 'large'
  prefix?: ReactNode
  suffix?: ReactNode
  addonBefore?: ReactNode
  addonAfter?: ReactNode
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onPressEnter?: (event: React.KeyboardEvent) => void
}
```

#### Input.Password Props

```typescript
interface InputPasswordProps extends InputProps {
  visibilityToggle?: boolean
}
```

#### Input.Search Props

```typescript
interface InputSearchProps extends InputProps {
  onSearch?: (value: string) => void
  enterButton?: ReactNode
}
```

#### 使用示例

```javascript
<Input placeholder="请输入用户名" />

<Input.Password placeholder="请输入密码" />

<Input.Search
  placeholder="搜索用户"
  onSearch={handleSearch}
  enterButton="搜索"
/>

<Input.Group compact>
  <Input style={{ width: '30%' }} defaultValue="+86" />
  <Input style={{ width: '70%' }} placeholder="手机号" />
</Input.Group>
```

### Check - 复选框

复选框组件。

#### Check Props

```typescript
interface CheckProps {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  children?: ReactNode
}
```

#### Check.Radio Props

```typescript
interface CheckRadioProps extends CheckProps {
  value?: any
}
```

#### Check.Group Props

```typescript
interface CheckGroupProps {
  options?: Array<{ label: ReactNode, value: any }>
  value?: any[]
  onChange?: (checkedValues: any[]) => void
  children?: ReactNode
}
```

#### 使用示例

```javascript
<Check>同意条款</Check>

<Check.Radio checked>单选框</Check.Radio>

<Check.Group>
  <Check.Radio value="A">选项A</Check.Radio>
  <Check.Radio value="B">选项B</Check.Radio>
</Check.Group>

<Check.Group
  options={[
    { label: '选项1', value: 'option1' },
    { label: '选项2', value: 'option2' }
  ]}
  onChange={handleChange}
/>
```

### Select - 选择器

选择器组件。

#### 组件Props

```typescript
interface SelectProps {
  placeholder?: string
  disabled?: boolean
  size?: 'small' | 'middle' | 'large'
  mode?: 'multiple' | 'tags'
  value?: any
  onChange?: (value: any) => void
  options?: Array<{ label: ReactNode, value: any, disabled?: boolean }>
  children?: ReactNode
  allowClear?: boolean
  showSearch?: boolean
  filterOption?: (input: string, option: any) => boolean
}
```

#### 使用示例

```javascript
<Select
  placeholder="请选择"
  style={{ width: 200 }}
  onChange={handleChange}
>
  <Option value="option1">选项1</Option>
  <Option value="option2">选项2</Option>
</Select>

<Select
  mode="multiple"
  placeholder="请选择多个选项"
  style={{ width: '100%' }}
>
  <Option value="tag1">标签1</Option>
  <Option value="tag2">标签2</Option>
</Select>
```

## 工具组件

### Icon - 图标

图标组件。

#### 组件Props

```typescript
interface IconProps {
  type: string
  size?: number
  color?: string
  spin?: boolean
  className?: string
  style?: CSSProperties
}
```

#### 使用示例

```javascript
<Icon type="home" />
<Icon type="user" size={24} color="red" />
<Icon type="loading" spin />
```

### Loading - 加载

加载状态组件。

#### 组件Props

```typescript
interface LoadingProps {
  tip?: string
  size?: 'small' | 'default' | 'large'
  spinning?: boolean
  children?: ReactNode
}
```

#### 使用示例

```javascript
<Loading />

<Loading tip="加载中..." />

<Loading spinning={loading}>
  <div>内容区域</div>
</Loading>
```

## 组件注册

### 注册自定义组件

```javascript
import xadmin from 'xadmin'

// 注册组件
xadmin.set('components.MyComponent', ({ name, ...props }) => (
  <div className="my-component">
    <h2>Hello, {name}!</h2>
  </div>
))

// 使用组件
<C is="MyComponent" name="World" />
```

### 覆盖默认组件

```javascript
// 覆盖Button组件
xadmin.set('components.Button', ({ type, children, ...props }) => (
  <button className={`btn btn-${type}`} {...props}>
    {children}
  </button>
))
```

### 批量注册组件

```javascript
xadmin.set('components', {
  'Custom.Component1': Component1,
  'Custom.Component2': Component2,
  'Custom.Component3': Component3
})
```

## 路由系统

### 自动注册路由

xadmin-ui 会自动注册基础路由：

```javascript
{
  '/': {
    path: '/',
    element: <Navigate to="/app/" replace />
  },
  '/@': {
    path: '/',
    component: <Main />
  },
  '/app/': [
    { path: '', element: <Navigate to="/app/dashboard" replace /> },
    { path: 'app/', component: <App /> },
    { path: 'dashboard', component: <Dashboard /> }
  ]
}
```

### 自定义路由

```javascript
import xadmin from 'xadmin'

// 添加自定义路由
xadmin.add('routers', {
  path: '/custom',
  element: <CustomPage />
})

// 替换默认路由
xadmin.set('routers', {
  '/': {
    path: '/',
    element: <CustomHome />
  }
})
```

## 状态管理

### loading 状态

xadmin-ui 提供了全局的 loading 状态管理：

```javascript
// 触发loading
xadmin.dispatch({ type: 'START_LOADING', key: 'submit' })

// 结束loading
xadmin.dispatch({ type: 'END_LOADING', key: 'submit' })

// 在组件中使用
function LoadingButton() {
  const { loading } = useModel('loading')

  return (
    <Button loading={loading['submit']}>
      提交
    </Button>
  )
}
```

## 最佳实践

### 1. 组件命名规范

```javascript
// 使用语义化的组件名
<C is="UserList" />
<C is="OrderForm" />
<C is="DashboardCard" />
```

### 2. 懒加载优化

```javascript
// 对大型组件使用懒加载
const HeavyComponent = C.lazy('HeavyComponent')

// 在路由中使用
const routes = [
  {
    path: '/heavy',
    element: <HeavyComponent />
  }
]
```

### 3. 组件复用

```javascript
// 创建可复用的组合组件
const DataTable = ({ columns, dataSource, ...props }) => (
  <div className="data-table">
    <Table
      columns={columns}
      dataSource={dataSource}
      {...props}
    />
    <Table.Pagination />
  </div>
)

// 使用
<DataTable
  columns={userColumns}
  dataSource={users}
  loading={loading}
/>
```

## TypeScript 支持

### 类型定义

```typescript
interface CProps {
  is: string
  [key: string]: any
}

type ComponentType = React.ComponentType<any>

interface UIPlugin {
  name: 'xadmin.ui'
  items: {
    components: { type: 'map' }
  }
  components: Record<string, ComponentType>
  blocks: Record<string, ComponentType>
  routers: Record<string, RouteConfig>
  reducers: Record<string, Reducer>
}

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger' | 'link'
  size?: 'small' | 'middle' | 'large'
  shape?: 'circle' | 'round'
  loading?: boolean
  disabled?: boolean
  icon?: string | ReactNode
  ghost?: boolean
  block?: boolean
  onClick?: (event: React.MouseEvent) => void
  children?: ReactNode
}
```

## 示例代码

### 完整的页面示例

```javascript
import { Page, Table, Button, Card, Space } from 'xadmin-ui'

function UserManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '状态',
      dataIndex: 'active',
      key: 'active',
      render: (active) => (
        <Badge status={active ? 'success' : 'error'} text={active ? '激活' : '未激活'} />
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small">编辑</Button>
          <Button type="link" danger size="small">删除</Button>
        </Space>
      )
    }
  ]

  return (
    <Page
      title="用户管理"
      extra={
        <Button type="primary">添加用户</Button>
      }
    >
      <Card>
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          rowSelection={{
            selectedRowKeys: selectedRows,
            onChange: setSelectedRows
          }}
          pagination={{
            total: users.length,
            pageSize: 10,
            showSizeChanger: true
          }}
        />
      </Card>
    </Page>
  )
}
```

## 变更日志

### v3.3.3
- 优化懒加载机制
- 改进组件注册系统
- 新增表格批量操作支持

### v3.3.0
- 重构组件系统
- 支持动态组件加载
- 新增路由自动配置

### v3.0.0
- 基于React Hooks重构
- 支持Jotai状态管理
- 简化API接口
- 移除Redux依赖

### v2.x
- 基础组件库
- Redux集成