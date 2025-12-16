# Xadmin UI 基础UI组件库使用指南

## 概述

xadmin-ui 是 Xadmin 框架的基础UI组件库，提供了构建管理后台所需的各种UI组件，采用插件化架构，支持动态组件加载和按需渲染。

## 安装

```bash
npm install xadmin-ui
# 或
yarn add xadmin-ui
```

## 基础使用

### 1. 集成到 Xadmin

```javascript
import xadmin from 'xadmin'
import uiPlugin from 'xadmin-ui'

// 注册UI插件
xadmin.use(uiPlugin)
```

### 2. 使用组件

```javascript
import { C, Button, Modal, Table } from 'xadmin-ui'

function MyComponent() {
  return (
    <div>
      {/* 直接使用组件 */}
      <Button type="primary">主要按钮</Button>

      {/* 使用C函数动态渲染 */}
      <C is="Card" title="卡片标题">
        <p>卡片内容</p>
      </C>

      {/* 懒加载组件 */}
      <C.lazy('Modal') visible={true}>
        模态框内容
      </C.lazy>
    </div>
  )
}
```

## 核心组件

### C - 组件渲染器

C 函数是 xadmin-ui 的核心，提供了动态组件渲染能力：

```javascript
import { C } from 'xadmin-ui'

// 字符串形式 - 通过组件名获取
const button = <C is="Button" type="primary">按钮</C>

// 对象形式 - 完整配置
const config = {
  is: 'Button',
  type: 'primary',
  children: '按钮',
  onClick: () => console.log('clicked')
}
const button2 = <C {...config} />

// 懒加载包装
const LazyModal = C.lazy('Modal')
<LazyModal visible={true}>内容</LazyModal>
```

### 布局组件

#### Main - 主容器

```javascript
import { Main } from 'xadmin-ui'

function AppLayout() {
  return (
    <Main>
      <h1>应用标题</h1>
      <p>主要内容</p>
    </Main>
  )
}
```

#### Page - 页面容器

```javascript
import { Page } from 'xadmin-ui'

function UserPage() {
  return (
    <Page title="用户管理" subTitle="管理系统用户">
      <p>页面内容</p>
    </Page>
  )
}
```

#### Dashboard - 仪表盘

```javascript
import { Dashboard } from 'xadmin-ui'

function Home() {
  return (
    <Dashboard>
      <Dashboard.Item title="总用户数" value={1234} />
      <Dashboard.Item title="今日访问" value={567} />
    </Dashboard>
  )
}
```

### 导航组件

#### Menu - 菜单

```javascript
import { Menu } from 'xadmin-ui'

function AppMenu() {
  return (
    <Menu mode="vertical" theme="dark">
      <Menu.Item key="1">
        <C is="Icon" type="home" />
        首页
      </Menu.Item>
      <Menu.SubMenu key="user" title="用户管理">
        <Menu.Item key="user-list">用户列表</Menu.Item>
        <Menu.Item key="user-add">添加用户</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}
```

#### Tabs - 标签页

```javascript
import { Tabs } from 'xadmin-ui'

function TabExample() {
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.Item key="1" title="基础信息">
        基础信息内容
      </Tabs.Item>
      <Tabs.Item key="2" title="高级设置">
        高级设置内容
      </Tabs.Item>
    </Tabs>
  )
}
```

#### Dropdown - 下拉菜单

```javascript
import { Dropdown, Button } from 'xadmin-ui'

function DropdownExample() {
  const menu = (
    <Menu>
      <Menu.Item key="edit">编辑</Menu.Item>
      <Menu.Item key="delete">删除</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="export">导出</Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>操作</Button>
    </Dropdown>
  )
}
```

### 交互组件

#### Button - 按钮

