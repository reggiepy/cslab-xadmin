# Xadmin I18n 国际化包使用指南

## 概述

xadmin-i18n 是 Xadmin 框架的国际化解决方案，基于 i18next 构建，提供了完整的多语言支持功能。

## 安装

```bash
npm install xadmin-i18n
# 或
yarn add xadmin-i18n
```

## 基础使用

### 1. 集成到 Xadmin

```javascript
import xadmin from 'xadmin'
import i18nPlugin from 'xadmin-i18n'

// 注册插件
xadmin.use(i18nPlugin)
```

### 2. 使用翻译函数

```javascript
import { _t, i18next } from 'xadmin-i18n'

// 基础翻译
console.log(_t('Login')) // 输出：登录

// 带插值的翻译
console.log(_t('Add {{object}}', { object: '用户' })) // 输出：添加用户

// 复数形式
console.log(_t('Delete {{count}} item', { count: 2 }))
// 输出：删除 2 项
```

## 配置

### 基础配置

```javascript
xadmin.set('locale', {
  debug: false,                    // 调试模式
  lng: 'en',                       // 默认语言
  fallbackLng: false,             // 无回退语言
  keySeparator: false,            // 无键分隔符
  nsSeparator: false,             // 无命名空间分隔符
  moment: 'en',                   // moment.js 语言环境

  // 自定义检测选项
  detection: {
    order: ['cookie', 'localStorage', 'navigator'],
    caches: ['localStorage', 'cookie']
  }
})
```

### 添加语言包

```javascript
// 注册语言包
xadmin.set('locales.en', {
  'Welcome': 'Welcome',
  'Login': 'Login',
  'Add {{object}}': 'Add {{object}}'
})

xadmin.set('locales.zh_Hans', {
  'Welcome': '欢迎',
  'Login': '登录',
  'Add {{object}}': '添加{{object}}'
})

// 或者使用嵌套对象
xadmin.set('locales', {
  en: {
    'Welcome': 'Welcome',
    'Login': 'Login'
  },
  zh_Hans: {
    'Welcome': '欢迎',
    'Login': '登录'
  }
})
```

## 内置翻译

xadmin-i18n 提供了中文（简体）的内置翻译，包含以下类别：

### 基础操作
- 操作 (Action)
- 添加 (Add)
- 编辑 (Edit)
- 删除 (Delete)
- 保存 (Save)
- 搜索 (Search)
- 重置 (Reset)
- 取消 (Cancel)
- 确定 (OK)
- 返回 (Back)

### 用户相关
- 登录 (Login)
- 注册 (Sign Up)
- 登出 (Logout)
- 用户名 (Username)
- 密码 (Password)
- 邮箱 (Email)
- 验证码 (Captcha)

### 表单相关
- 必填项 (Required)
- 确认密码 (Confirm Password)
- 忘记密码 (Forgot Password)
- 修改密码 (Change Password)

### 系统消息
- 成功 (Success)
- 失败 (Failed)
- 警告 (Warning)
- 提示 (Info)
- 错误 (Error)

## 高级功能

### 动态语言切换

```javascript
import { i18next } from 'xadmin-i18n'

// 切换语言
const changeLanguage = (lng) => {
  i18next.changeLanguage(lng)
    .then(() => {
      console.log(`语言已切换到 ${lng}`)
    })
    .catch(err => {
      console.error('语言切换失败:', err)
    })
}

// 使用
changeLanguage('zh_Hans')
```

### 获取当前语言

```javascript
import { i18next } from 'xadmin-i18n'

const currentLanguage = i18next.language
console.log('当前语言:', currentLanguage)
```

### 格式化日期和时间

```javascript
import moment from 'moment'

// 使用当前语言环境格式化
const now = moment()
console.log(now.format('LLL')) // 根据当前语言显示
```

### 在 React 组件中使用

```javascript
import React from 'react'
import { _t } from 'xadmin-i18n'

function MyComponent() {
  const message = _t('Welcome to {{appName}}', { appName: 'Xadmin' })

  return (
    <div>
      <h1>{message}</h1>
      <button>{_t('Save')}</button>
    </div>
  )
}
```

### 在 Hooks 中使用

```javascript
import { useModel } from 'xadmin-model'
import { _t } from 'xadmin-i18n'

function UserList() {
  const { items } = useModel('user')

  return (
    <div>
      <h2>{_t('User List')}</h2>
      <table>
        <thead>
          <tr>
            <th>{_t('Name')}</th>
            <th>{_t('Email')}</th>
            <th>{_t('Actions')}</th>
          </tr>
        </thead>
        <tbody>
          {items.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button>{_t('Edit')}</button>
                <button>{_t('Delete')}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

## 自定义翻译

### 翻译文件组织

建议将翻译文件组织如下：

```
src/
  locales/
    en/
      common.json
      auth.json
      model.json
    zh_Hans/
      common.json
      auth.json
      model.json
```

### 异步加载翻译

```javascript
// 动态加载翻译文件
const loadTranslations = async (lng) => {
  const translations = await import(`./locales/${lng}/common.json`)
  xadmin.set(`locales.${lng}`, translations.default)
}

// 在应用启动时加载
loadTranslations('zh_Hans')
```

### 命名空间支持

虽然默认配置禁用了命名空间分隔符，但你仍然可以使用：

```javascript
// 扁平化键名
'auth.login': '登录'
'auth.register': '注册'

// 使用
_t('auth.login')
```

## 最佳实践

### 1. 翻译键命名

```javascript
// 好的命名
'user.create.success': '用户创建成功'
'user.delete.confirm': '确认删除此用户？'

// 避免过于简单
'success': '成功'
'confirm': '确认'
```

### 2. 插值使用

```javascript
// 提供上下文
_t('Delete {{name}}?', { name: userName })

// 而不是
_t('Delete') + ' ' + userName + '?'
```

### 3. 复数处理

```javascript
// 配置复数规则
xadmin.set('locales.en', {
  'item': '{{count}} item',
  'item_plural': '{{count}} items'
})

// 使用
_t('item', { count: 1 })  // 1 item
_t('item', { count: 5 })  // 5 items
```

### 4. 语言检测优先级

```javascript
xadmin.set('locale', {
  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage']
  }
})
```

## API 参考

### _t(key, options)

翻译函数

**参数:**
- `key` (string): 翻译键
- `options` (object): 插值选项

**返回:** string

**示例:**
```javascript
_t('Welcome')                    // Welcome
_t('Hello {{name}}', { name: 'John' })  // Hello John
```

### i18next

i18next 实例，提供完整的 i18next API

**主要方法:**
- `changeLanguage(lng)`: 切换语言
- `getFixedT(lng, ns)`: 获取特定语言的翻译函数
- `exists(key, options)`: 检查翻译是否存在
- `getResource(lng, ns, key)`: 获取翻译资源

## 技术栈

- i18next (^15.0.6)
- i18next-browser-languagedetector (^3.0.1)
- i18next-localstorage-cache (^1.1.1)
- i18next-http-backend (^3.0.0)
- moment (2)

## 版本信息

当前版本: 3.1.0

## 更多资源

- [i18next 官方文档](https://www.i18next.com/)
- [i18next API 参考](https://www.i18next.com/overview/api)
- [Xadmin 其他包文档](./)