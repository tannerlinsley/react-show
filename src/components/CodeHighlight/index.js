import React from 'react'
import Markdown from 'react-smackdown'

export default ({ children }) => {
  return <Markdown source={children} />
}
