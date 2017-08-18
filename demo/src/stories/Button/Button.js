import React from 'react'
import PropTypes from 'prop-types'

const Button = () => {
  return <button>Hello!</button>
}

Button.propTypes = {
  /**
   * What type of component is this?
   */
  primary: PropTypes.bool.isRequired,
  /**
   * How big is it?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large'])
}

Button.defaultProps = {
  primary: true,
  size: 'small'
}

export default Button