```javascript
import { Button } from 'xadmin-ui'

function ButtonExample() {
  return (
    <div>
      <Button type="primary">主要按钮</Button>
      <Button type="secondary">次要按钮</Button>
      <Button type="danger">危险按钮</Button>
      <Button type="link">链接按钮</Button>

      <Button size="small">小按钮</Button>
      <Button size="large">大按钮</Button>

      <Button loading>加载中</Button>
      <Button disabled>禁用</Button>

      <Button icon="plus">带图标</Button>
      <Button circle><C is="Icon" type="plus" /></Button>
    </div>
  )
}
```

#### Modal - 模态框

```javascript
import { Modal, Button } from 'xadmin-ui'

function ModalExample() {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <Button onClick={() => setVisible(true)}>
        打开模态框
      </Button>

      <Modal
        title="确认"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        okText="确定"
        cancelText="取消"
      >
        <p>确定要执行此操作吗？</p>
      </Modal>
    </div>
  )
}
```

#### Popover - 弹出框

```javascript
import { Popover, Button } from 'xadmin-ui'

function PopoverExample() {
  const content = (
    <div>
      <p>弹出框内容</p>
      <Button type="text">了解更多</Button>
    </div>
  )

  return (
    <Popover content={content} title="标题" trigger="hover">
      <Button>悬停显示</Button>
    </Popover>
  )
}
```

#### Tooltip - 提示框

```javascript
import { Tooltip, Button } from 'xadmin-ui'

function TooltipExample() {
  return (
    <Tooltip title="这是一个提示">
      <Button>悬停提示</Button>
    </Tooltip>
  )
}
```

### 数据展示组件

#### Table - 表格

```javascript
import { Table, Button, Popconfirm } from 'xadmin-ui'

function TableExample() {
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
      key: 'age'
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button type="link" size="small">
            编辑
          </Button>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => console.log('删除', record)}
          >
            <Button type="link" danger size="small">
              删除
            </Button>
          </Popconfirm>
        </div>
      )
    }
  ]

  const data = [
    { key: '1', name: '张三', age: 32, address: '北京' },
    { key: '2', name: '李四', age: 28, address: '上海' }
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowSelection={{
        onChange: (selectedRowKeys) => {
          console.log('选中的行:', selectedRowKeys)
        }
      }}
      pagination={{
        total: 100,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true
      }}
    />
  )
}
```

#### Card - 卡片

```javascript
import { Card, Button } from 'xadmin-ui'

function CardExample() {
  return (
    <div>
      {/* 基础卡片 */}
      <Card title="卡片标题" extra={<Button>更多</Button>}>
        <p>卡片内容</p>
      </Card>

      {/* 简洁卡片 */}
      <Card>
        <Card.Meta
          avatar={<C is="Icon" type="user" />}
          title="用户信息"
          description="用户的详细描述信息"
        />
      </Card>

      {/* 网格卡片 */}
      <Card.Grid style={{ width: '50%' }}>Grid 1</Card.Grid>
      <Card.Grid style={{ width: '50%' }}>Grid 2</Card.Grid>
    </div>
  )
}
```

#### List - 列表

```javascript
import { List, Avatar, Button } from 'xadmin-ui'

function ListExample() {
  const data = [
    {
      title: 'Ant Design Title 1',
      description: 'Ant Design, a design language for background applications'
    },
    {
      title: 'Ant Design Title 2',
      description: 'Ant Design, a design language for background applications'
    }
  ]

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <List.Item
          actions={[
            <Button type="link">编辑</Button>,
            <Button type="link" danger>删除</Button>
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar />}
            title={<a href="">{item.title}</a>}
            description={item.description}
          />
        </List.Item>
      )}
    />
  )
}
```

#### Badge - 徽章

```javascript
import { Badge, Button, Icon } from 'xadmin-ui'

function BadgeExample() {
  return (
    <div>
      <Badge count={5}>
        <Button shape="circle" icon="bell" />
      </Badge>

      <Badge count={0} showZero>
        <Button shape="circle" icon="mail" />
      </Badge>

      <Badge dot>
        <Button>小红点</Button>
      </Badge>

      <Badge count="New">
        <Button>文字徽章</Button>
      </Badge>
    </div>
  )
}
```

