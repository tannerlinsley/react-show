import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import base from 'react-interface/es/themes/base'
import StoryItem from '../StoryItem'
import { flattenStories } from '../../utils'

const Layout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;

  ul {
    margin-left: .5rem;
    padding-left: .5rem;
  }

  section, aside { padding: 1rem }
  aside { border-right: 1px solid #ddd }
  aside > ul {
    margin: 0;
    padding: 0;
  }
`

const StoryDemo = ({ storyPath, stories, allStories }) => {
  const story = allStories
    .find(s => s.path.join('-').toLowerCase() === storyPath)
    || stories[0]

  return (
    <div>
      {story.component()}
      {story.code}
    </div>
  )
}

class ReactShow extends React.Component {
  constructor() {
    super()
    this.state = {
      isSidebarOpen: false
    }
  }

  render() {
    const stories = match => this.props.stories.map((s, i) =>
      <StoryItem
        key={`${s.path.join('-')}-${i}`} {...s}
        currentPath={match.params.storyPath}
      />
    )

    return (
      <Router>
        <div style={{ height: '100%', width: '100%' }}>
          <Route exact path='/' render={() =>(
            <Redirect to={`/story/${this.props.stories[0].path.join('-').toLowerCase()}`} />
          )} />
          <Route path='/story/:storyPath' render={({ match }) => (
            <ThemeProvider theme={base}>
              <Layout>
                <aside>
                  <ul style={{ minWidth: 200, flex: '0 1 auto' }}>
                    {stories(match)}
                  </ul>
                </aside>
                <section style={{ flex: '1 1 auto' }}>
                  <StoryDemo
                    storyPath={match.params.storyPath}
                    stories={this.props.stories}
                    allStories={flattenStories(this.props.stories)}
                  />
                </section>
              </Layout>
            </ThemeProvider>
          )} />
        </div>
      </Router>
    )
  }
}

export default ReactShow
