module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactShow',
      externals: {
        react: 'React',
        'prop-types': 'PropTypes',
      },
    },
  },
}
