import React from 'react'
import { SiteData, RouteData, Head } from 'react-static'
import { Code } from 'react-smackdown'
//

import Sidebar from 'components/Sidebar'

import { Animate } from '../../../src'

let Source

function getRandomColor () {
  return [0, 1, 2, 3, 4, 5].reduce(
    m => `${m}${'0123456789ABCDEF'[Math.floor(Math.random() * 16)]}`,
    '#'
  )
}

function getItems () {
  return [0, 1, 2, 3, 4].map(d => ({
    key: `id-${d}`,
    scale: Math.random() * 1,
    color: getRandomColor(),
    rotate: Math.random() > 0.66 ? 360 : Math.random() > 0.33 ? 180 : 0,
  }))
}

// @source Source
class Demo extends React.Component {
  state = {
    items: getItems(),
    show: true,
  }

  update = () => {
    this.setState({
      items: getItems(),
    })
  }

  toggleShow = () => {
    this.setState({
      show: !this.state.show,
    })
  }

  render () {
    const { items, show } = this.state

    return (
      <div>
        <button onClick={this.update}>Update</button>
        <button onClick={this.toggleShow}>{show ? 'Hide' : 'Show'}</button>
        <div style={{ height: '200px' }}>
          {items.map(d => (
            <Animate
              key={d.key}
              show={show}
              unmountOnHide={false}
              style={{
                float: 'left',
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                transformOrigin: 'center',
              }}
              start={{
                background: 'black',
                borderRadius: '0px',
                opacity: 1,
                transform: 'translate(50%, 50%) scale(0) rotate(0)',
              }}
              enter={{
                background: 'green',
                borderRadius: '0px',
                opacity: 1,
                transform: 'translate(50%, 50%) scale(0.9) rotate(0)',
              }}
              update={{
                background: d.color,
                borderRadius: `${d.rotate / 360 * 100}px`,
                opacity: 1,
                transform: `translate(50%, 50%) scale(${0.2 + d.scale}) rotate(${d.rotate}deg)`,
              }}
              leave={{
                background: 'black',
                borderRadius: '100%',
                opacity: 0.05,
                transform: 'translate(50%, 50%) scale(0.8) rotate(0)',
              }}
            >
              {Math.round(d.scale * 100)}
            </Animate>
          ))}
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
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
