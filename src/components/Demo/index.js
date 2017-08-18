import React from 'react'
import styled from 'styled-components'
import Code from '../Code'
const Demo = ({ children, name, desc, code }) => (
  <div>
    <p>Name: {name}</p>
    <p>Description: {desc}</p>
    <Code source={code} />
    {children}
  </div>
)

export default Demo
