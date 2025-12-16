# Xadmin I18n API 参考文档

## 概述

xadmin-i18n 是 Xadmin 框架的国际化解决方案，基于 i18next 构建。本文档详细描述了其API接口。

## 导入方式

```javascript
// 默认导入 - 获取插件
import i18nPlugin from 'xadmin-i18n'

// 命名导入 - 获取工具函数
import { _t, i18next } from 'xadmin-i18n'
```

## 核心API

### _t(key, options)

翻译函数，用于获取国际化文本。

**参数:**
- `key` (string): 翻译键名
- `options` (object, 可选): 插值选项
  - `interpolation` (object): 插值配置
  - 其他插值变量

**返回:** string - 翻译后的文本

**示例:**
```javascript
// 基础翻译
_t('Login')  // 根据当前语言返回 'Login' 或 '登录'

// 带插值
_t('Add {{object}}', { object: '用户' })  // '添加用户'

// 复数形式
_t('Delete {{count}} item', { count: 1 })  // '删除 1 项'
_t('Delete {{count}} items', { count: 2 })  // '删除 2 项'

// 嵌套键
_t('menu.user.management')  // '用户管理'
```

### i18next

i18next 实例，提供完整的国际化API。

#### 主要方法

##### changeLanguage(lng)

切换语言。

**参数:**
- `lng` (string): 语言代码

**返回:** Promise<void>

**示例:**
```javascript
await i18next.changeLanguage('zh_Hans')
console.log('语言已切换')
```

##### language

获取当前语言。

**返回:** string

**示例:**
```javascript
const currentLang = i18next.language  // 'en' | 'zh_Hans'
```

##### languages

获取支持的语言列表。

**返回:** string[]

**示例:**
```javascript
const supportedLangs = i18next.languages  // ['en', 'zh_Hans']
```

##### getResource(lng, ns, key)

获取翻译资源。

**参数:**
- `lng` (string): 语言代码
- `ns` (string): 命名空间
- `key` (string): 翻译键

**返回:** any

**示例:**
```javascript
const translation = i18next.getResource('zh_Hans', 'translation', 'Login')
```

##### addResource(lng, ns, key, value)

添加翻译资源。

**参数:**
- `lng` (string): 语言代码
- `ns` (string): 命名空间
- `key` (string): 翻译键
- `value` (string): 翻译值

**示例:**
```javascript
i18next.addResource('zh_Hans', 'translation', 'Custom.Button', '自定义按钮')
```

##### addResources(lng, ns, resources)

批量添加翻译资源。

**参数:**
- `lng` (string): 语言代码
- `ns` (string): 命名空间
- `resources` (object): 翻译资源对象

**示例:**
```javascript
i18next.addResources('zh_Hans', 'translation', {
  'Button.Save': '保存',
  'Button.Cancel': '取消'
})
```

##### exists(key, options)

检查翻译是否存在。

**参数:**
- `key` (string): 翻译键
- `options` (object, 可选): 检查选项

**返回:** boolean

**示例:**
```javascript
if (i18next.exists('Custom.Text')) {
  console.log('翻译存在')
}
```

##### getFixedT(lng, ns)

获取特定语言的翻译函数。

**参数:**
- `lng` (string, 可选): 语言代码
- `ns` (string, 可选): 命名空间

**返回:** Function - 翻译函数

**示例:**
```javascript
const zhT = i18next.getFixedT('zh_Hans')
console.log(zhT('Login'))  // 总是返回中文翻译
```

## 插件配置

### 插件对象

```javascript
export default {
  name: 'xadmin.i18n',
  items: {
    locales: { type: 'mapArray' }  // 存储语言包
  },
  context: function(app, cb) {
    // 初始化i18n
    // ...
    cb(null, { ...context, _t: t, i18n: i18next })
  },
  locales: {
    // 内置语言包
    en: {},
    zh_Hans: {}
  }
}
```

### 配置选项

#### locale 配置

