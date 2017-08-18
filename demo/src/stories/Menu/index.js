import React from 'react'
import { Demo, Code, PropsTable } from '../../../../src'
import { Menu, MenuItem, MenuHeader } from './MenuExample'
import MenuRaw from '!raw-loader!./MenuExample/Menu'
import MenuMarkdown from './Menu.md'
console.log(MenuRaw)

const MenuDemo = () => (
  <Demo
    name="Menu"
    desc="Menu"
    code={MenuMarkdown}
  >
    <Menu>
      <MenuHeader>Account</MenuHeader>
      <MenuItem>Profile</MenuItem>
      <MenuItem>Friends</MenuItem>
      <MenuItem>Notifications</MenuItem>
      <MenuItem>Settings</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
  </Demo>
)

const DemoComponent = () => {
  return (
    <div>
      <MenuDemo />
      <PropsTable
        demonstrating={Menu}
        raw={MenuRaw}
      />
    </div>
  )
}

export default {
  name: 'Menu',
  component: DemoComponent
}
