import React from 'react'
import PropTypes from 'prop-types'

const Button = () => {
  return <button>Hello!</button>
}

Button.propTypes = {
  primary: PropTypes.bool,
  size: PropTypes.string
}

Button.defaultProps = {
  primary: true,
  size: 'small'
}

Button.propDescriptions = {
  primary: "Use the primary color for this button.",
  size: "How big the button should be."
}

const Demo = () => <Button primary size='small' />
Demo.demonstrating = Button

export default Demo
