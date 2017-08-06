import React from 'react'
import MarkdownRender from 'markdown-to-jsx'
import styled from 'styled-components'
import Wrapper from './Wrapper'
import CodeRenderer from './CodeRenderer'

const Markdown = ({ source }) => {
  const content = (
    <MarkdownRender
      options={{
        overrides: {
          code: {
            component: CodeRenderer
          }
        },
      }}
    >
      {source}
    </MarkdownRender>
  )

  return (
    <Wrapper className="markdown" key="md-remark">
      {content}
    </Wrapper>
  )
}

export default Markdown
