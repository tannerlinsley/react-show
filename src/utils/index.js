import PropTypes from 'prop-types';

function flattenStory(story, stories = []) {
  const { children, ...parent } = story
  stories = stories.concat(parent)
  if (children) {
    children.forEach(c => {
      stories = stories.concat(flattenStory(c))
    })
  }
  return stories
}

export function flattenStories(stories) {
  return stories.reduce((acc, curr) => {
    return acc.concat(flattenStory(curr))
  }, [])
}

export function makeStoriesFromFolders(jsReq, mdReq) {
  // The types of components we'll use to render the stories
  const types = {
    component: 'story/component',
    code: 'story/code'
  }

  // Map all jsx files into react components
  const components = jsReq.keys().map(k => {
    return {
      component: jsReq(k).default,
      path: k.slice(2, k.length).split('/').slice(0, -1),
      type: types.component
    }
  })

  // Map all markdown files into react components
  const markdown = mdReq.keys().map(k => {
    // component: markdownify(mdReq(k).default)
    return {
      component: k.includes('.md') ? mdReq(k) : mdReq(k).default,
      path: k.slice(2, k.length).split('/').slice(0, -1),
      type: types.code
    }
  })

  // Reduce components and markdown into stories using
  // their file paths as object keys
  const groupStories = (components, markdown) => {
    return [...components, ...markdown].reduce((acc, curr) => {
      const idx = curr.path.join('/')
      acc[idx] = {
        ...acc[idx],
        path: curr.path,
        [curr.type === types.component ? 'component' : 'code']: curr.component
      }
      return acc
    }, {})
  }

  // Nest stories according to their unique identifier
  // ex. Button -> Button/Warning -> Button/Warning/ExtraWarning
  // @todo: make this immutable so we can preserve the original flat map
  const nestStories = stories => {
    for (let k in stories) {
      const keys = Object.keys(stories)
      const parent = keys
        .filter(key => k.includes(key) && k !== key)
        .sort((a, b) => a.length - b.length)
        .pop()

      if (parent !== undefined) {
        const children = stories[parent].children || []
        stories[parent].children = children.concat(stories[k])
        delete stories[k]
      }
    }

    return stories
  }

  // Transform map of stories into an array for routes
  const groupedStories = groupStories(components, markdown)
  const nestedStories = nestStories(groupedStories)
  const stories = Object.keys(nestedStories).map(k => nestedStories[k])

  return stories
}

export function getSlugFromStory(story) {
  return story.slug || story.name.split(' ').join('-').toLowerCase()
}

// Inspired by http://design-system.wonderbly.com/components/atoms/Badge
// helper method to determine whether a propType method is a particular PropType validator
const isCorrectPropType = (method, propType) => {
  // console.log(method, PropTypes[propType])
  return method === PropTypes[propType] || method === PropTypes[propType].isRequired
}

// helper method to determine whether a prop is required or not - if it is required,
// it'll be equal to the .isRequired method on the propType.
const isPropTypeRequired = (method, propType) => method === PropTypes[propType].isRequired

// method to determine what PropType a particular prop is. It does this by taking
// the PropType validator of a particular prop, and running it against each of the
// PropType validators set in the propTypes array. If a match is found, we return
// an object of the prop type, and whether it is required or not.
const getPropInfo = method => {
  // For our example, we've only included these three prop types in the array,
  // as that is what the Badge takes. But as a component library grows, this
  // would need to be updated whenver you add a new component.
  const propTypes = [
    'string',
    'node',
    'bool'
  ];

  return propTypes.reduce((obj, curr) => {
    const isCorrect = isCorrectPropType(method, curr)
    if (obj.type) {
      return obj
    }
    if (isCorrect) {
      obj.type = curr
      obj.required = isPropTypeRequired(method, curr)
    }
    return obj
  }, {})
};

// this takes all the propTypes (in our example - the value of Badge.propTypes)
// and loops through each, and returns a human-readable object containing
// type and required status for each prop.
export const propTypesToObject = ({ propTypes }) => {
  let newProps = Object.keys(propTypes).reduce((obj, curr) => {
    const info = getPropInfo(propTypes[curr])
    return {
      ...obj,
      [curr]: {
        type: info.type,
        required: info.required
      }
    }
  }, {})
  return newProps
}
