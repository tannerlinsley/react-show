import React from 'react'
import PropTypes from 'prop-types'

const MenuHeader = ({ children }) => (
  <li style={{ fontSize: 12 }}>{children}</li>
)

MenuHeader.propTypes = {
  children: PropTypes.node
}

export default MenuHeader
