# Xadmin 文档中心

## 概述

Xadmin 是一个基于 React 的企业级管理后台框架，采用插件化架构设计，提供完整的前端解决方案。

## 模块包文档

### 核心包

- [xadmin](./packages/xadmin.md) - 核心库，提供应用框架和基础功能
- [xadmin-i18n](./packages/xadmin-i18n.md) - 国际化解决方案
- [xadmin-auth](./packages/xadmin-auth.md) - 用户认证和权限管理
- [xadmin-form](./packages/xadmin-form.md) - 表单处理组件
- [xadmin-ui](./packages/xadmin-ui.md) - 基础UI组件库
- [xadmin-model](./packages/xadmin-model.md) - 数据模型管理

### API参考文档

- [xadmin API](./api/xadmin.md) - 核心库API文档
- [xadmin-i18n API](./api/xadmin-i18n.md) - 国际化API文档
- [xadmin-auth API](./api/xadmin-auth.md) - 认证API文档
- [xadmin-form API](./api/xadmin-form.md) - 表单API文档
- [xadmin-ui API](./api/xadmin-ui.md) - UI组件API文档
- [xadmin-model API](./api/xadmin-model.md) - 模型管理API文档

## 快速开始

### 安装

```bash
npm install xadmin xadmin-ui xadmin-auth xadmin-form xadmin-i18n xadmin-model
# 或
yarn add xadmin xadmin-ui xadmin-auth xadmin-form xadmin-i18n xadmin-model
```

### 基础使用

```javascript
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import xadmin from 'xadmin'
import uiPlugin from 'xadmin-ui'
import authPlugin from 'xadmin-auth'
import formPlugin from 'xadmin-form'
import i18nPlugin from 'xadmin-i18n'
import modelPlugin from 'xadmin-model'

// 注册插件
xadmin
  .use(uiPlugin)
  .use(authPlugin)
  .use(formPlugin)
  .use(i18nPlugin)
  .use(modelPlugin)

// 启动应用
xadmin.start().then(() => {
  const App = () => (
    <BrowserRouter>
      {/* 路由配置会自动处理 */}
    </BrowserRouter>
  )

  createRoot(document.getElementById('root')).render(<App />)
})
```

## 架构特点

### 插件化设计

Xadmin 采用插件化架构，每个功能模块都是独立的插件：

- **模块化**: 每个插件专注于特定功能
- **可扩展**: 轻松添加自定义功能
- **可配置**: 灵活的配置系统
- **按需加载**: 只加载需要的功能

### 现代技术栈

- **React 16.8+**: 使用现代 React 和 Hooks
- **Jotai**: 现代化状态管理
- **React Router 6**: 路由管理
- **TypeScript**: 完整的类型支持

### 企业级功能

- **认证授权**: 完整的用户认证和权限管理
- **国际化**: 多语言支持
- **表单处理**: 强大的表单生成和验证
- **数据模型**: 灵活的数据模型管理
- **UI组件**: 丰富的企业级UI组件

## 开发指南

### 项目结构

```
your-app/
├── src/
│   ├── components/     # 自定义组件
│   ├── models/         # 数据模型定义
│   ├── pages/          # 页面组件
│   ├── hooks/          # 自定义Hooks
│   └── utils/          # 工具函数
├── public/
└── package.json
```

### 定义数据模型

```javascript
// src/models/user.js
export const userModel = {
  name: 'user',
  title: '用户',
  api: '/api/users',

  properties: {
    id: { type: 'integer', title: 'ID' },
    username: { type: 'string', title: '用户名', required: true },
    email: { type: 'string', title: '邮箱', format: 'email', required: true },
    active: { type: 'boolean', title: '激活状态', default: true }
  },

  listFields: ['id', 'username', 'email', 'active'],
  formFields: ['username', 'email', 'active'],

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

### 创建页面

```javascript
// src/pages/UserManagement.js
import { Model } from 'xadmin-model'

