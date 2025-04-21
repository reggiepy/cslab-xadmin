import React from 'react'
import { Icon, C } from 'xadmin-ui'
import { Block, use } from 'xadmin'
import { _t } from 'xadmin-i18n'

export default props => {
  const { user } = use('auth.user')
  const { onLogout } = use('auth.logout')
  const nav = use('navigate')

  return user && (
    <Block name="top.user.menu">
      {items => (
        <C is="Menu.SubMenu" key="user-dorpdown" {...props}
          title={<span className="submenu-title-wrapper"><Icon name="user" /> {user.username}</span>}>
          {items}
          <C is="Menu.Item" key={1} onClick={() => nav('/app/change_password')}>{_t('Change password')}</C>
          <C is="Menu.Item" key={2} onClick={onLogout}>{_t('Logout')}</C >
        </C>
      )}
    </Block>
  )
}
