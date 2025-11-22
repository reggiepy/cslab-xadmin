import React from 'react'
import Main from './Main'
import App from './App'
import Page from './Page'
import { DynamicIcon } from 'lucide-react/dynamic';

const Icon = ({ name, ...props }) => <DynamicIcon name={name} {...props} />

export { Main, App, Page, Icon }
