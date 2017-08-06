import React from 'react'
import { CodeHighlight } from '../../../../src'

const md = `
  ${"```js \n function render() { return 'Hey!' } \n ```"}
  ${"### I am an H3"}
`

export default () => (
  <CodeHighlight>
    {md}
  </CodeHighlight>
)
