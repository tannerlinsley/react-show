import {
  javascript,
  json,
  css,
  bash,
  xml,
} from 'react-syntax-highlighter/dist/languages'

import {
  atomOneLight,
  atomOneDark
} from 'react-syntax-highlighter/dist/styles'

export default {
  languages: [
    { name: 'javascript', syntax: javascript },
    { name: 'json', syntax: json },
    { name: 'css', syntax: css },
    { name: 'html', syntax: xml },
    { name: 'shell', syntax: bash },
    { name: 'bash', syntax: bash },
  ],
  showLineNumbers: true,
  lineNumberStyle: { opacity: .5 },
  theme: atomOneLight
}
