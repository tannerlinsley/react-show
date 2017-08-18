import React from 'react'
import { Demo, Code, PropsTable } from '../../../../src'
import Button from './Button'
import ButtonRaw from '!raw-loader!./Button'
import NormalMarkdown from './ButtonNormal.md'

const ButtonNormal = () => (
  <Demo
    name="Normal Button"
    desc="Normal Buttons"
    code={NormalMarkdown}
  >
    <Button>Hello</Button>
    <Button>Hello</Button>
    <Button>Hello</Button>
  </Demo>
)

const ButtonLarge = () => (
  <Demo name="Large Button" code={NormalMarkdown}>
    <Button size='large'>Hello</Button>
  </Demo>
)
//       <PropsTable demonstrating={Button} />
const DemoComponent = () => {
  return (
    <div>
      <ButtonNormal />
      <ButtonLarge />
      <PropsTable
        demonstrating={Button}
        raw={ButtonRaw}
      />
    </div>
  )
}

export default {
  name: 'Button',
  component: DemoComponent
}
