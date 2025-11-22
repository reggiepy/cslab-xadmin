import './index.css';
import app from 'xadmin';

import i18n from 'xadmin-i18n'
import auth from 'xadmin-auth'
import form from 'xadmin-form'
import ui, { apps as uiApps } from 'xadmin-ui'
import model, { apps as modelApps } from 'xadmin-model'

// import components from 'xadmin-xui'

import components from 'xadmin-antd'
import 'antd/dist/antd.min.css'

//import components from 'xadmin-bootstrap'
//import themes from './themes'

import models from './models'
import API from './api'

import 'moment/locale/zh-cn' 
import App from './App'

const { filter, actions, relate, modalform, search, reldetail } = modelApps
const { splashscreen } = uiApps

app
.use(i18n)
.use(ui)
.use(form)
// .use(themes)
.use(model)
.use(filter)
.use(actions)
.use(relate)
.use(modalform)
.use(search)
.use(reldetail)
.use(components)
.use(splashscreen)
.use(auth)
.use({
  config: {
    api: API,
    locale: {
      lng: 'zh_Hans', moment: 'zh-cn'
    },
    router: 'hash',
    auth: { can_signin: true, can_signup: true, can_reset_password: true, persist_type: 'localforage' },
    date_format: {
      time: 'HH:mm:ss', date: 'YYYY-MM-DD', datetime: 'YYYY-MM-DD HH:mm:ss'
    },
    filter: {
      textDefaultSearch: true,
      submenuShowAllFilter: true
    }
  },
  components: {
    Dashboard: App
  },
  // reducers: {
  //   test: (state=0, action) => {
  //     if(action.type === 'TEST_ADD') return ++state
  //     return state
  //   }
  // },
  // mappers: {
  //   test: {
  //     method: {
  //       add: ({ dispatch }) => () => dispatch({ type: 'TEST_ADD' })
  //     }
  //   }
  // },
  models
}).start({ container: '#root' })
