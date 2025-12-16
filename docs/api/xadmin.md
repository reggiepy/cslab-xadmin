# Xadmin 核心 API 参考文档

## 概述

Xadmin 是一个用于构建管理后台的JavaScript核心库，本文档详细描述了其API接口。

## 全局实例

### 导入方式

```javascript
// 默认导入
import xadmin from 'xadmin'

// 命名导入
import { app, RESTBaseAPI, Block, config, use } from 'xadmin'
```

### 全局属性

#### app
全局应用实例，与 xadmin 指向同一个对象。

```javascript
import { app } from 'xadmin'
// 等同于
import xadmin from 'xadmin'
```

## 核心API

### app

#### use(key, ...args)
执行钩子函数

**参数:**
- `key` (string): 钩子键名
- `...args` (...any): 传递给钩子的参数

**返回:** any - 钩子执行结果

**示例:**
```javascript
const result = app.use('some.hook', arg1, arg2)
```

#### config(key, defaultValue)
获取配置值

**参数:**
- `key` (string): 配置键名
- `defaultValue` (any, 可选): 默认值

**返回:** any - 配置值或默认值

**示例:**
```javascript
const apiUrl = app.config('api.base', 'http://localhost:3000')
const debug = app.config('debug', false)
```

#### set(key, value)
设置配置值

**参数:**
- `key` (string): 配置键名
- `value` (any): 配置值

**返回:** app - 支持链式调用

**示例:**
```javascript
app.set('api.base', 'https://api.example.com')
   .set('debug', true)
```

#### get(key)
获取数据

**参数:**
- `key` (string): 数据键名

**返回:** any - 数据值

**示例:**
```javascript
const users = app.get('models.users')
const components = app.get('components')
```

#### reduce(key, reducer, init)
执行reduce操作

**参数:**
- `key` (string): 数据键名
- `reducer` (Function): reduce函数
- `init` (any): 初始值

**返回:** any - reduce结果

**示例:**
```javascript
const total = app.reduce('items', (sum, item) => sum + item.value, 0)
```

### RESTBaseAPI

RESTful API 基类，提供基础的CRUD操作。

#### 构造函数

```javascript
new RESTBaseAPI(options)
```

**参数:**
- `options` (object): 配置选项
  - `baseURL` (string): API基础URL
  - `headers` (object): 默认请求头
  - `timeout` (number): 请求超时时间

#### 实例方法

##### fetch(id, options) *抽象方法*
基础fetch方法，需要子类实现。

**参数:**
- `id` (string): 资源ID
- `options` (object): 请求选项

**返回:** Promise<Response>

##### get(id)
获取单个资源

**参数:**
- `id` (string): 资源ID

**返回:** Promise<any> - 资源数据

**示例:**
```javascript
const user = await api.get('user/1')
```

##### post(data)
创建资源

**参数:**
- `data` (object): 要创建的数据

**返回:** Promise<any> - 创建后的资源数据

**示例:**
```javascript
const newUser = await api.post({ name: 'John', email: 'john@example.com' })
```

##### put(id, data)
完整更新资源

**参数:**
- `id` (string): 资源ID
- `data` (object): 完整的更新数据

**返回:** Promise<any> - 更新后的资源数据

**示例:**
```javascript
const updatedUser = await api.put('user/1', { name: 'Jane', email: 'jane@example.com' })
```

##### patch(id, data)
部分更新资源

**参数:**
- `id` (string): 资源ID
- `data` (object): 部分更新数据

**返回:** Promise<any> - 更新后的资源数据

**示例:**
```javascript
const updatedUser = await api.patch('user/1', { name: 'Bob' })
```

##### delete(id)
删除资源

**参数:**
- `id` (string): 资源ID

**返回:** Promise<void>

**示例:**
```javascript
await api.delete('user/1')
```

##### query(filter, where)
查询资源列表

**参数:**
- `filter` (object): 过滤选项
  - `limit` (number): 限制数量
  - `skip` (number): 跳过数量
  - `order` (string): 排序规则
- `where` (object): 查询条件

**返回:** Promise<any> - 包含items和total的对象

**示例:**
```javascript
const result = await api.query(
  { limit: 10, skip: 0, order: 'created_at desc' },
  { active: true }
)
console.log(result.items)  // 数据列表
console.log(result.total)  // 总数
```

##### count(where)
计算资源数量

**参数:**
- `where` (object): 查询条件

**返回:** Promise<number> - 资源总数

**示例:**
```javascript
const total = await api.count({ active: true })
```

##### save(data, partial)
智能保存，根据数据是否包含ID自动选择创建或更新

**参数:**
- `data` (object): 要保存的数据
- `partial` (boolean, 可选): 是否部分更新

**返回:** Promise<any> - 保存后的数据

**示例:**
```javascript
// 自动判断创建
const user = await api.save({ name: 'John' })

// 强制部分更新
const updated = await api.save({ id: 1, name: 'Jane' }, true)
```

### Block 组件

动态组件块渲染组件。

#### 组件Props

##### tag (string)
要渲染的组件标签名。

```javascript
<Block tag="Button" type="primary">
  按钮
</Block>
```

##### children (ReactNode)
子组件或内容。

```javascript
<Block tag="Card">
  <p>卡片内容</p>
</Block>
```

##### ...props
其他props会传递给目标组件。

