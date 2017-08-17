import React from 'react'
import { Demo, Code, PropsTable } from '../../../../src'
import Button from './Button'

const ButtonNormal = () => (
  <Demo
    name="Normal Button"
    desc="Normal Buttons"
    code="#Code"
  >
    <Button>Hello</Button>
    <Button>Hello</Button>
    <Button>Hello</Button>
  </Demo>
)

const ButtonLarge = () => (
  <Demo name="Large Button" code="#Code">
    <Button size='large'>Hello</Button>
  </Demo>
)
//       <PropsTable demonstrating={Button} />
const DemoComponent = () => {
  return (
    <div>
      <ButtonNormal />
      <ButtonLarge />
    </div>
  )
}

export default {
  name: 'Button',
  component: DemoComponent
}
