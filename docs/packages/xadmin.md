# Xadmin 核心库使用指南

## 概述

Xadmin 是一个用于构建管理后台的JavaScript核心库，采用插件化架构设计，支持React、Redux、React Router等现代前端技术栈。

## 安装

```bash
npm install xadmin
# 或
yarn add xadmin
```

## 基础使用

### 1. 创建应用实例

```javascript
import { App } from 'xadmin'

const app = new App()
```

### 2. 使用插件

```javascript
import reactApp from 'xadmin'
import reduxApp from 'xadmin'
// 导入其他插件...

// 使用插件
app.use(reactApp)
   .use(reduxApp)
   .use(otherPlugin)
```

### 3. 启动应用

```javascript
// 启动应用
app.start({
  // 初始化上下文
  initialData: {}
})
```

## 核心API

### 全局实例

```javascript
import xadmin, { app } from 'xadmin'

// xadmin 和 app 指向同一个全局实例
```

### 配置管理

```javascript
// 获取配置
const config = xadmin.config('key', 'defaultValue')

// 设置配置（通常在插件中）
xadmin.set('key', value)
```

### 钩子系统

```javascript
// 执行钩子
const result = xadmin.use('hookName', ...args)

// 注册钩子处理函数
xadmin.add('hooks.hookName', handler)
```

### API实例创建

```javascript
import { RESTBaseAPI, api } from 'xadmin'

// 创建API实例
const myApi = api({
  baseURL: 'https://api.example.com',
  headers: {
    'Authorization': 'Bearer token'
  }
})

// 使用API实例
myApi.get('users')
  .then(data => console.log(data))
  .catch(err => console.error(err))
```

## 组件系统

### Block 组件

```javascript
import { Block, block } from 'xadmin'

// 使用组件块
<Block tag="MyComponent" prop1="value1" prop2="value2">
  {children}
</Block>

// 函数式使用
block('MyComponent', { prop1: 'value1' })
```

## React集成

### 路由系统

```javascript
import { AppRouters } from 'xadmin'

function App() {
  return (
    <AppRouters>
      {/* 路由配置由插件自动处理 */}
    </AppRouters>
  )
}
```

### React Router Hooks

```javascript
import {
  useLocation,
  useNavigate,
  useParams
} from 'xadmin'

function MyComponent() {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()

  // 使用路由功能
  const handleClick = () => {
    navigate('/new-path')
  }

  return (
    <div>
      <p>当前路径: {location.pathname}</p>
      <button onClick={handleClick}>导航</button>
    </div>
  )
}
```

## Redux集成

### Redux Hook

```javascript
import { redux } from 'xadmin'

function MyComponent() {
  const { store, dispatch, state, user } = redux(
    state => ({ user: state.auth.user })
  )

  const handleAction = () => {
    dispatch({ type: 'ACTION_TYPE', payload: 'data' })
  }

  return (
    <div>
      <p>用户: {user?.name}</p>
      <button onClick={handleAction}>触发Action</button>
    </div>
  )
}
```

## RESTBaseAPI使用

### 基础用法

```javascript
import { RESTBaseAPI } from 'xadmin'

class UserAPI extends RESTBaseAPI {
  async fetch(id, options) {
    // 实现基础的fetch方法
    const response = await fetch(`${this.baseURL}/users/${id}`, options)
    return response.json()
  }
}

const userApi = new UserAPI({
  baseURL: 'https://api.example.com'
})

// CRUD操作
await userApi.get(1)                    // 获取单个用户
await userApi.post({ name: 'John' })    // 创建用户
await userApi.put(1, { name: 'Jane' })  // 更新用户
await userApi.patch(1, { age: 30 })     // 部分更新
await userApi.delete(1)                 // 删除用户
await userApi.query({ page: 1 })        // 查询列表
await userApi.count({ active: true })   // 计算数量
```

### 智能保存

```javascript
// 根据数据是否包含id自动选择创建或更新
const newUser = { name: 'John' }
await userApi.save(newUser)             // POST 创建

const existingUser = { id: 1, name: 'Jane' }
await userApi.save(existingUser)        // PUT 更新

// 强制使用部分更新
await userApi.save(existingUser, true)  // PATCH 部分更新
```

## 插件开发

### 创建插件

```javascript
const myPlugin = {
  name: 'my-plugin',

  // 配置项
  config: {
    myConfig: { default: 'value' }
  },

  // 初始化函数
  start: (app) => {
    console.log('插件启动')
  },

  // 数据项定义
  items: {
    myData: { type: 'map' }
  },

  // 钩子处理
  hooks: {
    'some.hook': (app, ...args) => {
      return args
    }
  }
}

// 使用插件
app.use(myPlugin)
```

## 最佳实践

### 1. 插件顺序

确保插件按正确顺序加载：

```javascript
// 1. 核心插件
app.use(xadmin)

// 2. 功能插件
app.use(i18nPlugin)
app.use(authPlugin)
app.use(formPlugin)

// 3. UI插件
app.use(uiPlugin)
```

### 2. 错误处理

```javascript
import { api } from 'xadmin'

const myApi = api()

try {
  const data = await myApi.get('resource')
} catch (error) {
  app.error('API调用失败', error)
}
```

### 3. 配置管理

```javascript
// 集中管理配置
app.set('app', {
  name: 'My Admin',
  version: '1.0.0',
  theme: 'light'
})

// 使用配置
const appName = app.config('app.name', 'Admin')
```

## 技术栈

- React (>= 16.8)
- React Router (^6.3.0)
- Redux (^4)
- React-Redux (^8)
- Redux-Saga (^1)
- Lodash (^4)

## 版本信息

当前版本: 3.0.2

## 更多资源

- [API参考文档](./api.md)
- [插件开发指南](../guides/plugin-development.md)
- [最佳实践](../guides/best-practices.md)