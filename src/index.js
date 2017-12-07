/* eslint-disable no-restricted-syntax */
import React from 'react'
import PropTypes from 'prop-types'

const transitionEvent = (() => {
  if (typeof document === 'undefined') {
    return
  }
  const el = document.createElement('fakeelement')
  const transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  }

  /* eslint-disable no-restricted-syntax */
  for (const t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t]
    }
  }
})()

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

export default class ReactShow extends React.Component {
  static easings = easings
  static propTypes = {
    easing: PropTypes.string,
    duration: PropTypes.number,
    transitionProperty: PropTypes.string,
    unmountOnHide: PropTypes.bool,
    height: PropTypes.number,
    minHeight: PropTypes.number,
    maxHeight: PropTypes.number,
    transitionOnMount: PropTypes.bool,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    show: false,
    easing: 'easeOutQuad',
    duration: 500,
    transitionProperty: 'height',
    unmountOnHide: false,
    minHeight: 0,
    maxHeight: 0,
    height: undefined,
    transitionOnMount: false,
    style: {},
  }

  constructor (props) {
    super(props)
    this.state = {
      mountContent: props.show,
      height: props.transitionOnMount ? '0px' : 'auto',
    }
  }
  componentDidMount () {
    if (this.props.show) {
      this.animateIn()
    }
  }
  componentWillReceiveProps (next) {
    if (!this.props.show && next.show) {
      this.animateIn()
    } else if (this.props.show && !next.show) {
      this.animateOut()
    }
  }
  onTransitionEnd = () => {
    const { unmountOnHide, show } = this.props
    if (!show && unmountOnHide) {
      this.setState({
        mountContent: false,
      })
    }
    if (show) {
      this.setState({
        height: 'auto',
      })
    }
  }
  getStyles = () => {
    const { style, transitionProperty, duration, easing } = this.props
    const { height } = this.state

    const resolvedEasing = easings[easing] || easing || 'ease-out'

    return {
      overflow: 'hidden',
      transitionProperty,
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: `${resolvedEasing}`,
      ...style,
      height,
    }
  }
  animateIn = () => {
    const { minHeight, maxHeight } = this.props
    this.setState(
      {
        height: `${minHeight || 0}px`,
        mountContent: true,
      },
      () => {
        const height = this.measureHeight()
        this.setState({
          height: `${maxHeight || height}px`,
        })
      },
    )
  }
  animateOut = () => {
    const { minHeight, maxHeight } = this.props
    const minimize = () => {
      window.setTimeout(() => {
        if (this.el.style.height === 'auto') {
          minimize()
          return
        }
        this.setState({
          height: `${minHeight || 0}px`,
        })
      }, 16)
    }
    if (this.el.style.height !== 'auto') {
      minimize()
    } else {
      const height = this.measureHeight()
      this.setState(
        {
          height: `${maxHeight || height}px`,
        },
        minimize,
      )
    }
  }
  handleRef = el => {
    this.el = el
    if (this.el) {
      this.el.addEventListener(transitionEvent, this.onTransitionEnd)
    }
  }
  measureHeight = () => (this.el ? this.el.scrollHeight : 0)
  render () {
    const {
      children,
      style,
      show: originalShow,
      easing,
      duration,
      transitionProperty,
      unmountOnHide,
      minHeight,
      maxHeight,
      height,
      transitionOnMount,
      ...rest
    } = this.props
    const { mountContent } = this.state
    return mountContent ? (
      <div ref={this.handleRef} style={this.getStyles()} {...rest}>
        {React.Children.only(children)}
      </div>
    ) : null
  }
}
