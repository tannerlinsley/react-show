import React from 'react'
import Markdown from 'react-smackdown'
import syntax from '../../utils/syntax'

export default ({ children }) => {
  return <Markdown source={children} syntax={syntax} />
}
