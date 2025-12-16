# Xadmin Auth 认证包使用指南

## 概述

xadmin-auth 是 Xadmin 框架的认证解决方案，提供了完整的用户认证功能，包括登录、注册、密码管理、权限控制等。

## 安装

```bash
npm install xadmin-auth
# 或
yarn add xadmin-auth
```

## 基础使用

### 1. 集成到 Xadmin

```javascript
import xadmin from 'xadmin'
import authPlugin from 'xadmin-auth'

// 注册认证插件
xadmin.use(authPlugin)
```

### 2. 基础配置

```javascript
xadmin.set('auth', {
  can_signup: true,            // 允许注册
  can_signin: true,            // 允许登录
  can_reset_password: true,    // 允许重置密码
  can_change_password: true,   // 允许修改密码

  // 用户信息持久化方式
  persist_type: 'localforage', // 'localforage' | 'session-storage' | 'cookie'
  userinfo_timeout: 30,        // cookie过期时间（天）
})
```

## 认证组件

### IsAuthenticated - 认证包装器

保护需要登录才能访问的组件：

```javascript
import { IsAuthenticated } from 'xadmin-auth'

function ProtectedPage() {
  return (
    <IsAuthenticated>
      <div>
        <h1>需要登录才能查看的内容</h1>
      </div>
    </IsAuthenticated>
  )
}
```

### ShowAuthenticated - 条件显示

仅当用户登录时显示内容：

```javascript
import { ShowAuthenticated } from 'xadmin-auth'

function UserGreeting() {
  return (
    <ShowAuthenticated>
      {user => (
        <div>
          欢迎, {user.name}!
        </div>
      )}
    </ShowAuthenticated>
  )
}
```

### HasPermission - 权限检查

检查用户是否具有特定权限：

```javascript
import { HasPermission } from 'xadmin-auth'

function AdminPanel() {
  return (
    <HasPermission permission="admin.access">
      <button>删除所有数据</button>
    </HasPermission>
  )
}

// 多权限检查
function MultiplePermissions() {
  return (
    <HasPermission permission={["user.edit", "user.delete"]}>
      <button>批量操作</button>
    </HasPermission>
  )
}

// 自定义权限函数
function CustomPermission() {
  return (
    <HasPermission permission={user => user.is_admin}>
      <button>管理员功能</button>
    </HasPermission>
  )
}
```

### IsSuperUser - 超级用户检查

```javascript
import { IsSuperUser } from 'xadmin-auth'

function SuperUserFeature() {
  return (
    <IsSuperUser>
      <div>
        只有超级用户才能看到的功能
      </div>
    </IsSuperUser>
  )
}
```

## 认证表单组件

### SignIn - 登录组件

```javascript
import { SignIn } from 'xadmin-auth'

function LoginPage() {
  return (
    <div>
      <h2>用户登录</h2>
      <SignIn
        onSuccess={() => console.log('登录成功')}
        onError={(error) => console.error('登录失败', error)}
      />
    </div>
  )
}
```

### SignUp - 注册组件

```javascript
import { SignUp } from 'xadmin-auth'

function RegisterPage() {
  return (
    <div>
      <h2>用户注册</h2>
      <SignUp
        onSuccess={() => console.log('注册成功')}
        onError={(error) => console.error('注册失败', error)}
      />
    </div>
  )
}
```

### ForgetPassword - 忘记密码

```javascript
import { ForgetPassword } from 'xadmin-auth'

function ForgetPasswordPage() {
  return (
    <div>
      <h2>找回密码</h2>
      <ForgetPassword
        onSuccess={() => console.log('邮件已发送')}
        onError={(error) => console.error('发送失败', error)}
      />
    </div>
  )
}
```

### ResetPassword - 重置密码

```javascript
import { ResetPassword } from 'xadmin-auth'

function ResetPasswordPage() {
  // 从URL获取token和uid
  const token = new URLSearchParams(location.search).get('token')
  const uid = new URLSearchParams(location.search).get('uid')

  return (
    <div>
      <h2>重置密码</h2>
      <ResetPassword
        token={token}
        uid={uid}
        onSuccess={() => console.log('密码重置成功')}
        onError={(error) => console.error('重置失败', error)}
      />
    </div>
  )
}
```

### ChangePassword - 修改密码

```javascript
import { ChangePassword } from 'xadmin-auth'

function ChangePasswordPage() {
  return (
    <div>
      <h2>修改密码</h2>
      <ChangePassword
        onSuccess={() => console.log('密码修改成功')}
        onError={(error) => console.error('修改失败', error)}
      />
    </div>
  )
}
```

## Hooks 使用

### useAuth - 认证Hook

```javascript
import { useAuth } from 'xadmin-auth'

function UserProfile() {
  const { user, login, logout, loading } = useAuth()

  const handleLogin = async (credentials) => {
    try {
      await login(credentials)
      console.log('登录成功')
    } catch (error) {
      console.error('登录失败', error)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      console.log('已登出')
    } catch (error) {
      console.error('登出失败', error)
    }
  }

  if (loading) {
    return <div>加载中...</div>
  }

  return (
    <div>
      {user ? (
        <div>
          <p>当前用户: {user.name}</p>
          <button onClick={handleLogout}>登出</button>
        </div>
      ) : (
        <button onClick={() => handleLogin({ username: 'admin', password: 'password' })}>
          登录
        </button>
      )}
    </div>
  )
}
```

### usePermission - 权限Hook

