import React from 'react'
import app from 'xadmin'

import { Main, App } from './layout'

import locales from './locales'

//import './index.css'

export default {
  name: 'xadmin.ui.shadcn',
  locales,
  components: {
    Main, App, BaseApp: App
  },
  // form_fields: {
  //   ...form.form_fields,
  //   ...filter.form_fields,
  //   ...relate.form_fields,
  //   ...auth.form_fields
  // },
  // hooks: {
  //   'message': () => message
  // },
  // effects
}
