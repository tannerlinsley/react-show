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
  height: 5rem;
  background: #e44400;
`
const BlockTwo = styled.div`
  background: #de6d04;
  padding: 1rem;
  color: white;
`
const BlockThree = styled.div`
  height: 5rem;
  background: #ecc004;
`

export default class Demo extends Component {
  state = {
    show: true,
    duration: 500,
    easing: 'easeOutQuint',
    unmountOnHide: false,
    minHeight: 0,
    height: undefined,
    extraItems: [],
  }
  render () {
    const { show, duration, easing, unmountOnHide, minHeight, height, extraItems } = this.state
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
              <td>height</td>
              <td>
                <input
                  type="number"
                  value={height}
                  onChange={e => {
                    this.setState({
                      height: e.target.value,
                    })
                  }}
                  style={{
                    width: '2rem',
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>minHeight</td>
              <td>
                <input
                  type="number"
                  value={minHeight}
                  onChange={e => {
                    this.setState({
                      minHeight: e.target.value,
                    })
                  }}
                  style={{
                    width: '2rem',
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
              extraItems: [...extraItems, ''],
            })}
        >
          Add content
        </button>

        <br />
        <br />

        <BlockOne />
        <ReactShow
          show={show}
          easing={easing}
          duration={duration}
          unmountOnHide={unmountOnHide}
          minHeight={minHeight}
          height={height}
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
          </BlockTwo>
        </ReactShow>
        <BlockThree />
      </Container>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
