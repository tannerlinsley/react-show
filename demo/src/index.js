import React, { Component } from 'react'
import { render } from 'react-dom'

import ReactStory from '../../src'

// Dynamically import all components and code snippets
// could easily add more file types here like css, json, etc
// we may also just want to grab index.js to allow for local
// utilities and wrappera a la styled-components/glamorous
const jsReq = require.context('./stories', true, /\.js$/)
const mdReq = require.context('./stories', true, /\.md$/)

// The types of components we'll use to render the stories
const types = {
  component: 'story/component',
  code: 'story/code'
}

// Map all jsx files into react components
const components = jsReq.keys().map(k => {
  return {
    component: jsReq(k).default,
    path: k.slice(2, k.length).split('/').slice(0, -1),
    type: types.component
  }
})

// Map all markdown files into react components
const markdown = mdReq.keys().map(k => {
  // component: markdownify(mdReq(k).default)
  return {
    component: mdReq(k),
    path: k.slice(2, k.length).split('/').slice(0, -1),
    type: types.code
  }
})

// Reduce components and markdown into stories using
// their file paths as object keys
const groupStories = (components, markdown) => {
  return [...components, ...markdown].reduce((acc, curr) => {
    const idx = curr.path.join('/')
    acc[idx] = {
      ...acc[idx],
      path: curr.path,
      [curr.type === types.component ? 'component' : 'code']: curr.component
    }
    return acc
  }, {})
}

// Nest stories according to their unique identifier
// ex. Button -> Button/Warning -> Button/Warning/ExtraWarning
// @todo: make this immutable so we can preserve the original flat map
const nestStories = stories => {
  for (let k in stories) {
    const keys = Object.keys(stories)
    const parent = keys
      .filter(key => k.includes(key) && k !== key)
      .sort((a, b) => a.length - b.length)
      .pop()

    if (parent !== undefined) {
      const children = stories[parent].children || []
      stories[parent].children = children.concat(stories[k])
      delete stories[k]
    }
  }

  return stories
}

// Transform map of stories into an array for routes
const groupedStories = groupStories(components, markdown)
const nestedStories = nestStories(groupedStories)
const stories = Object.keys(nestedStories).map(k => nestedStories[k])
const flat = groupStories(components, markdown)
const allStories = Object.keys(flat).map(k => flat[k])

export default class Demo extends Component {
  render() {
    return (
      <ReactStory
        stories={stories}
        allStories={allStories}
      />
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