export default function UserManagement() {
  return (
    <Model name="user">
      <Model.Page title="用户管理">
        <Model.Search />
        <Model.Table />
        <Model.Pagination />
      </Model.Page>
    </Model>
  )
}
```

### 自定义组件

```javascript
// src/components/CustomWidget.js
import { C } from 'xadmin-ui'

export default function CustomWidget({ name, value, onChange }) {
  return (
    <div className="custom-widget">
      <label>{name}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

// 注册组件
xadmin.set('components.CustomWidget', CustomWidget)

// 使用
<C is="CustomWidget" name="自定义组件" value={value} onChange={handleChange} />
```

## 最佳实践

### 1. 模块化开发

将功能按模块划分，每个模块包含：

- 模型定义
- 页面组件
- 自定义组件
- 路由配置

### 2. 权限控制

使用内置的权限系统控制功能访问：

```javascript
<HasPermission permission="user.edit">
  <EditButton />
</HasPermission>
```

### 3. 国际化

使用国际化系统支持多语言：

```javascript
const title = _t('User Management')
const message = _t('Add {{count}} users', { count: 5 })
```

### 4. 错误处理

使用统一的错误处理机制：

```javascript
try {
  await saveItem(data)
  message.success('保存成功')
} catch (error) {
  message.error('保存失败')
  app.error('保存失败', error)
}
```

### 5. 性能优化

- 使用懒加载减少初始包大小
- 使用 React.memo 优化组件渲染
- 合理使用缓存策略

## 主题定制

### CSS变量

通过修改CSS变量自定义主题：

```css
:root {
  --primary-color: #1890ff;
  --success-color: #52c41a;
  --warning-color: #faad14;
  --error-color: #f5222d;
  --font-size: 14px;
  --border-radius: 6px;
}
```

### 组件覆盖

覆盖默认组件样式：

```javascript
// 覆盖Button组件
xadmin.set('components.Button', ({ children, type, ...props }) => (
  <button className={`custom-btn custom-btn-${type}`} {...props}>
    {children}
  </button>
))
```

## 部署指南

### 构建配置

```javascript
// vite.config.js
export default {
  build: {
    target: 'es2015',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          xadmin: ['xadmin', 'xadmin-ui', 'xadmin-model']
        }
      }
    }
  }
}
```

### 环境配置

```javascript
// 生产环境配置
if (process.env.NODE_ENV === 'production') {
  xadmin.set('api.base', 'https://api.example.com')
  xadmin.set('locale.debug', false)
}
```

## 常见问题

### Q: 如何添加新的字段类型？

A: 通过注册字段渲染器：

```javascript
xadmin.add('fieldRenders', (schema) => {
  if (schema.type === 'custom') {
    return CustomFieldRenderer
  }
})
```

### Q: 如何自定义API请求？

A: 通过注册API钩子：

```javascript
xadmin.add('hooks.api.request', (app, config) => {
  config.headers['Authorization'] = `Bearer ${getToken()}`
  return config
})
```

### Q: 如何处理大列表性能？

A: 使用虚拟滚动和分页：

```javascript
<Table
  dataSource={items}
  pagination={{ pageSize: 20 }}
  scroll={{ y: 400 }}
/>
```

## 社区支持

- [GitHub Issues](https://github.com/xadmin/xadmin/issues) - 报告问题和建议
- [GitHub Discussions](https://github.com/xadmin/xadmin/discussions) - 社区讨论
- [Wiki](https://github.com/xadmin/xadmin/wiki) - 更多教程和示例

## 版本历史

查看各模块的变更日志：

- [xadmin 变更日志](./packages/xadmin.md#变更日志)
- [xadmin-i18n 变更日志](./packages/xadmin-i18n.md#变更日志)
- [xadmin-auth 变更日志](./packages/xadmin-auth.md#变更日志)
- [xadmin-form 变更日志](./packages/xadmin-form.md#变更日志)
- [xadmin-ui 变更日志](./packages/xadmin-ui.md#变更日志)
- [xadmin-model 变更日志](./packages/xadmin-model.md#变更日志)

## 许可证

MIT License - 详见 [LICENSE](../LICENSE) 文件