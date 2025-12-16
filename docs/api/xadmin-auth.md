# Xadmin Auth API 参考文档

## 概述

xadmin-auth 是 Xadmin 框架的认证解决方案，提供了完整的用户认证、权限控制、密码管理等功能。本文档详细描述了其API接口。

## 导入方式

```javascript
// 默认导入 - 获取插件
import authPlugin from 'xadmin-auth'

// 命名导入 - 获取组件和函数
import {
  IsAuthenticated,
  ShowAuthenticated,
  IsSuperUser,
  HasPermission,
  perm,
  useAuth,
  usePermission,
  SignIn,
  SignUp,
  ForgetPassword,
  ResetPassword,
  ChangePassword
} from 'xadmin-auth'
```

## 认证组件

### IsAuthenticated

认证包装器组件，保护需要登录才能访问的内容。

#### 组件Props

```typescript
interface IsAuthenticatedProps {
  children: ReactNode
  fallback?: ReactNode      // 未登录时显示的内容
  to?: string              // 重定向路径（默认: '/login'）
}
```

#### 使用示例

```javascript
// 基础使用
<IsAuthenticated>
  <ProtectedContent />
</IsAuthenticated>

// 自定义fallback
<IsAuthenticated fallback={<PleaseLogin />}>
  <ProtectedContent />
</IsAuthenticated>

// 重定向到登录页
<IsAuthenticated to="/auth/login">
  <ProtectedContent />
</IsAuthenticated>
```

### ShowAuthenticated

条件显示组件，仅在用户登录时显示内容。

#### 组件Props

```typescript
interface ShowAuthenticatedProps {
  children: ReactNode | ((user: User) => ReactNode)
}
```

#### 使用示例

```javascript
// 基础使用
<ShowAuthenticated>
  <div>欢迎回来！</div>
</ShowAuthenticated>

// 函数形式
<ShowAuthenticated>
  {(user) => <div>欢迎, {user.name}!</div>}
</ShowAuthenticated>
```

### HasPermission

权限检查组件，根据用户权限显示或隐藏内容。

#### 组件Props

```typescript
interface HasPermissionProps {
  permission: string | string[] | ((user: User) => boolean)
  children: ReactNode
  fallback?: ReactNode
}
```

#### 使用示例

```javascript
// 单个权限
<HasPermission permission="user.edit">
  <EditButton />
</HasPermission>

// 多个权限（必须全部满足）
<HasPermission permission={["user.edit", "user.delete"]}>
  <BatchActions />
</HasPermission>

// 自定义权限函数
<HasPermission permission={(user) => user.is_admin}>
  <AdminPanel />
</HasPermission>
```

### IsSuperUser

超级用户检查组件。

#### 组件Props

```typescript
interface IsSuperUserProps {
  children: ReactNode
  fallback?: ReactNode
}
```

#### 使用示例

```javascript
<IsSuperUser>
  <SuperUserFeatures />
</IsSuperUser>
```

## 表单组件

### SignIn

登录表单组件。

#### 组件Props

```typescript
interface SignInProps {
  onSuccess?: (user: User) => void
  onError?: (error: Error) => void
  redirectTo?: string
  initialValues?: object
  showRemember?: boolean
  showForgotPassword?: boolean
}
```

#### 使用示例

```javascript
<SignIn
  onSuccess={(user) => {
    console.log('登录成功:', user)
    navigate('/dashboard')
  }}
  onError={(error) => {
    message.error(error.message)
  }}
  redirectTo="/dashboard"
  showRemember={true}
  showForgotPassword={true}
/>
```

### SignUp

注册表单组件。

#### 组件Props

```typescript
interface SignUpProps {
  onSuccess?: (user: User) => void
  onError?: (error: Error) => void
  redirectTo?: string
  initialValues?: object
  requireEmailVerification?: boolean
  showTerms?: boolean
}
```

#### 使用示例

```javascript
<SignUp
  onSuccess={(user) => {
    message.success('注册成功')
    navigate('/login')
  }}
  requireEmailVerification={true}
  showTerms={true}
/>
```

### ForgetPassword

忘记密码表单组件。

#### 组件Props

```typescript
interface ForgetPasswordProps {
  onSuccess?: () => void
  onError?: (error: Error) => void
  redirectTo?: string
  sendResetLink?: (email: string) => Promise<void>
}
```

#### 使用示例

```javascript
<ForgetPassword
  onSuccess={() => {
    message.success('重置邮件已发送')
    navigate('/login')
  }}
  onError={(error) => {
    message.error('发送失败: ' + error.message)
  }}
/>
```