#### Empty - 空状态

```javascript
import { Empty, Button } from 'xadmin-ui'

function EmptyExample() {
  return (
    <Empty
      image="/path/to/image.png"
      description="暂无数据"
    >
      <Button type="primary">创建数据</Button>
    </Empty>
  )
}
```

#### Alert - 提示

```javascript
import { Alert } from 'xadmin-ui'

function AlertExample() {
  return (
    <div>
      <Alert message="成功提示" type="success" showIcon />
      <Alert message="信息提示" type="info" showIcon />
      <Alert message="警告提示" type="warning" showIcon />
      <Alert
        message="错误提示"
        description="详细的错误描述信息"
        type="error"
        showIcon
        closable
      />
    </div>
  )
}
```

### 表单组件

#### Input - 输入框

```javascript
import { Input, Form } from 'xadmin-ui'

function InputExample() {
  return (
    <div>
      <Input placeholder="基础输入框" />

      <Input.Password placeholder="密码输入框" />

      <Input.Search
        placeholder="搜索输入框"
        onSearch={value => console.log(value)}
      />

      <Input.TextArea
        placeholder="多行文本"
        rows={4}
      />

      <Input.Group compact>
        <Input style={{ width: '30%' }} defaultValue="0571" />
        <Input style={{ width: '70%' }} defaultValue="88888888" />
      </Input.Group>
    </div>
  )
}
```

#### Select - 选择器

```javascript
import { Select } from 'xadmin-ui'

const { Option } = Select

function SelectExample() {
  return (
    <div>
      <Select defaultValue="lucy" style={{ width: 200 }}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="yiminghe">yiminghe</Option>
      </Select>

      <Select
        mode="multiple"
        placeholder="请选择"
        style={{ width: 200 }}
      >
        <Option value="tag1">标签1</Option>
        <Option value="tag2">标签2</Option>
      </Select>
    </div>
  )
}
```

#### Check - 复选框

```javascript
import { Check } from 'xadmin-ui'

function CheckExample() {
  return (
    <div>
      <Check>复选框</Check>

      <Check.Group
        options={['Apple', 'Pear', 'Orange']}
        defaultValue={['Apple']}
      />

      <Check.Radio checked>单选框</Check.Radio>

      <Check.Radio.Group>
        <Check.Radio value="a">选项A</Check.Radio>
        <Check.Radio value="b">选项B</Check.Radio>
      </Check.Radio.Group>
    </div>
  )
}
```

### 工具组件

#### Icon - 图标

```javascript
import { Icon } from 'xadmin-ui'

function IconExample() {
  return (
    <div>
      <Icon type="home" />
      <Icon type="user" />
      <Icon type="setting" />

      {/* 带样式的图标 */}
      <Icon type="heart" style={{ color: 'red' }} />

      {/* 大小图标 */}
      <Icon type="search" size={16} />
      <Icon type="search" size={24} />
    </div>
  )
}
```

#### Loading - 加载

```javascript
import { Loading, Button } from 'xadmin-ui'

function LoadingExample() {
  const [loading, setLoading] = useState(false)

  return (
    <div>
      <Loading />

      <Button loading>加载中按钮</Button>

      <Loading tip="加载中...">
        <div style={{ padding: 50 }}>
          内容区域
        </div>
      </Loading>
    </div>
  )
}
```

## 组件定制

### 注册自定义组件

```javascript
import xadmin from 'xadmin'

// 注册自定义组件
xadmin.set('components.MyComponent', ({ name, ...props }) => (
  <div className="my-component">
    <h2>Hello, {name}!</h2>
  </div>
))

// 使用自定义组件
<C is="MyComponent" name="World" />
```

### 覆盖默认组件