```javascript
import { usePermission } from 'xadmin-auth'

function AdminActions() {
  const hasPermission = usePermission()

  return (
    <div>
      {hasPermission('user.create') && (
        <button>创建用户</button>
      )}
      {hasPermission('user.delete') && (
        <button>删除用户</button>
      )}
      {hasPermission(['user.edit', 'user.view']) && (
        <button>批量操作</button>
      )}
    </div>
  )
}
```

## 自定义认证逻辑

### 自定义登录API

```javascript
import xadmin from 'xadmin'

// 自定义登录Hook
xadmin.add('hooks.auth.login', async (app, { username, password }) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })

  if (!response.ok) {
    throw new Error('登录失败')
  }

  const user = await response.json()
  return user
})
```

### 自定义权限检查

```javascript
import xadmin from 'xadmin'

// 注册权限检查函数
xadmin.add('hooks.auth.permission', (app, permission, user) => {
  // 自定义权限逻辑
  if (permission === 'custom.feature') {
    return user.custom_field === 'allowed'
  }

  // 返回undefined表示使用默认权限检查
  return undefined
})
```

## 用户菜单

xadmin-auth 会自动在页面右上角添加用户菜单，包括：

- 用户信息显示
- 修改密码链接
- 登出功能

### 自定义用户菜单

```javascript
import xadmin from 'xadmin'

// 替换默认用户菜单
xadmin.set('blocks', {
  'top.right': () => (
    <div>
      {/* 自定义用户菜单 */}
    </div>
  )
})
```

## 路由配置

认证插件会自动注册以下路由：

- `/login` - 登录页面
- `/signup` - 注册页面
- `/forget_password` - 忘记密码页面
- `/password_reset_confirm` - 重置密码确认页面
- `/app/change_password` - 修改密码页面

### 自定义路由

```javascript
import xadmin from 'xadmin'

// 自定义登录页面组件
xadmin.set('routers', {
  '/login': {
    element: <CustomLoginPage />
  }
})
```

## 数据持久化

### LocalForage (默认)

```javascript
xadmin.set('auth', {
  persist_type: 'localforage'
})
```

特点：
- 异步存储
- 支持多种存储后端（IndexedDB、WebSQL、localStorage）
- 存储容量大

### Session Storage

```javascript
xadmin.set('auth', {
  persist_type: 'session-storage'
})
```

特点：
- 同步存储
- 会话级别（关闭浏览器后清除）
- 存储容量较小（约5MB）

### Cookie

```javascript
xadmin.set('auth', {
  persist_type: 'cookie',
  userinfo_timeout: 7  // 7天过期
})
```

特点：
- 自动在HTTP请求中携带
- 可设置过期时间
- 存储容量最小（约4KB）

## 安全注意事项

### 1. 密码安全

确保密码使用HTTPS传输：
```javascript
// API配置中强制使用HTTPS
xadmin.set('auth', {
  api_base: 'https://your-api.com'
})
```

### 2. Token 安全

```javascript
// 设置token过期时间
xadmin.set('auth', {
  token_timeout: 3600,  // 1小时
  refresh_token_timeout: 86400  // 24小时
})
```

### 3. CSRF 保护

```javascript
// 启用CSRF保护
xadmin.set('auth', {
  csrf_protection: true
})
```

## 最佳实践

### 1. 路由保护

```javascript
import { IsAuthenticated } from 'xadmin-auth'
import { Navigate } from 'react-router-dom'

// 受保护的路由
const ProtectedRoute = ({ children }) => (
  <IsAuthenticated>
    {children || <Navigate to="/login" replace />}
  </IsAuthenticated>
)
```

### 2. 权限管理

```javascript
// 在组件中检查权限
function UserList() {
  const { user } = useAuth()

  if (!user?.permissions.includes('user.view')) {
    return <div>无权限访问</div>
  }

  return (
    <div>
      {/* 用户列表内容 */}
    </div>
  )
}
```

### 3. 错误处理

```javascript
function LoginForm() {
  const { login, error } = useAuth()

  const handleSubmit = async (values) => {
    try {
      await login(values)
    } catch (err) {
      // 错误已经在 useAuth 中处理
      console.error('登录失败:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {/* 表单字段 */}
    </form>
  )
}
```

## API 参考

### 组件Props

#### IsAuthenticated
- `children`: ReactNode - 要保护的内容
- `fallback?: ReactNode` - 未登录时显示的内容
- `to?: string` - 重定向路径（默认: /login）

#### HasPermission
- `permission`: string | string[] | Function - 权限要求
- `children`: ReactNode | Function - 要显示的内容
- `fallback?: ReactNode` - 无权限时显示的内容

#### SignIn, SignUp, ForgetPassword, ResetPassword, ChangePassword
- `onSuccess?: Function` - 成功回调
- `onError?: Function` - 错误回调
- `redirect?: string` - 成功后重定向路径

### Hooks

#### useAuth()
返回: `{ user, login, logout, loading, error }`

#### usePermission()
返回: `(permission) => boolean`

## 技术栈

- js-cookie (^2.2.0)
- localforage (^1.7.3)
- React Router 6
- Xadmin Form
- Xadmin Model
- Xadmin I18n

## 版本信息

当前版本: 3.3.4

## 更多资源

- [React Router 文档](https://reactrouter.com/)
- [LocalForage 文档](https://localforage.github.io/localForage/)
- [js-cookie 文档](https://github.com/js-cookie/js-cookie)
- [Xadmin 其他包文档](./)