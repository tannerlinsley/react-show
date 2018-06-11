/* eslint-disable no-restricted-syntax, react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import RAF from 'raf'

const easings = {
  // Cubic
  easeInCubic: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
  easeOutCubic: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',

  // Circ
  easeInCirc: 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
  easeOutCirc: 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
  easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',

  // Expo
  easeInExpo: 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
  easeOutExpo: 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
  easeInOutExpo: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',

  // Quad
  easeInQuad: 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
  easeOutQuad: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',

  // Quart
  easeInQuart: 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
  easeOutQuart: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
  easeInOutQuart: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',

  // Quint
  easeInQuint: 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
  easeOutQuint: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
  easeInOutQuint: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',

  // Sine
  easeInSine: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
  easeOutSine: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
  easeInOutSine: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',

  // Back
  easeInBack: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
  easeOutBack: 'cubic-bezier(0.175,  0.885, 0.320, 1.275)',
  easeInOutBack: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
}

export class Animate extends React.Component {
  static easings = easings
  static propTypes = {
    component: PropTypes.string,
    show: PropTypes.bool,
    easing: PropTypes.string,
    duration: PropTypes.number,
    transitionProperty: PropTypes.string,
    unmountOnHide: PropTypes.bool,
    style: PropTypes.object,
    start: PropTypes.object,
    enter: PropTypes.object,
    update: PropTypes.object,
    leave: PropTypes.object,
    onFinish: PropTypes.func,
    transitionOnMount: PropTypes.bool,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    component: 'div',
    show: true,
    easing: 'easeOutQuad',
    duration: 300,
    transitionProperty: 'all',
    unmountOnHide: true,
    transitionOnMount: true,
    style: undefined,
    start: undefined,
    enter: undefined,
    update: undefined,
    leave: undefined,
    onFinish: () => {},
  }

  constructor (props) {
    super(props)
    const {
      show, transitionOnMount, start, update, enter,
    } = this.props

    this.stage = false
    this.stageStyles = {}
    this.transitioning = false

    this.state = {
      mountContent: show,
      currentStyle: transitionOnMount ? start || update : update || enter,
      styleOverrides: {},
    }
  }
  componentDidMount () {
    const {
      transitionOnMount, show, enter, update,
    } = this.props
    if (transitionOnMount && show) {
      this.transition('enter', enter || update)
    }
  }
  componentDidUpdate (oldProps) {
    const {
      show, update, enter, leave, start,
    } = this.props
    const { mountContent } = this.state

    if (!oldProps.show && show) {
      if (mountContent && this.stage === 'leave') {
        return this.transition('update', update || enter)
      } else if (!mountContent) {
        // eslint-disable-next-line
        this.setState({
          currentStyle: start || update,
        })
      }
      return this.transition('enter', enter || update)
    }

    if (oldProps.show && !show) {
      return this.transition('leave', leave || start)
    }

    if ((!this.stage || this.stage === 'update') && show && update) {
      const shouldUpdate = Object.keys(update).some(key => this.stageStyles[key] !== update[key])

      if (shouldUpdate) {
        return this.transition('update', update)
      }
    }
  }
  ensureMounted = () =>
    new Promise(resolve => {
      const check = () => {
        if (this.el) {
          return resolve()
        }
        RAF(() => {
          this.setState(
            {
              mountContent: true,
            },
            check
          )
        })
      }
      check()
    })
  ensureStyles = styles =>
    new Promise(resolve => {
      const check = () =>
        this.setState(
          () => ({
            styleOverrides: styles,
          }),
          () => {
            RAF(() => {
              if (Object.keys(styles).some(key => !this.el || this.el.style[key] !== styles[key])) {
                return check()
              }
              resolve()
            })
          }
        )
      check()
    })
  transition = (stage, styles) => {
    if (!styles) {
      throw new Error(`ReactShow: No styles were resolved for the "${stage}" prop!`)
    }

    const { show } = this.props
    const { currentStyle } = this.state

    this.stage = stage
    this.stageStyles = styles
    this.transitioning = true

    let wasAutoWidth
    let wasAutoHeight
    let isAutoChanged

    return Promise.resolve()
      .then(() => {
        if (show) {
          return this.ensureMounted()
        }
      })
      .then(() => {
        wasAutoWidth = this.isProp(currentStyle, 'width', 'auto')
        wasAutoHeight = this.isProp(currentStyle, 'height', 'auto')
        const isAutoWidth = this.isProp(styles, 'width', 'auto')
        const isAutoHeight = this.isProp(styles, 'height', 'auto')

        const isAutoWidthChanged = wasAutoWidth !== isAutoWidth
        const isAutoHeightChanged = wasAutoHeight !== isAutoHeight
        isAutoChanged = isAutoWidthChanged || isAutoHeightChanged

        let measurements

        if (isAutoChanged) {
          measurements = this.measure()
          this.setState({
            styleOverrides: {
              overflow: 'hidden',
              ...(isAutoWidthChanged ? { width: `${measurements.width}px` } : {}),
              ...(isAutoHeightChanged ? { height: `${measurements.height}px` } : {}),
            },
          })
          return this.ensureStyles({
            overflow: 'hidden',
            ...(isAutoWidthChanged ? { width: `${measurements.width}px` } : {}),
            ...(isAutoHeightChanged ? { height: `${measurements.height}px` } : {}),
          })
        }

        this.setState({
          styleOverrides: {},
        })
      })
      .then(() => {
        RAF(() => {
          this.setState(({ currentStyle, styleOverrides }) => {
            const nextStyle = {
              ...currentStyle,
              ...styles,
            }

            return {
              // stage,
              mountContent: true,
              currentStyle: nextStyle,
              styleOverrides: isAutoChanged
                ? {
                  ...styleOverrides,
                  ...(wasAutoWidth ? { width: nextStyle.width } : {}),
                  ...(wasAutoHeight ? { height: nextStyle.height } : {}),
                }
                : {},
            }
          })
        })
      })
  }
  transitionEnd = e => {
    const { unmountOnHide, onFinish } = this.props

    e.persist()

    // Only handle transitionEnd for this element
    if (e.target !== this.el) {
      return
    }

    // We have to debounce the action of stopping
    // the "transition" state, since onTransitionEnd
    // will fire more than once if there are multiple
    // properties that were transitioned.

    if (this.transitionRAF) {
      RAF.cancel(this.transitionRAF)
    }
    this.transitionRAF = RAF(() => {
      const shouldHide = this.stage === 'leave'
      this.transitioning = false
      this.stage = false
      this.setState(
        {
          mountContent: !(shouldHide && unmountOnHide),
          styleOverrides: {}, // This is to make sure the auto/hidden overrides are gone
        },
        onFinish
      )
    })
  }
  handleRef = el => {
    this.el = el
  }
  isProp = (style, prop, value) => style[prop] === value
  measure = () => {
    if (!this.el) {
      return {}
    }
    return {
      width: this.el.scrollWidth,
      height: this.el.scrollHeight,
    }
  }
  makeStyles = () => {
    const {
      style, transitionProperty, duration, easing,
    } = this.props
    const { currentStyle, styleOverrides } = this.state

    const resolvedEasing = easings[easing] || easing || 'ease-out'

    return {
      transitionProperty,
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: `${resolvedEasing}`,
      ...style,
      ...currentStyle,
      ...styleOverrides,
    }
  }
  render () {
    const {
      component: Comp,
      children,
      show: originalShow,
      easing,
      duration,
      transitionProperty,
      unmountOnHide,
      transitionOnMount,
      show,
      style,
      update,
      leave,
      enter,
      innerRef,
      onFinish,
      ...rest
    } = this.props
    const { mountContent, currentStyle } = this.state
    return mountContent ? (
      <Comp
        ref={el => {
          this.handleRef(el)
          if (innerRef) {
            innerRef(el)
          }
        }}
        onTransitionEnd={this.transitionEnd}
        style={this.makeStyles(currentStyle)}
        {...rest}
      >
        {children}
      </Comp>
    ) : null
  }
}

module.exports = Animate

// I'll let someone smarter than me figure out how to do this ;)

// export class AnimateGroup extends React.Component {
//   constructor (props) {
//     super(props)

//     const { data } = props

//     this.nodes = this.makeNodes(data)
//   }
//   componentDidUpdate () {
//     const { data } = this.props

//     const newNodes = this.makeNodes(data)

//     let needsUpdate

//     if (newNodes.some(node => !this.nodes.find(d => d.key === node.key))) {
//       needsUpdate = 'diff'
//     }

//     if (needsUpdate) {
//       console.log(needsUpdate, newNodes, this.nodes)
//       this.nodes = this.updateNodes(newNodes)
//       this.forceUpdate()
//     }
//   }
//   makeNodes = data => {
//     const { getKey } = this.props

//     return data.map(datum => ({
//       key: getKey(datum),
//       data: datum,
//       show: true,
//     }))
//   }
//   updateNodes = next => {
//     const nodes = []

//     this.nodes.forEach(node => {
//       if (next.find(d => d.key === node.key)) {
//         return
//       }
//       exiting.push({
//         ...node,
//         show: false,
//       })
//     })

//     return [...next, ...exiting]
//   }
//   removeNode = node => {
//     this.nodes = this.nodes.filter(d => d.key !== node.key)
//     this.forceUpdate()
//   }
//   render () {
//     const {
//       data,
//       getKey,
//       children,
//       render,
//       start,
//       enter,
//       update,
//       leave,
//       duration,
//       easing,
//       ...rest
//     } = this.props
//     return (
//       <React.Fragment>
//         {this.nodes.map((node, i) => (
//           <Animate
//             key={node.key}
//             show={node.show}
//             start={typeof start === 'function' ? start(node.data, node.key, i) : start}
//             enter={typeof enter === 'function' ? enter(node.data, node.key, i) : enter}
//             update={typeof update === 'function' ? update(node.data, node.key, i) : update}
//             leave={typeof leave === 'function' ? leave(node.data, node.key, i) : leave}
//             onFinish={() => {
//               if (!node.show) {
//                 this.removeNode(node)
//               }
//             }}
//             {...rest}
//           >
//             {(render || children)(node.data)}
//           </Animate>
//         ))}
//       </React.Fragment>
//     )
//   }
// }

// function mergeNodes (left, right) {
//   let nodes = []

//   let lastRightIndex = 0

//   left.forEach(l => {
//     const index = right.findIndex(r => r.key === l.key)
//     if (index === -1) {
//       return nodes.push(l)
//     }
//     nodes = [...nodes, ...right.slice(lastRightIndex, index)]
//     lastRightIndex = index
//   })

//   return nodes
// }