```javascript
app.set('locale', {
  // 基础配置
  debug: false,                    // 调试模式
  lng: 'en',                       // 默认语言
  fallbackLng: false,             // 无回退语言
  keySeparator: false,            // 无键分隔符
  nsSeparator: false,             // 无命名空间分隔符

  // 日期时间本地化
  moment: 'en',                   // moment.js 语言环境

  // 语言检测配置
  detection: {
    order: ['cookie', 'localStorage', 'navigator'],
    caches: ['localStorage', 'cookie'],
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng'
  },

  // 后端加载配置
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    addPath: '/locales/{{lng}}/{{ns}}.json'
  },

  // 缓存配置
  cache: {
    enabled: true,
    expirationTime: 7 * 24 * 60 * 60 * 1000  // 7天
  }
})
```

### 语言包注册

#### 单个语言包

```javascript
app.set('locales.en', {
  'Welcome': 'Welcome',
  'Login': 'Login',
  'User Management': 'User Management'
})

app.set('locales.zh_Hans', {
  'Welcome': '欢迎',
  'Login': '登录',
  'User Management': '用户管理'
})
```

#### 批量注册

```javascript
app.set('locales', {
  en: {
    'Welcome': 'Welcome',
    'Login': 'Login'
  },
  zh_Hans: {
    'Welcome': '欢迎',
    'Login': '登录'
  },
  zh_TW: {
    'Welcome': '歡迎',
    'Login': '登入'
  }
})
```

## 内置翻译

### 中文（简体）翻译包

xadmin-i18n 内置了完整的中文翻译，包含以下类别：

#### 基础操作
```javascript
{
  'Action': '操作',
  'Add': '添加',
  'Add {{object}}': '添加{{object}}',
  'Edit': '编辑',
  'Update': '更新',
  'Delete': '删除',
  'Delete {{count}} item': '删除 {{count}} 项',
  'Save': '保存',
  'Save {{name}} success': '保存{{name}}成功',
  'Search': '搜索',
  'Search {{object}}': '搜索{{object}}',
  'Reset': '重置',
  'Clear': '清除',
  'Cancel': '取消',
  'OK': '确定',
  'Confirm': '确认',
  'Back': '返回'
}
```

#### 用户相关
```javascript
{
  'Login': '登录',
  'Logout': '登出',
  'Sign Up': '注册',
  'Register': '注册',
  'Username': '用户名',
  'Password': '密码',
  'Email': '邮箱',
  'Confirm Password': '确认密码',
  'Forgot Password': '忘记密码',
  'Reset Password': '重置密码',
  'Change Password': '修改密码',
  'Captcha': '验证码',
  'Profile': '个人信息',
  'Settings': '设置'
}
```

#### 表单相关
```javascript
{
  'Required': '必填项',
  'Optional': '选填项',
  'Form': '表单',
  'Field': '字段',
  'Label': '标签',
  'Placeholder': '占位符',
  'Help Text': '帮助文本',
  'Validation': '验证',
  'Error': '错误',
  'Warning': '警告',
  'Info': '信息',
  'Success': '成功'
}
```

#### 分页相关
```javascript
{
  'Pagination': '分页',
  'Page': '页',
  'Per Page': '每页',
  'Total': '总计',
  'Items': '项',
  'First': '首页',
  'Previous': '上一页',
  'Next': '下一页',
  'Last': '末页',
  'Go to': '跳转到'
}
```

#### 系统消息
```javascript
{
  'Success': '成功',
  'Failed': '失败',
  'Error': '错误',
  'Warning': '警告',
  'Info': '信息',
  'Loading': '加载中',
  'No Data': '暂无数据',
  'Operation Success': '操作成功',
  'Operation Failed': '操作失败',
  'Network Error': '网络错误',
  'Server Error': '服务器错误'
}
```

## React 集成

### 在组件中使用

```javascript
import React from 'react'
import { _t, i18next } from 'xadmin-i18n'

function MyComponent() {
  const [currentLang, setCurrentLang] = useState(i18next.language)

  const changeLanguage = async (lng) => {
    await i18next.changeLanguage(lng)
    setCurrentLang(lng)
  }

  return (
    <div>
      <h1>{_t('Welcome to {{appName}}', { appName: 'Xadmin' })}</h1>

      <div>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('zh_Hans')}>中文</button>
      </div>

      <p>{_t('Current Language')}: {currentLang}</p>
    </div>
  )
}
```

