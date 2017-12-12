import React, { Component } from 'react'
import { render } from 'react-dom'
import styled, { injectGlobal } from 'styled-components'

import ReactShow from '../../src'

injectGlobal`
  * { box-sizing: border-box; }
  html, body, #demo {
    font-size: 16px;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
`

const Container = styled.div`padding: 2rem;`

const BlockOne = styled.div`
  height: 2rem;
  background: rgb(41, 41, 41);
`
const BlockTwo = styled.div`
  background: rgb(102, 102, 102);
  padding: 1rem;
  color: white;
`
const BlockThree = styled.div`
  height: 2rem;
  background: rgb(41, 41, 41);
`

export default class Demo extends Component {
  state = {
    show: true,
    axis: 'y',
    showSecondary: false,
    duration: 500,
    easing: 'easeOutQuint',
    unmountOnHide: true,
    style: JSON.stringify(
      {
        overflow: 'hidden',
      },
      null,
      2,
    ),
    styleHide: JSON.stringify(
      {
        height: 0,
      },
      null,
      2,
    ),
    styleShow: JSON.stringify(
      {
        height: 'auto',
      },
      null,
      2,
    ),
    extraItems: [],
  }
  render () {
    const {
      show,
      showSecondary,
      duration,
      easing,
      unmountOnHide,
      style,
      styleHide,
      styleShow,
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

    const demoInstance = (
      <div>
        <BlockOne />
        <ReactShow
          show={show}
          easing={easing}
          duration={duration}
          unmountOnHide={unmountOnHide}
          style={computeStyle(style)}
          styleHide={computeStyle(styleHide)}
          styleShow={computeStyle(styleShow)}
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
            <ReactShow
              show={showSecondary}
              easing={easing}
              duration={duration}
              unmountOnHide={unmountOnHide}
              styleHide={computeStyle(styleHide)}
              styleShow={computeStyle(styleShow)}
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
            </ReactShow>
          </BlockTwo>
        </ReactShow>
        <BlockThree />
      </div>
    )

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
                  {Object.keys(ReactShow.easings).map(d => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>style</td>
              <td>
                <textarea
                  value={style}
                  onChange={e => {
                    this.setState({
                      style: e.target.value,
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
              <td>styleHide</td>
              <td>
                <textarea
                  value={styleHide}
                  onChange={e => {
                    this.setState({
                      styleHide: e.target.value,
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
              <td>styleShow</td>
              <td>
                <textarea
                  value={styleShow}
                  onChange={e => {
                    this.setState({
                      styleShow: e.target.value,
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
          </tbody>
        </table>

        <br />

        <button
          onClick={() =>
            this.setState({
              show: !show,
            })}
        >
          {show ? 'Hide' : 'Show'}
        </button>
        <button
          onClick={() =>
            this.setState({
              showSecondary: !showSecondary,
            })}
        >
          {showSecondary ? 'Hide Secondary' : 'Show Secondary'}
        </button>
        <button
          onClick={() =>
            this.setState({
              extraItems: [...extraItems, ''],
            })}
        >
          Add content
        </button>

        <br />
        <br />

        {demoInstance}
        {demoInstance}
      </Container>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
