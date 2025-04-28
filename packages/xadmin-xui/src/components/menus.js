import React from 'react'

import {
  SidebarProvider, SidebarTrigger,
  Sidebar, SidebarContent,
  SidebarFooter, SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from 'xui'

const MenuItem = ({ itemKey, onItemClick, children, icon, title, className, ...props }) => (
  <SidebarMenuItem>
    <SidebarMenuButton onClick={e => {
      props.onClick && props.onClick(e)
      onItemClick && onItemClick(e)
    }}>
      {icon}
      <span>{children}</span>
    </SidebarMenuButton>
  </SidebarMenuItem>
)

const SubMenu = ({ title, icon, children, className, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className={`${className || ''}`} {...props}>
      <div 
        className="flex items-center justify-between text-white hover:bg-slate-700 transition-colors px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          {icon && <span className="text-lg">{icon}</span>}
          <span>{title}</span>
        </div>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </div>
      
      {isOpen && (
        <ul className="pl-4 mt-1 space-y-1">
          {children}
        </ul>
      )}
    </div>
  )
}

const Menu = ({ className, children, ...props }) => (
  <ul className={`space-y-1 p-2 ${className || ''}`} {...props}>
    {children}
  </ul>
)

export {
  Menu,
  MenuItem,
  SubMenu
}