### 动态语言切换

```javascript
import { useEffect } from 'react'
import { i18next } from 'xadmin-i18n'

function LanguageSwitcher() {
  useEffect(() => {
    // 监听语言变化
    const handleLanguageChanged = (lng) => {
      console.log('Language changed to:', lng)
      // 更新moment语言
      moment.locale(lng)
    }

    i18next.on('languageChanged', handleLanguageChanged)

    return () => {
      i18next.off('languageChanged', handleLanguageChanged)
    }
  }, [])

  return (
    <select
      value={i18next.language}
      onChange={(e) => i18next.changeLanguage(e.target.value)}
    >
      <option value="en">English</option>
      <option value="zh_Hans">中文</option>
    </select>
  )
}
```

## 高级功能

### 命名空间支持

虽然默认配置禁用了命名空间分隔符，但仍然可以使用：

```javascript
// 定义带命名空间的翻译
app.set('locales.zh_Hans', {
  'auth.login.title': '用户登录',
  'auth.login.username': '用户名',
  'auth.login.password': '密码',
  'user.profile.title': '个人资料'
})

// 使用
_t('auth.login.title')
```

### 复数规则

```javascript
// 定义复数规则
app.set('locales.en', {
  'item': '{{count}} item',
  'item_plural': '{{count}} items'
})

app.set('locales.zh_Hans', {
  'item': '{{count}} 项'
})

// 使用
_t('item', { count: 1 })  // "1 item" | "1 项"
_t('item', { count: 5 })  // "5 items" | "5 项"
```

### 上下文相关翻译

```javascript
// 定义上下文相关翻译
app.set('locales.zh_Hans', {
  'save_male': '保存',
  'save_female': '保存'
})

// 使用上下文
_t('save', { context: 'male' })
```

### 嵌套插值

```javascript
// 定义嵌套插值
_t('Hello {{name}}, you have {{count}} messages', {
  name: 'Alice',
  count: 5
})
// 输出: "Hello Alice, you have 5 messages"
```

### 格式化函数

```javascript
// 使用格式化函数
app.set('locales.en', {
  'price': 'Price: ${{val, formatNumber}}',
  'date': 'Date: {{val, formatDate}}'
})

// 自定义格式化函数
i18next.services.formatter.add('formatNumber', (value, lng, options) => {
  return new Intl.NumberFormat(lng, options).format(value)
})

i18next.services.formatter.add('formatDate', (value, lng, options) => {
  return new Intl.DateTimeFormat(lng, options).format(new Date(value))
})
```

## 性能优化

### 懒加载语言包

```javascript
// 动态加载语言包
const loadLanguage = async (lng) => {
  if (!i18next.hasResourceBundle(lng, 'translation')) {
    const translations = await import(`./locales/${lng}.json`)
    i18next.addResourceBundle(lng, 'translation', translations.default)
  }
  await i18next.changeLanguage(lng)
}
```

### 缓存策略

```javascript
// 配置缓存策略
app.set('locale', {
  cache: {
    enabled: true,
    expirationTime: 7 * 24 * 60 * 60 * 1000,  // 7天
    store: localStorage  // 存储位置
  }
})
```

### 按需加载翻译

```javascript
// 使用插件的代码分割
const Translations = React.lazy(() => import('./Translations'))

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Translations />
    </React.Suspense>
  )
}
```

## 错误处理

### 翻译缺失处理

```javascript
// 监听翻译缺失
i18next.on('missingKey', (lngs, namespace, key) => {
  console.warn(`Missing translation: ${key} for language: ${lngs}`)

  // 发送到错误监控服务
  errorReporting.captureMessage(`Missing translation: ${key}`, {
    tags: { i18n: true },
    extra: { key, lngs, namespace }
  })
})
```

### 回退策略

