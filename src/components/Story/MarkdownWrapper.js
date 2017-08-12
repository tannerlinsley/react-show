import styled from 'styled-components'

export default styled.div`
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
    display: inline;
    word-break: break-all;
  }

  pre code {
    font-size: 1.1rem;
    color: #343240;
    border: none;
    word-break: break-all;
    white-space: pre-wrap;
    width: 100%;
    display: inline-block !important;
  }

  pre {
    border-radius: 4px;
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

  code.hljs.shell:before, code.hljs.bash:before {
    content: "$";
    margin-right: 5px;
    color: #b4b1d8;
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
