import React from 'react'
import { Link } from 'react-router-dom'
import { MenuItem } from 'react-interface/es/components'

const getKey = (story, i) => `${story.path.join('/')}-${i}`
const Story = ({ path, children, component }) => {
  return (
    <div>
      <Link to={`/story/${path.join('-').toLowerCase()}`}>
        <MenuItem>
          {path.join('/')}
        </MenuItem>
      </Link>
      <ul>
        {children && children.map((c, i) => <Story key={getKey(c, i)} {...c} />)}
      </ul>
    </div>
  )
}

export default Story
