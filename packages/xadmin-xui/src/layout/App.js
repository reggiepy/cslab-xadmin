import React from 'react'
import { config as _c, Block, app } from 'xadmin'
import { ThemeSwitch } from "../components/theme-switch"
import { NavUser } from "../components/nav-user"
import { SquareChevronLeft, SquareChevronRight, House } from 'lucide-react'
import {
  SidebarProvider, SidebarGroup,
  Sidebar, SidebarContent,
  SidebarFooter, SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from 'xui'

class MenuBar extends React.Component {
  render() {
    return (
      <Block name="main.menu">
        {items => (
          <SidebarMenu>
            <SidebarGroup>
              {items}
            </SidebarGroup>
          </SidebarMenu>
        )}
      </Block>
    )
  }
}

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                { _c('site.logo') ? <img src={_c('site.logo')} className="size-4" /> : <House className="size-4" /> }
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight" 
                onClick={() => app.go('/app/dashboard')}>
                <span className="truncate font-semibold">
                  {_c('site.title') || 'XAdmin'}
                </span>
                <span className="truncate text-xs">{_c('site.subTitle') || 'admin panel'}</span>
              </div>
              <ThemeSwitch className="ml-auto" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <MenuBar />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: "shadcn",
          email: "m@example.com",
          avatar: "/avatars/shadcn.jpg",
        }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}


function App(props) {
  const { routes, params, children } = props;

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col flex-1 min-h-screen justify-between">
        {/* Content */}
        <main>
          {children}
        </main>
        {/* Footer */}
        <footer className="p-4 text-center border-t">
          &copy; <slot>{_c('site.copyright')}</slot>
        </footer>
      </div>
    </SidebarProvider>
  );
}

export default App
