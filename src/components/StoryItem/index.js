import React from 'react'
import { Link } from 'react-router-dom'
import { MenuItem } from 'react-interface/es/components'
import { getSlugFromStory } from '../../utils'

const StoryItem = (story) => {
  const { path, name, children, currentPath } = story
  const slug = getSlugFromStory(story)
  const newPath = path ? `${path}/${slug}` : slug

  return (
    <div>
      <Link to={`/story/${newPath}`}>
        <MenuItem active={currentPath === newPath}>
          {name}
        </MenuItem>
      </Link>
      <ul>
        {
          children &&
          children.map((c, i) => (
            <StoryItem
              {...c}
              key={newPath}
              currentPath={currentPath}
              path={newPath}
            />
          ))
        }
      </ul>
    </div>
  )
}

export default StoryItem
