import React from 'react'
import Markdown from 'react-smackdown'
import syntax from '../../utils/syntax'
import MarkdownWrapper from './MarkdownWrapper'

export default ({ storyPath, stories, allStories }) => {
  const story = allStories
    .find(s => s.path.join('-').toLowerCase() === storyPath)
    || stories[0]

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
    </div>
  )
}
