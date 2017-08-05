import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

const getKey = (story, i) => `${story.path.join('/')}-${i}`

const Story = ({ path, children, component }) => {
  return (
    <li>
      <span>{path.join('/')}</span>
      {component()}
      <ul>
        {children && children.map((c, i) => <Story key={getKey(c, i)} {...c} />)}
      </ul>
    </li>
  )
}

class ReactStory extends React.Component {

  constructor() {
    super()
    this.state = {
      isSidebarOpen: false
    }
  }

  render() {
    const stories = this.props.stories.map((s, i) =>
      <Story key={getKey(s, i)} {...s} />
    )
    return <ul>{stories}</ul>
  }
}

export default ReactStory
