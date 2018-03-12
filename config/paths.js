const path = require('path');
const srcDirectory = path.join(__dirname, '../');

const paths = {
  configureStore: {
    filename: 'configureStore.js'
  },
  htmlTemplate: {
    filename: 'index.html'
  },
  package: {
    filename: 'package.json'
  },
  reactOnly: {
    filename: 'reactOnly.js'
  },
  reactWithRedux: {
    filename: 'reactWithRedux.js'
  },
  reactWithReduxSaga: {
    filename: 'reactWithReduxSaga.js'
  },
  reducers: {
    filename: 'reducers.js'
  },
  sagas: {
    filename: 'sagas.js'
  },
  webpack: {
    filename: 'webpack.config.js'
  }
};

const fullPaths = Object.keys(paths).reduce((acc, cur) => {
  // Add directory to each path
  acc[cur].directory = `${srcDirectory}/templates/${acc[cur].filename}`;
  return acc;
}, paths);

module.exports = fullPaths;
