import React from 'react'
import { Link } from 'react-router-dom'
import { MenuItem, MenuHeader } from 'react-interface/es/components'
import { getSlugFromStory } from '../../utils'

const StoryItem = (story) => {
  const { path, name, children, currentPath, component } = story
  const slug = getSlugFromStory(story)
  const newPath = path ? `${path}/${slug}` : slug

  return (
    <div>
      {
        component &&
        <Link to={`/story/${newPath}`}>
          <MenuItem active={currentPath === newPath}>
            {name}
          </MenuItem>
        </Link>
      }
      {!component && <MenuHeader>{name}</MenuHeader>}
      <ul>
        {
          children &&
          children.map((c, i) => (
            <StoryItem
              {...c}
              key={`${getSlugFromStory(c)}-${i}`}
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
