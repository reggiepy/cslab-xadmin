import React from 'react'
import { config as _c, Block, app } from 'xadmin'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1
  const click = (to) => () => app.go(to)
  return last ? 
    <span>{route.breadcrumbName}</span> : 
    <a onClick={click('/' + paths.join(''))} className="text-blue-600 hover:underline">{route.breadcrumbName}</a>
}

class MenuBar extends React.Component {
  render() {
    return (
      <Block name="main.menu">
        {items => (
          <nav className={`bg-slate-800 text-white ${this.props.mode === 'inline' ? 'space-y-2' : ''}`}>
            {items}
          </nav>
        )}
      </Block>
    )
  }
}

function App(props) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mode, setMode] = React.useState('inline');

  const toggle = () => {
    setCollapsed(!collapsed);
    setMode(!collapsed ? 'vertical' : 'inline');
  };

  const { routes, params, children } = props;
  const Icon = collapsed ? MenuFoldOutlined : MenuUnfoldOutlined;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed h-screen overflow-auto bg-slate-800 transition-all duration-200 ${
          collapsed ? 'w-20' : 'w-56'
        }`}
      >
        <div className="p-4 text-white flex items-center justify-center">
          <div className="mr-2">{_c('site.logo')}</div>
          {!collapsed && <div className="font-bold">{_c('site.title', 'Admin')}</div>}
        </div>
        <MenuBar mode={mode} />
      </aside>

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-200 ${
          collapsed ? 'ml-20' : 'ml-56'
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-md z-10 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={toggle}
              className="mr-4 text-xl hover:text-blue-600"
            >
              <Icon />
            </button>
          </div>

          <div>
            <Block name="top.right">
              {items => <div className="flex items-center space-x-4">{items}</div>}
            </Block>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="p-4 text-center text-gray-600 border-t">
          &copy; <slot>{_c('site.copyright')}</slot>
        </footer>
      </div>
    </div>
  );
}

export default App