### ResetPassword

重置密码表单组件。

#### 组件Props

```typescript
interface ResetPasswordProps {
  token: string
  uid: string
  onSuccess?: () => void
  onError?: (error: Error) => void
  redirectTo?: string
}
```

#### 使用示例

```javascript
// 从URL获取token和uid
const token = new URLSearchParams(location.search).get('token')
const uid = new URLSearchParams(location.search).get('uid')

<ResetPassword
  token={token}
  uid={uid}
  onSuccess={() => {
    message.success('密码重置成功')
    navigate('/login')
  }}
/>
```

### ChangePassword

修改密码表单组件。

#### 组件Props

```typescript
interface ChangePasswordProps {
  onSuccess?: () => void
  onError?: (error: Error) => void
  requireOldPassword?: boolean
}
```

#### 使用示例

```javascript
<ChangePassword
  requireOldPassword={true}
  onSuccess={() => {
    message.success('密码修改成功')
  }}
/>
```

## Hooks

### useAuth

认证核心Hook，提供用户认证相关的状态和操作。

#### 返回值

```typescript
interface UseAuthReturn {
  user: User | null
  loading: boolean
  error: Error | null
  login: (credentials: LoginCredentials) => Promise<User>
  logout: () => Promise<void>
  signup: (userData: SignupData) => Promise<User>
  updateProfile: (data: Partial<User>) => Promise<User>
  refreshUser: () => Promise<User>
}
```

#### 使用示例

```javascript
function UserProfile() {
  const {
    user,
    loading,
    error,
    login,
    logout,
    updateProfile
  } = useAuth()

  const handleLogin = async (credentials) => {
    try {
      const user = await login(credentials)
      console.log('登录成功:', user)
    } catch (error) {
      console.error('登录失败:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('登出失败:', error)
    }
  }

  const handleUpdateProfile = async (data) => {
    try {
      await updateProfile(data)
      message.success('更新成功')
    } catch (error) {
      message.error('更新失败')
    }
  }

  if (loading) return <div>加载中...</div>
  if (error) return <div>错误: {error.message}</div>

  return (
    <div>
      <h1>用户资料</h1>
      {user ? (
        <div>
          <p>姓名: {user.name}</p>
          <p>邮箱: {user.email}</p>
          <button onClick={() => handleUpdateProfile({ name: 'New Name' })}>
            更新资料
          </button>
          <button onClick={handleLogout}>登出</button>
        </div>
      ) : (
        <p>未登录</p>
      )}
    </div>
  )
}
```

### usePermission

权限检查Hook。

#### 返回值

```typescript
type PermissionChecker = (
  permission: string | string[] | ((user: User) => boolean)
) => boolean
```

#### 使用示例

```javascript
function AdminActions() {
  const hasPermission = usePermission()

  return (
    <div>
      {hasPermission('user.create') && (
        <Button>创建用户</Button>
      )}
      {hasPermission(['user.edit', 'user.delete']) && (
        <Button>批量操作</Button>
      )}
      {hasPermission((user) => user.is_super_user) && (
        <Button>系统设置</Button>
      )}
    </div>
  )
}
```

## 数据模型

### User 用户模型

```typescript
interface User {
  id: number | string
  username: string
  email: string
  name?: string
  avatar?: string
  is_active: boolean
  is_super_user: boolean
  permissions?: string[]
  created_at: string
  updated_at: string
  last_login?: string
}
```

### LoginCredentials 登录凭证

```typescript
interface LoginCredentials {
  username: string
  password: string
  remember?: boolean
  captcha?: string
}
```

### SignupData 注册数据

```typescript
interface SignupData {
  username: string
  email: string
  password1: string
  password2: string
  captcha?: string
  agree_terms?: boolean
}
```

### PasswordChangeData 密码修改数据

```typescript
interface PasswordChangeData {
  old_password?: string
  new_password1: string
  new_password2: string
}
```

### PasswordResetData 密码重置数据

```typescript
interface PasswordResetData {
  email: string
}

interface PasswordResetConfirmData {
  token: string
  uid: string
  new_password1: string
  new_password2: string
}
```

## 配置选项

### auth 配置对象

