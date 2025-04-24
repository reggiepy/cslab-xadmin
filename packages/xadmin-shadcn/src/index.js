import React from 'react'
import app from 'xadmin'

import { Main, App, Page, Icon } from './layout'

import form from './form'
import model from './model'
import relate from './model/relate'
import filter from './filter'

import locales from './locales'
import { ThemeProvider } from './context/theme-context'

import './index.css'

export default {
  name: 'xadmin.ui.shadcn',
  locales,
  components: {
    Main, App, BaseApp: App, Page, Icon,
    ...form.components,
    ...model.components,
    ...relate.components,
    ...filter.components,
  },
  root_component: (app) => (children) => (
    <ThemeProvider>{children}</ThemeProvider>
  ),
  form_fields: {
    ...form.form_fields,
    ...filter.form_fields,
    ...relate.form_fields,
  //   ...auth.form_fields
  },
  // hooks: {
  //   'message': () => message
  // },
  // effects
}