```javascript
// 配置回退语言
app.set('locale', {
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development'
})
```

## 工具函数

### getLanguageDirection(lng)

获取语言方向（ltr或rtl）。

```javascript
function getLanguageDirection(lng) {
  const rtlLanguages = ['ar', 'he', 'fa']
  return rtlLanguages.includes(lng) ? 'rtl' : 'ltr'
}
```

### formatDate(date, lng)

根据语言格式化日期。

```javascript
function formatDate(date, lng = i18next.language) {
  return new Intl.DateTimeFormat(lng).format(new Date(date))
}
```

### formatNumber(num, lng)

根据语言格式化数字。

```javascript
function formatNumber(num, lng = i18next.language) {
  return new Intl.NumberFormat(lng).format(num)
}
```

## TypeScript 支持

### 类型定义

```typescript
interface TranslationFunction {
  (key: string, options?: object): string
}

interface I18nInstance {
  changeLanguage(lng: string): Promise<void>
  language: string
  languages: string[]
  getResource(lng: string, ns: string, key: string): any
  addResource(lng: string, ns: string, key: string, value: string): void
  addResources(lng: string, ns: string, resources: object): void
  exists(key: string, options?: object): boolean
  getFixedT(lng?: string, ns?: string): TranslationFunction
}

interface LocaleConfig {
  debug?: boolean
  lng?: string
  fallbackLng?: string | string[]
  keySeparator?: boolean | string
  nsSeparator?: boolean | string
  moment?: string
  detection?: {
    order?: string[]
    caches?: string[]
    lookupCookie?: string
    lookupLocalStorage?: string
  }
  backend?: {
    loadPath?: string
    addPath?: string
  }
  cache?: {
    enabled?: boolean
    expirationTime?: number
    store?: Storage
  }
}
```

## 示例代码

### 完整的国际化配置

```javascript
import xadmin from 'xadmin'
import i18nPlugin from 'xadmin-i18n'

// 注册插件
xadmin.use(i18nPlugin)

// 配置国际化
xadmin.set('locale', {
  debug: process.env.NODE_ENV === 'development',
  lng: 'zh_Hans',
  fallbackLng: 'en',
  moment: 'zh_Hans',
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage']
  }
})

// 注册自定义翻译
xadmin.set('locales', {
  zh_Hans: {
    'MyApp.Title': '我的应用',
    'MyApp.Welcome': '欢迎使用{{name}}'
  },
  en: {
    'MyApp.Title': 'My Application',
    'MyApp.Welcome': 'Welcome to {{name}}'
  }
})
```

### React组件中的使用

```javascript
import React, { useState, useEffect } from 'react'
import { _t, i18next } from 'xadmin-i18n'

function WelcomePage() {
  const [userName, setUserName] = useState('Guest')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // 模拟加载消息
    setMessages([
      { id: 1, text: _t('Hello {{name}}', { name: userName }) },
      { id: 2, text: _t('You have {{count}} new messages', { count: 5 }) }
    ])
  }, [userName])

  const changeLanguage = async (lng) => {
    await i18next.changeLanguage(lng)
    // 重新加载消息
    setMessages([
      { id: 1, text: _t('Hello {{name}}', { name: userName }) },
      { id: 2, text: _t('You have {{count}} new messages', { count: 5 }) }
    ])
  }

  return (
    <div>
      <h1>{_t('MyApp.Title')}</h1>
      <p>{_t('MyApp.Welcome', { name: userName })}</p>

      <div>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder={_t('Enter your name')}
        />
      </div>

      <div>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('zh_Hans')}>中文</button>
      </div>

      <div>
        <h3>{_t('Messages')}</h3>
        {messages.map(msg => (
          <div key={msg.id}>{msg.text}</div>
        ))}
      </div>
    </div>
  )
}
```

## 变更日志

### v3.1.0
- 支持i18next v15
- 新增moment.js集成
- 改进缓存机制

### v3.0.0
- 重构插件系统
- 简化配置项
- 移除不必要的依赖

### v2.x
- 基础国际化功能
- 支持多语言切换