```javascript
app.set('auth', {
  // 功能开关
  can_signup: true,              // 允许注册
  can_signin: true,              // 允许登录
  can_reset_password: true,      // 允许重置密码
  can_change_password: true,     // 允许修改密码

  // 用户信息持久化
  persist_type: 'localforage',   // 'localforage' | 'session-storage' | 'cookie'
  userinfo_timeout: 30,          // cookie过期时间（天）

  // API配置
  api_base: '/api/auth',         // 认证API基础路径
  token_header: 'Authorization', // token请求头
  token_prefix: 'Bearer',        // token前缀

  // 路由配置
  login_path: '/login',
  logout_path: '/logout',
  signup_path: '/signup',
  profile_path: '/profile',

  // 自动跳转
  login_redirect: '/dashboard',
  logout_redirect: '/login',

  // Token配置
  token_timeout: 3600,          // token过期时间（秒）
  refresh_token_timeout: 86400, // 刷新token过期时间（秒）

  // 安全配置
  require_captcha: false,       // 是否需要验证码
  max_login_attempts: 5,        // 最大登录尝试次数
  lockout_duration: 300,        // 账户锁定时间（秒）
})
```

## 认证钩子

### auth.user

获取当前用户信息。

```javascript
// 注册钩子
app.add('hooks.auth.user', async (app) => {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const user = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => res.json())
      return user
    } catch (error) {
      localStorage.removeItem('token')
    }
  }
  return null
})
```

### auth.login

用户登录钩子。

```javascript
app.add('hooks.auth.login', async (app, { username, password }) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })

  if (!response.ok) {
    throw new Error('登录失败')
  }

  const data = await response.json()

  // 保存token和用户信息
  localStorage.setItem('token', data.token)
  await saveUserInfo(data.user)

  return data.user
})
```

### auth.logout

用户登出钩子。

```javascript
app.add('hooks.auth.logout', async (app) => {
  // 调用后端登出接口
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
  } finally {
    // 清除本地数据
    localStorage.removeItem('token')
    await clearUserInfo()
  }
})
```

### auth.signup

用户注册钩子。

```javascript
app.add('hooks.auth.signup', async (app, userData) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || '注册失败')
  }

  return response.json()
})
```

### auth.permission

权限检查钩子。

```javascript
app.add('hooks.auth.permission', (app, permission, user) => {
  if (!user) return false

  // 超级用户拥有所有权限
  if (user.is_super_user) return true

  // 字符串权限
  if (typeof permission === 'string') {
    return user.permissions?.includes(permission)
  }

  // 数组权限（必须全部满足）
  if (Array.isArray(permission)) {
    return permission.every(p => user.permissions?.includes(p))
  }

  // 函数权限
  if (typeof permission === 'function') {
    return permission(user)
  }

  return false
})
```

## 路由配置

### 自动注册的路由

xadmin-auth 会自动注册以下路由：

```javascript
{
  '/login': {
    path: '/login',
    element: <SignIn />
  },
  '/signup': {
    path: '/signup',
    element: <SignUp />
  },
  '/forget_password': {
    path: '/forget_password',
    element: <ForgetPassword />
  },
  '/password_reset_confirm': {
    path: '/password_reset_confirm',
    element: <ResetPassword />
  },
  '/app/change_password': {
    path: '/app/change_password',
    element: <ChangePassword />
  }
}
```

### 自定义路由

```javascript
// 覆盖默认路由
app.set('routers', {
  '/auth/login': {
    path: '/auth/login',
    element: <CustomLoginPage />
  }
})

// 添加认证相关路由
app.add('routers', {
  '/auth/profile': {
    path: '/auth/profile',
    element: <ProfilePage />
  }
})
```

## 工具函数

### perm() 函数

权限检查工具函数，在组件外部使用。

```typescript
function perm(
  permission: string | string[] | ((user: User) => boolean),
  user?: User
): boolean
```

#### 使用示例

```javascript
// 在条件语句中使用
if (perm('user.edit')) {
  // 显示编辑功能
}

// 检查多个权限
if (perm(['user.edit', 'user.delete'])) {
  // 显示批量操作
}

// 使用自定义权限函数
if (perm(user => user.department === 'admin')) {
  // 显示管理员功能
}

// 传入特定用户
if (perm('user.edit', specificUser)) {
  // 检查特定用户的权限
}
```

### saveUserInfo()

保存用户信息到持久化存储。

```javascript
import { saveUserInfo } from 'xadmin-auth'

await saveUserInfo(user)
```

### clearUserInfo()

清除用户信息。

```javascript
import { clearUserInfo } from 'xadmin-auth'

await clearUserInfo()
```

### getToken()

获取认证token。

```javascript
import { getToken } from 'xadmin-auth'

const token = getToken()
```

### setToken()

设置认证token。

```javascript
import { setToken } from 'xadmin-auth'

setToken('your-jwt-token')
```

## 错误处理

### 错误类型

