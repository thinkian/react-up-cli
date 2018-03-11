const directory = __dirname.split('/');
const projectName = directory[directory.length - 1];

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Name your project',
    default: projectName
  },
  {
    type: 'input',
    name: 'entry',
    message: 'Name your entry file',
    default: 'index.js'
  },
  {
    type: 'input',
    name: 'srcDirectory',
    message: 'Name your source directory',
    default: 'src'
  },
  {
    type: 'input',
    name: 'distDirectory',
    message: 'Name your distribution directory',
    default: 'dist'
  },
  {
    type: 'confirm',
    name: 'redux',
    message: 'Are you using Redux?',
    default: true
  },
  {
    type: 'input',
    name: 'initialReducer',
    message: 'Name your initial reducer',
    when: answers => answers.redux,
    default: 'application'
  },
  {
    type: 'confirm',
    name: 'reduxSaga',
    message: 'Are you using Redux Saga?',
    when: answers => answers.redux,
    default: true
  },
  {
    type: 'confirm',
    name: 'jest',
    message: 'Are you using Jest as a test runner?',
    default: true
  }
];

module.exports = questions;
