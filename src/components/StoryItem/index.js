import React from 'react'
import { Link } from 'react-router-dom'
import { MenuItem } from 'react-interface/es/components'
import { getSlugFromStory } from '../../utils'

const Story = (story) => {
  const { path, name, children, component, currentPath } = story
  return (
    <div>
      <Link to={`/story/${getSlugFromStory(story)}`}>
        <MenuItem active={currentPath === getSlugFromStory(story)}>
          {name}
        </MenuItem>
      </Link>
    </div>
  )
}

export default Story
