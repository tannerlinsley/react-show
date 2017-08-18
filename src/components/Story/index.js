import React from 'react'
import Markdown from 'react-smackdown'
import { getSlugFromStory } from '../../utils'
import syntax from '../../utils/syntax'
import MarkdownWrapper from './MarkdownWrapper'

export default ({ stories, storyPath }) => {
  const story = stories
    .find(s => getSlugFromStory(s) === storyPath)
    || stories[0]

  console.log(story)

  return (
    <div>
      {story.name}
      {story.component()}
    </div>
  )
}
