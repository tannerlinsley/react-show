import React, { Component } from 'react'
import { render } from 'react-dom'
import { injectGlobal } from 'styled-components'

import ReactShow, { makeStoriesFromFolders } from '../../src'

// Dynamically import all components and code snippets
// could easily add more file types here like css, json, etc
// we may also just want to grab index.js to allow for local
// utilities and wrappers a la styled-components/glamorous
const jsReq = require.context('./stories', true, /\.js$/)
const mdReq = require.context('./stories', true, /\.md$/)

// Stories simply need to follow the following structure:
// @path: An array of strings indicating the hierarchy of the component
// @component: The component that should be rendered
// @code: The markdown demonstrating the component
// @children (optional): Nested child stories with the same structure
const stories = makeStoriesFromFolders(jsReq, mdReq)

injectGlobal`
  * { box-sizing: border-box; }
  html, body, #demo {
    height: 100%;
    width: 100%;
    margin: 0;
  }
`

export default class Demo extends Component {
  render() {
    return (
      <ReactShow stories={stories} />
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