```javascript
<Block tag="Input" placeholder="请输入" value={value} onChange={onChange} />
```

### block 函数

函数式组件块渲染器。

```javascript
import { block } from 'xadmin'

const element = block('Button', { type: 'primary' }, '按钮内容')
```

**参数:**
- `tag` (string): 组件标签
- `props` (object): 组件属性
- `...children` (ReactNode): 子组件

## App 类

### 构造函数

```javascript
new App()
```

### 实例方法

#### use(plugin)
添加插件

**参数:**
- `plugin` (object): 插件对象

**返回:** App - 支持链式调用

**示例:**
```javascript
const app = new App()
app.use(plugin1).use(plugin2).use(plugin3)
```

#### unuse(plugin)
移除插件

**参数:**
- `plugin` (object): 插件对象

**返回:** App - 支持链式调用

#### get(key)
获取数据

**参数:**
- `key` (string): 数据键名

**返回:** any

#### set(key, value)
设置数据

**参数:**
- `key` (string): 数据键名
- `value` (any): 数据值

**返回:** App - 支持链式调用

#### reduce(key, reducer, init)
执行reduce操作

**参数:**
- `key` (string): 数据键名
- `reducer` (Function): reduce函数
- `init` (any): 初始值

**返回:** any

#### start(initContext)
启动应用

**参数:**
- `initContext` (object): 初始化上下文

**返回:** Promise<void>

## 插件接口

### 插件对象结构

```javascript
const plugin = {
  name: 'plugin-name',        // 插件名称

  // 初始化配置
  items: {
    config: { type: 'map' },
    components: { type: 'mapArray' }
  },

  // 启动函数
  start: (app) => {
    console.log('插件启动')
  },

  // 数据项
  config: {
    key: 'value'
  },

  // 组件
  components: {
    MyComponent: ReactComponent
  },

  // 钩子
  hooks: {
    'some.hook': (app, ...args) => {
      // 钩子逻辑
    }
  },

  // 路由
  routers: {
    '/path': { component: Component }
  }
}
```

## 配置系统

### 内置配置项

```javascript
{
  items: {
    config: { type: 'map' },      // 应用配置
    context: { type: 'array' },    // 初始化上下文
    start: { type: 'array' },     // 启动函数
    logger: { type: 'array' },     // 日志处理器
    blocks: { type: 'mapArray' }, // 组件块
    mappers: { type: 'mapArray' }, // 数据映射器
    hooks: { type: 'mapArray' }    // 钩子函数
  }
}
```

### 数据类型

- `map`: 键值对对象
- `array`: 数组
- `mapArray`: 嵌套的键值对数组

## 错误处理

### 全局错误处理

```javascript
app.error = (message, error) => {
  console.error(message, error)
  // 可以集成错误监控服务
}
```

### API错误

RESTBaseAPI的异步方法都会抛出错误，需要使用try-catch处理：

```javascript
try {
  const data = await api.get('users')
} catch (error) {
  console.error('API请求失败:', error)
  app.error('获取用户列表失败', error)
}
```

## 工具函数

### api(options)
创建API实例的工厂函数

**参数:**
- `options` (object): API配置选项

**返回:** RESTBaseAPI实例

```javascript
const userApi = api({
  baseURL: 'https://api.example.com',
  headers: { 'Authorization': 'Bearer token' }
})
```

## 事件系统

### on(event, handler)
监听事件

**参数:**
- `event` (string): 事件名
- `handler` (Function): 事件处理函数

### off(event, handler)
移除事件监听

### emit(event, ...args)
触发事件

## 示例代码

### 完整应用示例

```javascript
import { App } from 'xadmin'

// 创建应用
const app = new App()

// 配置
app.set('api.base', 'https://api.example.com')
app.set('debug', true)

// 使用插件
app.use(reactApp)
app.use(reduxApp)

// 启动应用
app.start({
  initialData: {}
})

// 使用API
const api = app.api({ baseURL: app.config('api.base') })
const users = await api.query({ limit: 10 })

// 使用组件
const button = <Block tag="Button" type="primary">点击</Block>
```

## TypeScript 支持

### 类型定义

```typescript
interface XAdminApp {
  use(key: string, ...args: any[]): any
  config(key: string, defaultValue?: any): any
  set(key: string, value: any): XAdminApp
  get(key: string): any
  reduce(key: string, reducer: Function, init?: any): any
}

interface RESTBaseAPIOptions {
  baseURL?: string
  headers?: Record<string, string>
  timeout?: number
}

class RESTBaseAPI {
  constructor(options: RESTBaseAPIOptions)
  fetch(id: string, options?: any): Promise<Response>
  get(id: string): Promise<any>
  post(data: any): Promise<any>
  put(id: string, data: any): Promise<any>
  patch(id: string, data: any): Promise<any>
  delete(id: string): Promise<void>
  query(filter?: any, where?: any): Promise<{items: any[], total: number}>
  count(where?: any): Promise<number>
  save(data: any, partial?: boolean): Promise<any>
}
```

## 版本兼容性

- Node.js >= 14
- React >= 16.8
- Redux >= 4
- React Router >= 6

## 变更日志

### v3.0.0
- 重构插件系统
- 新增Jotai状态管理支持
- 移除旧的Redux集成
- 更新React Router到v6

### v2.x
- 支持React 16.x
- 集成Redux Saga
- 基础组件系统