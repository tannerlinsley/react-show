import React from 'react'
import PropTypes from 'prop-types'

const Menu = ({ children }) => (
  <ul>{children}</ul>
)

Menu.propTypes = {
  children: PropTypes.node
}

export default Menu
