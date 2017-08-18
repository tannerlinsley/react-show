import React from 'react'
import PropTypes from 'prop-types'

const MenuItem = ({ children }) => (
  <li>{children}</li>
)

MenuItem.propTypes = {
  children: PropTypes.node
}

export default MenuItem
