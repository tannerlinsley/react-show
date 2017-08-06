import styled from 'styled-components'

export default styled.div`
  // Atom One Highlight.js Theme
  .hljs{display:block;overflow-x:auto;padding:0.5em;color:#383a42;background:#fafafa}.hljs-comment,.hljs-quote{color:#a0a1a7;font-style:italic}.hljs-doctag,.hljs-keyword,.hljs-formula{color:#a626a4}.hljs-section,.hljs-name,.hljs-selector-tag,.hljs-deletion,.hljs-subst{color:#e45649}.hljs-literal{color:#0184bb}.hljs-string,.hljs-regexp,.hljs-addition,.hljs-attribute,.hljs-meta-string{color:#50a14f}.hljs-built_in,.hljs-class .hljs-title{color:#c18401}.hljs-attr,.hljs-variable,.hljs-template-variable,.hljs-type,.hljs-selector-class,.hljs-selector-attr,.hljs-selector-pseudo,.hljs-number{color:#986801}.hljs-symbol,.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-title{color:#4078f2}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:bold}.hljs-link{text-decoration:underline}

  // Theme Overrides

  ul {
    list-style: disc;
    padding-left: 2rem;
  }

  img {
    max-width: 100%;
  }

  blockquote {
    border-left: 3px solid #b6b3da;
    padding-left: 1rem;
    font-style: italic;
  }

  pre, code {
    font-family: monospace;
  }

  code {
    border-radius: 4px;
    padding: 0 .25rem;
    background: #F4F5F6;
    display: inline-block !important;
    line-height: 1.5;
  }

  pre code {
    font-size: 1.1rem;
    color: #343240;
    border: none;
    word-break: break-all;
    white-space: pre-wrap;
    width: 100%;
  }

  pre {
    border-radius: 4px;
    background: #F4F5F6;
    padding: 1rem;
    color: #343240;
    font-family: Roboto Mono, monospace;
    border-radius: 3px;
    line-height: 19px;
  }

  table {
    display: block;
    width: 100%;
    overflow: auto;
  }

  table th {
    font-weight: bold;
  }

  table th,
  table td {
    padding: 6px 13px;
    border: 1px solid #ddd;
  }

  table tr {
    background-color: #fff;
    border-top: 1px solid #ccc;
  }

  table tr:nth-child(2n) {
    background-color: #f8f8f8;
  }

  svg {
    height: 18px;
    width: 18px;
    margin-right: .5rem;
    margin-bottom: 2px;
  }

  hr {
    border-bottom-color: #eee;
    height: .25em;
    padding: 0;
    margin: 24px 0;
    background-color: #e7e7e7;
    border: 0;
  }

  .hljs {
    background: #F4F5F6;
  }

  .hljs-string {
    color: #955CCB;
  }

  .hljs-attr {
    color: #4078f2;
  }
`
