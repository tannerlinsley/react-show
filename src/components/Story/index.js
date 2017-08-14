import React from 'react'
import Markdown from 'react-smackdown'
import { propTypesToObject } from '../../utils'
import syntax from '../../utils/syntax'
import MarkdownWrapper from './MarkdownWrapper'
import PropsTable from './PropsTable'

export default ({ storyPath, stories, allStories }) => {
  const story = allStories
    .find(s => s.path.join('-').toLowerCase() === storyPath)
    || stories[0]

  const demonstrating = story.component.demonstrating
  let propTypes
  
  if (demonstrating) {
    propTypes = propTypesToObject({
      propTypes: story.component.demonstrating.propTypes
    })

    for (let k in propTypes) {
      propTypes[k] = {
        ...propTypes[k],
        default: story.component.demonstrating.defaultProps[k],
        description: story.component.demonstrating.propDescriptions[k]
      }
    }
  }

  return (
    <div>
      {story.component()}
      <MarkdownWrapper>
        {
          typeof story.code === 'function'
            ? story.code()
            : <Markdown source={story.code} syntax={syntax} />
        }
      </MarkdownWrapper>
      {demonstrating && <PropsTable propTypes={propTypes} />}
    </div>
  )
}
