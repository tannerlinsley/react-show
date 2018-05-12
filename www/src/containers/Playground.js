import React from 'react'
import { SiteData, RouteData, Head } from 'react-static'
import { Code } from 'react-smackdown'
import styled from 'styled-components'
//

import Sidebar from 'components/Sidebar'

import { Animate } from '../../../src'

const Container = styled.div`
  padding: 2rem;
`

const BlockOne = styled.div`
  height: 2rem;
  background: rgb(41, 41, 41);
`
const BlockTwo = styled.div`
  padding: 1rem;
  color: white;
`
const BlockThree = styled.div`
  height: 2rem;
  background: rgb(41, 41, 41);
`

let Source

// @source Source
class Demo extends React.Component {
  state = {
    mount: true,
    show: true,
    showSecondary: false,
    duration: 1000,
    easing: 'easeOutQuint',
    unmountOnHide: true,
    transitionOnMount: true,
    start: JSON.stringify(
      {
        transform: 'scale(0.5)',
        opacity: 0,
        height: 0,
        background: 'green',
      },
      null,
      2
    ),
    enter: JSON.stringify(
      {
        transform: 'scale(1)',
        opacity: 1,
        height: 'auto',
        background: 'teal',
      },
      null,
      2
    ),
    update: JSON.stringify(
      {
        transform: 'scale(1)',
        opacity: 1,
        height: 'auto',
        background: 'gray',
      },
      null,
      2
    ),
    leave: JSON.stringify(
      {
        transform: 'scale(1)',
        opacity: 1,
        height: 0,
        background: 'red',
      },
      null,
      2
    ),
    extraItems: [],
  }
  render () {
    const {
      mount,
      show,
      showSecondary,
      duration,
      easing,
      unmountOnHide,
      transitionOnMount,
      start,
      enter,
      update,
      leave,
      extraItems,
    } = this.state

    const computeStyle = s => {
      try {
        return JSON.parse(s) // eslint-disable-line no-eval
      } catch (err) {
        console.warn(err)
        return {}
      }
    }

    const demoInstance = mount ? (
      <div>
        <BlockOne />
        <Animate
          show={show}
          easing={easing}
          duration={duration}
          unmountOnHide={unmountOnHide}
          transitionOnMount={transitionOnMount}
          start={computeStyle(start)}
          enter={computeStyle(enter)}
          update={computeStyle(update)}
          leave={computeStyle(leave)}
        >
          <BlockTwo>
            This is some content!
            <br />
            This is some more content!
            <br />
            Even more content!
            <br />
            <div>
              {extraItems.map((d, i) => (
                <div key={i}>
                  Even more content!<br />
                </div>
              ))}
            </div>
            <Animate
              show={showSecondary}
              easing={easing}
              duration={duration}
              transitionOnMount={transitionOnMount}
              start={computeStyle(start)}
              leave={computeStyle(leave)}
              update={computeStyle(update)}
              enter={computeStyle(enter)}
            >
              <div>
                <br />
                <div>Second</div>
                <div>Level</div>
                <div>Content</div>
                <div>Goes</div>
                <div>Here</div>
                <div>
                  {extraItems.map((d, i) => (
                    <div key={i}>
                      Even more content!<br />
                    </div>
                  ))}
                </div>
              </div>
            </Animate>
          </BlockTwo>
        </Animate>
        <BlockThree />
      </div>
    ) : null

    return (
      <Container>
        <table>
          <thead />
          <tbody>
            <tr>
              <td>duration</td>
              <td>
                <input
                  value={duration}
                  onChange={e => {
                    this.setState({
                      duration: e.target.value,
                    })
                  }}
                  style={{
                    width: '2rem',
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>easing</td>
              <td>
                <select
                  value={easing}
                  onChange={e => {
                    this.setState({
                      easing: e.target.value,
                    })
                  }}
                  style={{
                    width: '8rem',
                  }}
                >
                  {Object.keys(Animate.easings).map(d => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>start</td>
              <td>
                <textarea
                  value={start}
                  onChange={e => {
                    this.setState({
                      start: e.target.value,
                    })
                  }}
                  style={{
                    width: '10rem',
                    height: '4rem',
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>enter</td>
              <td>
                <textarea
                  value={enter}
                  onChange={e => {
                    this.setState({
                      enter: e.target.value,
                    })
                  }}
                  style={{
                    width: '10rem',
                    height: '4rem',
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>update</td>
              <td>
                <textarea
                  value={update}
                  onChange={e => {
                    this.setState({
                      update: e.target.value,
                    })
                  }}
                  style={{
                    width: '10rem',
                    height: '4rem',
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>leave</td>
              <td>
                <textarea
                  value={leave}
                  onChange={e => {
                    this.setState({
                      leave: e.target.value,
                    })
                  }}
                  style={{
                    width: '10rem',
                    height: '4rem',
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>unmountOnHide</td>
              <td>
                <select
                  value={unmountOnHide}
                  onChange={e => {
                    this.setState({
                      unmountOnHide: e.target.value === 'true',
                    })
                  }}
                  style={{
                    width: '4rem',
                  }}
                >
                  {['true', 'false'].map(d => (
                    <option key={d} value={d}>
                      {d.toString()}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>transitionOnMount</td>
              <td>
                <select
                  value={transitionOnMount}
                  onChange={e => {
                    this.setState({
                      transitionOnMount: e.target.value === 'true',
                    })
                  }}
                  style={{
                    width: '4rem',
                  }}
                >
                  {['true', 'false'].map(d => (
                    <option key={d} value={d}>
                      {d.toString()}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <br />

        <button
          onClick={() =>
            this.setState({
              show: !show,
            })
          }
        >
          {show ? 'Hide' : 'Show'}
        </button>
        <button
          onClick={() =>
            this.setState({
              showSecondary: !showSecondary,
            })
          }
        >
          {showSecondary ? 'Hide Secondary' : 'Show Secondary'}
        </button>
        <button
          onClick={() =>
            this.setState({
              extraItems: [...extraItems, ''],
            })
          }
        >
          Add content
        </button>
        <button
          onClick={() =>
            this.setState({
              mount: !mount,
            })
          }
        >
          {show ? 'Unmount' : 'Mount'}
        </button>

        <br />
        <br />

        {demoInstance}
        {demoInstance}
        {demoInstance}
      </Container>
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
            <Code
              source={Source}
              langauge="javascript"
              style={{
                maxHeight: '400px',
              }}
            />
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
