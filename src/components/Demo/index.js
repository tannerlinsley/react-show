import React from 'react'
import styled from 'styled-components'
import Code from '../Code'
const Demo = ({ children, name, desc, code }) => (
  <div>
    {name && <p>Name: {name}</p>}
    {desc && <p>Description: {desc}</p>}
    {code && <Code source={code} />}
    {children}
  </div>
)

export default Demo
