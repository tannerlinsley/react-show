import React from 'react'
import { SiteData, RouteData, Head } from 'react-static'
import { Code } from 'react-smackdown'
//

import Sidebar from 'components/Sidebar'

import { AnimateGroup } from '../../../src'

let Source

const count = 10

function getItems () {
  // eslint-disable-next-line
  return Array.from(new Array(count), (d, i) => i)
    .map(d => ({ value: d }))
    .filter(() => Math.random() > 0.66)
}

// @source Source
class Demo extends React.Component {
  state = {
    width: null,
    items: getItems(),
  }

  componentDidMount () {
    this.updateWidth()
    window.addEventListener('resize', this.updateWidth)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateWidth)
  }

  updateWidth = () => {
    this.setState(() => ({ width: this.container.offsetWidth || 200 }))
  }

  container = null

  render () {
    const { items, width } = this.state

    return (
      <div
        ref={d => {
          this.container = d
        }}
      >
        <button onClick={() => this.setState({ items: getItems() })}>Update</button>
        {width === null ? null : (
          <div>
            <AnimateGroup
              data={items}
              getKey={d => d.value}
              style={{
                height: '20px',
                width: '100%',
                background: 'rgba(0,0,0,.03)',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
              }}
              start={{
                height: '0px',
              }}
              enter={{
                height: 'auto',
              }}
              update={{
                height: 'auto',
              }}
              leave={{
                height: '0px',
              }}
            >
              {item => <div style={{ padding: '.5rem' }}>Item {item.value + 1}</div>}
            </AnimateGroup>
          </div>
        )}
      </div>
    )
  }
}
// @source Source

const Doc = () => (
  <SiteData
    render={({ repoName }) => (
      <RouteData
        render={({ editPath, title }) => (
          <Sidebar>
            <Head>
              <title>{`${title} | ${repoName}`}</title>
            </Head>
            <Demo />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Code source={Source} langauge="javascript" />
            <div>
              <a href={editPath}>Edit this page on Github</a>
            </div>
          </Sidebar>
        )}
      />
    )}
  />
)

export default Doc
