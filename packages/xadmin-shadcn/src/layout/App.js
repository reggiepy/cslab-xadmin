import React from 'react'
import { config as _c, Block, app } from 'xadmin'

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// import { Layout, Menu, Breadcrumb } from 'antd'
// import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

// const { Header, Content, Footer, Sider } = Layout
// const SubMenu = Menu.SubMenu

// function itemRender(route, params, routes, paths) {
//   const last = routes.indexOf(route) === routes.length - 1
//   const click = (to) => () => app.go(to)
//   return last ? <span>{route.breadcrumbName}</span> : <a onClick={click('/' + paths.join(''))}>{route.breadcrumbName}</a>
// }
// class MenuBar extends React.Component {

//   render() {
//     return (
//       <Block name="main.menu">
//         {items => (
//           <Menu theme="dark" mode={this.props.mode}>
//             {items}
//           </Menu>
//         )}
//       </Block>
//     )
//   }
// }

// class App extends React.Component {

//   state = {
//     collapsed: false,
//     mode: 'inline'
//   }

//   toggle = () => {
//     this.setState({
//       collapsed: !this.state.collapsed,
//       mode: !this.state.collapsed ? 'vertical' : 'inline'
//     })
//   }

//   render() {
//     const { routes, params } = this.props
//     const Icon = this.state.collapsed ? MenuFoldOutlined : MenuUnfoldOutlined
//     return (
//       <Layout style={{ minHeight: '100vh' }}>
//         <Sider
//           trigger={null}
//           collapsible
//           collapsed={this.state.collapsed}
//           style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
//         >
//           <div className="logo">
//             {_c('site.logo')}
//             {_c('site.title', 'Admin')}
//           </div>
//           <MenuBar mode={this.state.mode} />
//         </Sider>
//         <Layout style={{ marginLeft: this.state.collapsed ? 80 : 200, transition: 'margin .2s' }}>
//           <Header style={{ background: '#fff', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 3px', zIndex: 10 }}>
//             <Icon
//               className="trigger pull-left"
//               onClick={this.toggle}
//               style={{ lineHeight: 'inherit', marginLeft: -40, fontSize: '1.2rem' }}
//             />
//             {/* <Breadcrumb routes={routes} params={params} itemRender={itemRender} style={{ float: 'left', lineHeight: '47px' }} /> */}
//             <div style={{ float: 'right' }}>
//               <Block name="top.right">
//                 {items => <Menu mode="horizontal" style={{ lineHeight: '62px' }}>{items}</Menu>}
//               </Block>
//             </div>
//           </Header>
//           <Content>
//             {this.props.children}
//           </Content>
//           <Footer style={{ textAlign: 'center' }}>
//             &copy; <slot>{_c('site.copyright')}</slot>
//           </Footer>
//         </Layout>
//       </Layout>
//     );
//   }

// }

const App = (props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          {props.children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
