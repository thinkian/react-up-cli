const exec = require('child_process').exec;
const fs = require('fs');

const inquirer = require('inquirer');
const jsonfile = require('jsonfile');

const PATHS = require('../config/paths');
const formatters = require('./formatters');
const packageJSON = require(PATHS.package.directory);
const questions = require('../config/questions');

class ReactUp {
  copyTestFile(config) {
    const { srcDirectory } = config;
    const { test } = PATHS;

    fs.createReadStream(test.directory)
      .pipe(fs.createWriteStream(`./${srcDirectory}/${test.filename}`));
  }

  createSrcDirectoryAndEntryFiles(config) {
    const { entry, redux, reduxSaga, srcDirectory } = config;
    const { htmlTemplate, reactWithRedux, reactOnly, reducers } = PATHS;
    const keyMap = {
      $name: formatters.toTitleCase(config.name),
      $initialReducer: config.initialReducer
    };
    let reactTemplate = redux ? reactWithRedux.directory : reactOnly.directory;

    // Create src directory
    if (!fs.existsSync(srcDirectory)) {
      fs.mkdirSync(srcDirectory);
    }

    if (redux && reduxSaga) {
      const { configureStore, reactWithReduxSaga, sagas } = PATHS;
      reactTemplate = reactWithReduxSaga.directory;

      fs
        .createReadStream(sagas.directory)
        .pipe(fs.createWriteStream(`./${srcDirectory}/${sagas.filename}`));

      fs
        .createReadStream(configureStore.directory)
        .pipe(
          fs.createWriteStream(`./${srcDirectory}/${configureStore.filename}`)
        );
    }

    // Create HTML template
    fs
      .createReadStream(htmlTemplate.directory)
      .pipe(fs.createWriteStream(`./${srcDirectory}/${htmlTemplate.filename}`));

    this.readFile(reactTemplate).then(data => {
      const namedProjectTemplate = formatters.replaceAll(data, keyMap);

      // Create entry file
      this.writeFile(`./${srcDirectory}/${entry}`, namedProjectTemplate);
    });

    if (redux) {
      this.readFile(reducers.directory).then(data => {
        const reducerFile = formatters.replaceAll(data, keyMap);

        // Create reducer file
        this.writeFile(`./${srcDirectory}/${reducers.filename}`, reducerFile);
      });
    }
  }

  createWebpackConfig(config) {
    this.readFile(PATHS.webpack.directory).then(data => {
      const webpackConfig = this.mergeWebpackConfig(data, config);

      // Create webpack.config.js
      this.writeFile(PATHS.webpack.filename, webpackConfig);
    });
  }

  generatePackageJSON(overrides) {
    const config = Object.assign({}, packageJSON, {
      name: formatters.toKebabCase(overrides.name),
      main: overrides.entry
    });

    if (!overrides.redux) {
      delete config.dependencies.redux;
      delete config.dependencies['react-redux'];
      delete config.dependencies['redux-saga'];
    }

    if (!overrides.reduxSaga) {
      delete config.dependencies['redux-saga'];
    }

    if (!overrides.jest) {
      delete config.devDependencies.jest;
    } else {
      config.scripts.test = 'jest';
      this.copyTestFile(overrides);
    }

    const options = { spaces: 2, EOL: '\r\n' };

    jsonfile.writeFile(PATHS.package.filename, config, options, err => {
      if (err) console.error(err);
      this.print('⚙️  Successfully created package.json');

      // Run npm commands
      this.print('⏳  Fetching dependencies...');
      exec('npm install', err => {
        if (err) console.error(err);
        this.print('📦  Successfully delivered packages');

        exec('npm run dev').stderr.pipe(process.stderr);
        this.print('🚀  Launching dev server...');
      });
    });

    // Create webpack config
    this.createWebpackConfig(overrides);

    // Create files and directories
    this.createSrcDirectoryAndEntryFiles(overrides);
  }

  mergeWebpackConfig(template, config) {
    const keyMap = {
      $srcDirectory: config.srcDirectory,
      $distDirectory: config.distDirectory,
      $entry: config.entry,
      $name: formatters.toTitleCase(config.name)
    };

    const result = formatters.replaceAll(template, keyMap);

    return result;
  }

  print(message) {
    console.log(`\n${message}`);
  }

  readFile(filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, 'utf8', (err, data) => {
        err ? reject(err) : resolve(data);
      });
    });
  }

  writeFile(filename, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filename, data, (err, data) => {
        err ? reject(err) : resolve(data);
      });
    });
  }

  init() {
    this.print('Welcome to REACT-UP!\n');
    inquirer
      .prompt(questions)
      .then(answers => this.generatePackageJSON(answers));
  }
}

const instance = new ReactUp();

module.exports = instance;
