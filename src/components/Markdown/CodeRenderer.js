import LowlightRenderer from './LowlightRenderer'
import js from 'highlight.js/lib/languages/javascript'
import shell from 'highlight.js/lib/languages/shell'
import json from 'highlight.js/lib/languages/json'

export default LowlightRenderer({
  js,
  shell,
  json
})
