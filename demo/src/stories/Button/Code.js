import React from 'react'
import { CodeHighlight } from '../../../../src'

const md = `
  ${"```javascript \n function render() { return 'Hey!' } \n ```"}
  ${"### I am an H3"}
`

export default () => (
  <CodeHighlight>
    {md}
  </CodeHighlight>
)
