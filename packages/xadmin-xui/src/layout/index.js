import React from 'react'
import Main from './Main'
import App from './App'
import Page from './Page'
import { AlertOutlined } from '@ant-design/icons'

const Icon = ({ name, ...props }) => <AlertOutlined type={name} {...props} />
export { Main, App, Page, Icon }
