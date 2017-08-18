import React from 'react'
import { Demo, Code, PropsTable } from '../../../../../src'
import { MenuItem } from '../MenuExample'
import MenuItemRaw from '!raw-loader!../MenuExample/MenuItem'
import MenuItemMarkdown from './MenuItem.md'

const MenuDemo = () => (
  <Demo
    name="Menu Item"
    desc="Menu Item"
    code={MenuItemMarkdown}
  >
    <MenuItem>This is a menu Item</MenuItem>
  </Demo>
)

const DemoComponent = () => {
  return (
    <div>
      <MenuDemo />
      <PropsTable
        demonstrating={MenuItem}
        raw={MenuItemRaw}
      />
    </div>
  )
}

export default {
  name: 'Menu Item',
  component: DemoComponent
}