```typescript
class AuthError extends Error {
  code: string
  details?: any

  constructor(message: string, code: string, details?: any) {
    super(message)
    this.name = 'AuthError'
    this.code = code
    this.details = details
  }
}
```

### 常见错误码

- `INVALID_CREDENTIALS`: 无效的登录凭证
- `USER_NOT_FOUND`: 用户不存在
- `ACCOUNT_LOCKED`: 账户被锁定
- `TOKEN_EXPIRED`: Token已过期
- `PERMISSION_DENIED`: 权限不足
- `VALIDATION_ERROR`: 数据验证失败

## 最佳实践

### 1. 保护路由

```javascript
// 路由级别的认证保护
function ProtectedRoute({ children, permission }) {
  return (
    <IsAuthenticated>
      {permission ? (
        <HasPermission permission={permission}>
          {children}
        </HasPermission>
      ) : (
        children
      )}
    </IsAuthenticated>
  )
}

// 使用
<Route path="/admin/*" element={
  <ProtectedRoute permission="admin.access">
    <AdminRoutes />
  </ProtectedRoute>
} />
```

### 2. API请求拦截

```javascript
// 为所有API请求添加认证头
const apiInstance = axios.create()

apiInstance.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token过期，尝试刷新或登出
      await clearUserInfo()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

### 3. 权限管理

```javascript
// 权限常量
export const PERMISSIONS = {
  USER_VIEW: 'user.view',
  USER_CREATE: 'user.create',
  USER_EDIT: 'user.edit',
  USER_DELETE: 'user.delete',
  ADMIN_ACCESS: 'admin.access'
}

// 权限检查组件
function PermissionGuard({ permission, children, fallback = null }) {
  return (
    <HasPermission permission={permission} fallback={fallback}>
      {children}
    </HasPermission>
  )
}
```

## TypeScript 支持

### 类型定义

```typescript
interface AuthConfig {
  can_signup?: boolean
  can_signin?: boolean
  can_reset_password?: boolean
  can_change_password?: boolean
  persist_type?: 'localforage' | 'session-storage' | 'cookie'
  userinfo_timeout?: number
  api_base?: string
  token_header?: string
  token_prefix?: string
  login_path?: string
  logout_path?: string
  signup_path?: string
  profile_path?: string
  login_redirect?: string
  logout_redirect?: string
  token_timeout?: number
  refresh_token_timeout?: number
  require_captcha?: boolean
  max_login_attempts?: number
  lockout_duration?: number
}

interface AuthPlugin {
  name: 'xadmin.auth'
  config: { auth: AuthConfig }
  components: Record<string, Component>
  blocks: Record<string, Component>
  routers: Record<string, RouteConfig>
  models: Record<string, ModelDefinition>
  hooks: Record<string, Function>
}
```

## 示例代码

### 完整的认证配置

```javascript
import xadmin from 'xadmin'
import authPlugin from 'xadmin-auth'

// 注册认证插件
xadmin.use(authPlugin)

// 配置认证
xadmin.set('auth', {
  can_signup: true,
  can_reset_password: true,
  persist_type: 'localforage',
  api_base: '/api/v1/auth',
  login_redirect: '/dashboard',
  token_timeout: 7200,  // 2小时
  max_login_attempts: 3
})

// 自定义权限检查
xadmin.add('hooks.auth.permission', (app, permission, user) => {
  // 检查部门权限
  if (permission.startsWith('dept.')) {
    const deptPermission = permission.replace('dept.', '')
    return user.departments?.some(dept =>
      dept.permissions.includes(deptPermission)
    )
  }
})
```

### 自定义认证组件

```javascript
import { useAuth } from 'xadmin-auth'

function CustomLoginButton() {
  const { login, loading } = useAuth()

  const handleLogin = async () => {
    // 使用OAuth或其他认证方式
    try {
      const user = await login({
        provider: 'oauth',
        token: getOAuthToken()
      })
      console.log('登录成功:', user)
    } catch (error) {
      console.error('登录失败:', error)
    }
  }

  return (
    <button onClick={handleLogin} disabled={loading}>
      {loading ? '登录中...' : '使用OAuth登录'}
    </button>
  )
}
```

## 变更日志

### v3.3.4
- 新增权限组件
- 支持自定义认证钩子
- 改进密码管理功能

### v3.3.0
- 重构认证系统
- 支持多种持久化方式
- 新增批量操作权限控制

### v3.0.0
- 基于React Hooks重构
- 支持Jotai状态管理
- 简化API接口

### v2.x
- 基础认证功能
- Redux集成