```javascript
// 覆盖默认Button组件
xadmin.set('components.Button', ({ children, type, ...props }) => (
  <button className={`btn btn-${type}`} {...props}>
    {children}
  </button>
))
```

### 组件主题定制

```javascript
// 全局主题配置
xadmin.set('theme', {
  primaryColor: '#1890ff',
  borderRadius: '6px',
  fontSize: '14px'
})
```

## 懒加载

### lazy 函数使用

```javascript
import { lazy } from 'xadmin-ui'

// 懒加载组件
const LazyComponent = lazy(() => import('./HeavyComponent'))

// 在Suspense中使用
function App() {
  return (
    <React.Suspense fallback={<Loading />}>
      <LazyComponent />
    </React.Suspense>
  )
}
```

### 组件级别的懒加载

```javascript
// 自动使用默认Loading作为fallback
const LazyModal = C.lazy('Modal')

// 自定义fallback
const LazyTable = lazy(() => import('./Table'), <div>Loading...</div>)
```

## 路由集成

### 自动路由

xadmin-ui 会自动注册基础路由：

```javascript
// 默认路由配置
{
  '/': {
    path: '/',
    component: Main
  },
  '/app/': [
    { path: '', element: <Navigate to="/app/" replace /> },
    { path: 'app/', component: App },
    { path: 'dashboard', component: Dashboard }
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
```

## 状态管理

### loading 状态

```javascript
import xadmin from 'xadmin'

// 手动控制loading状态
xadmin.dispatch({ type: 'START_LOADING', key: 'submit' })

// 结束loading
xadmin.dispatch({ type: 'END_LOADING', key: 'submit' })
```

### 在组件中使用

```javascript
import { useModel } from 'xadmin-model'

function MyComponent() {
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

### 2. 响应式设计

```javascript
import { Grid } from 'xadmin-ui'

function ResponsiveLayout() {
  return (
    <Grid.Row gutter={16}>
      <Grid.Col xs={24} md={8} lg={6}>
        侧边栏
      </Grid.Col>
      <Grid.Col xs={24} md={16} lg={18}>
        主内容区
      </Grid.Col>
    </Grid.Row>
  )
}
```

### 3. 错误边界

```javascript
import xadmin from 'xadmin'

// 注册错误边界组件
xadmin.set('components.ErrorBoundary', ({ children, error }) => (
  <div className="error-boundary">
    <h2>出现错误</h2>
    <p>{error?.message}</p>
    <Button onClick={() => window.location.reload()}>
      刷新页面
    </Button>
  </div>
))
```

## API 参考

### 核心函数

#### C(args)
动态组件渲染函数

**参数:**
- `args`: string | object - 组件名或配置对象

**返回:** React.Element

#### lazy(factory, fallback?)
懒加载包装函数

**参数:**
- `factory`: Function - 返回Promise的函数
- `fallback`: ReactNode - 加载时的内容

**返回:** React.Component

### 组件Props

#### Button
- `type`: primary | secondary | danger | link
- `size`: small | medium | large
- `loading`: boolean
- `disabled`: boolean
- `icon`: string
- `circle`: boolean
- `onClick`: Function

#### Modal
- `visible`: boolean
- `title`: ReactNode
- `onOk`: Function
- `onCancel`: Function
- `okText`: string
- `cancelText`: string
- `width`: number | string

#### Table
- `columns`: Array - 列配置
- `dataSource`: Array - 数据源
- `rowSelection`: Object - 行选择配置
- `pagination`: Object | false - 分页配置
- `loading`: boolean
- `onChange`: Function - 分页、排序、筛选变化回调

## 技术栈

- React (>= 16.8)
- React Router 6
- React Redux (^8.0.0)
- Redux Saga (^1.0.2)
- Lodash (^4.17.11)

## 版本信息

当前版本: 3.3.3

## 更多资源

- [React Router 文档](https://reactrouter.com/)
- [React Redux 文档](https://react-redux.js.org/)
- [Xadmin 其他包文档](./)