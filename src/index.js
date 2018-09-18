/* eslint-disable no-restricted-syntax, react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import RAF from 'raf'

export const easings = {
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
    show: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    easing: PropTypes.string,
    duration: PropTypes.number,
    preMount: PropTypes.bool,
    transitionProperty: PropTypes.string,
    stayMounted: PropTypes.bool,
    style: PropTypes.object,
    start: PropTypes.object,
    enter: PropTypes.object,
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
    preMount: false,
    stayMounted: true,
    transitionOnMount: false,
    style: undefined,
    start: undefined,
    enter: undefined,
    leave: undefined,
    onFinish: () => {},
  }

  constructor (props) {
    super(props)
    const {
      show, preMount, transitionOnMount, start, enter,
    } = this.props

    this.stage = false
    this.stageStyles = {}
    this.transitioning = false

    this.state = {
      mountContent: preMount || show,
      currentStyle: transitionOnMount ? start : enter,
      styleOverrides: {},
    }
  }
  componentDidMount () {
    const { transitionOnMount, show, enter } = this.props
    if (transitionOnMount && show) {
      this.transition('enter', enter)
    }
  }
  componentDidUpdate (oldProps) {
    const {
      props: {
        show, enter, leave, start,
      },
      stage,
    } = this

    if (show) {
      // Entering
      if (!oldProps.show) {
        if (stage === 'leave') {
          return this.transition('clean')
        }
        if (enter) {
          return this.transition('enter', enter)
        }
        return this.transition('clean')
      }
      // Did Enter
      if (stage === 'didEnter') {
        return this.transition('clean')
      }
    } else if (oldProps.show) {
      // Leaving
      return this.transition('leave', leave || start)
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
  setCurrentStyle = style =>
    this.setState({
      currentStyle: style,
    })
  overrideStyle = style =>
    new Promise(resolve => {
      const check = () => {
        this.setState(
          {
            styleOverrides: style,
          },
          () => {
            RAF(() => {
              if (Object.keys(style).some(key => !this.el || this.el.style[key] !== style[key])) {
                return check()
              }
              resolve()
            })
          }
        )
      }
      check()
    })
  transition = (stage, styles = {}) => {
    const { show } = this.props

    this.stage = stage
    this.stageStyles = styles
    this.transitioning = true

    let wasAutoWidth
    let wasAutoHeight
    let isAutoWidth
    let isAutoHeight
    let isAutoChanged

    return Promise.resolve()
      .then(() => {
        if (show) {
          return this.ensureMounted()
        }
      })
      .then(() => {
        const { currentStyle, styleOverrides } = this.state

        const previousStyle = this.makeStyles(currentStyle, styleOverrides)
        const nextStyle = this.makeStyles(styles)

        wasAutoWidth = this.isProp(previousStyle, 'width', 'auto')
        wasAutoHeight = this.isProp(previousStyle, 'height', 'auto')
        isAutoWidth = this.isProp(nextStyle, 'width', 'auto')
        isAutoHeight = this.isProp(nextStyle, 'height', 'auto')

        const isAutoWidthChanged = wasAutoWidth !== isAutoWidth
        const isAutoHeightChanged = wasAutoHeight !== isAutoHeight
        isAutoChanged = isAutoWidthChanged || isAutoHeightChanged

        if (isAutoChanged) {
          // First we have to make sure we are measuring an
          // inline-block element that is overflow hidden, otherwise measurements
          // can get very inaccurate

          return this.overrideStyle({
            display: 'block',
            overflow: 'hidden',
          }).then(() => {
            // Then we measure
            const measurements = this.measure()
            // Make sure overflow is hidden while we animate
            return this.overrideStyle({
              ...(isAutoWidthChanged ? { width: `${measurements.width}px` } : {}),
              ...(isAutoHeightChanged ? { height: `${measurements.height}px` } : {}),
            })
          })
        }
      })
      .then(() => {
        RAF(() => {
          this.setState(
            ({ styleOverrides }) => {
              styleOverrides = isAutoChanged
                ? {
                  ...styleOverrides,
                  ...(wasAutoWidth ? { width: styles.width } : {}),
                  ...(wasAutoHeight ? { height: styles.height } : {}),
                }
                : styleOverrides

              return {
                mountContent: true,
                currentStyle: styles,
                styleOverrides,
              }
            },
            () => {
              // If no styles were applied, then we need to manually complete the transition
              // TODO: this might also need to be done if the transitionProperty doesn't
              // match any of the styles provided.
              // if (!styles) {
              //   this.completeTransition();
              // }
            }
          )
        })
      })
  }
  transitionEnd = e => {
    if (e) {
      e.persist()

      // Only handle transitionEnd for this element
      if (e.target !== this.el) {
        return
      }
    }

    // We have to debounce the action of stopping
    // the "transition" state, since onTransitionEnd
    // will fire more than once if there are multiple
    // properties that were transitioned.

    if (this.transitionRAF) {
      RAF.cancel(this.transitionRAF)
    }
    this.transitionRAF = RAF(this.completeTransition)
  }
  completeTransition = () => {
    const { stayMounted, onFinish } = this.props

    const shouldHide = this.stage === 'leave'
    this.transitioning = false
    if (this.stage === 'enter') {
      this.stage = 'didEnter'
    } else if (this.stage === 'mount') {
      this.stage = 'mounted'
    } else {
      this.stage = false
    }
    this.setState(
      {
        mountContent: !(shouldHide && !stayMounted),
        styleOverrides: {}, // This is to make sure the auto/hidden overrides are gone
      },
      onFinish
    )
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
  makeStyles = (currentStyle = {}, overrides = {}) => {
    const {
      style, transitionProperty, duration, easing,
    } = this.props

    const resolvedEasing = easings[easing] || easing || 'ease-out'

    return {
      transitionProperty,
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: `${resolvedEasing}`,
      ...style,
      ...currentStyle,
      ...overrides,
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
      stayMounted,
      transitionOnMount,
      show,
      style,
      leave,
      enter,
      innerRef,
      onFinish,
      preMount,
      ...rest
    } = this.props
    const { mountContent, currentStyle, styleOverrides } = this.state
    return mountContent ? (
      <Comp
        ref={el => {
          this.handleRef(el)
          if (innerRef) {
            innerRef(el)
          }
        }}
        onTransitionEnd={this.transitionEnd}
        style={this.makeStyles(currentStyle, styleOverrides)}
        {...rest}
      >
        {children}
      </Comp>
    ) : null
  }
}

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
