import React from 'react'
import app from 'xadmin'

// import 'antd/dist/antd.min.css'

import { Main, App, Page, Icon } from './layout'
import { Menu, MenuItem, SubMenu } from './components/menus'

import form from './form'
import model from './model'
import relate from './model/relate'
import filter from './filter'
import auth from './auth'
import locales from './locales'

import { ThemeProvider } from './context/theme-context'

export default {
  name: 'xadmin.xui',
  locales,
  components: {
    Main, App, BaseApp: App, Page, Icon,
    Menu, 'Menu.Item': MenuItem, 'Menu.SubMenu': SubMenu,
    ...form.components,
    ...model.components,
    ...filter.components,
    ...relate.components,
    ...auth.components
  },
  root_component: (app) => (children) => (
    <ThemeProvider>{children}</ThemeProvider>
  ),
  form_fields: {
    ...form.form_fields,
    ...filter.form_fields,
    ...relate.form_fields,
    ...auth.form_fields
  }
}
