import React from 'react'
import Markdown from 'react-smackdown'
import syntax from '../../utils/syntax'

export default ({ source }) => {
  return <Markdown source={source} syntax={syntax} />
}
