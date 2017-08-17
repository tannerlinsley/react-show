import React from 'react'
import Markdown from 'react-smackdown'
import { getSlugFromStory, propTypesToObject } from '../../utils'
import syntax from '../../utils/syntax'
import MarkdownWrapper from './MarkdownWrapper'

export default ({ stories, storyPath }) => {
  const story = stories
    .find(s => getSlugFromStory(s) === storyPath)
    || stories[0]

  console.log(story)

  // const demonstrating = story.component.demonstrating
  // let propTypes

  // if (demonstrating) {
  //   propTypes = propTypesToObject({
  //     propTypes: story.component.demonstrating.propTypes
  //   })
  //
  //   for (let k in propTypes) {
  //     propTypes[k] = {
  //       ...propTypes[k],
  //       default: story.component.demonstrating.defaultProps[k],
  //       description: story.component.demonstrating.propDescriptions[k]
  //     }
  //   }
  // }

  return (
    <div>
      {story.name}
      {story.component()}
    </div>
  )
}
