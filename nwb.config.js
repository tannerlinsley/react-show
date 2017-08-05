module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactStory',
      externals: {
        react: 'React'
      }
    }
  }
}
