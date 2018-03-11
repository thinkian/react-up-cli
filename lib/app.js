const inquirer = require('inquirer');

const questions = require('../config/questions');

class ReactUp {
  init() {
    console.log('\nWelcome to REACT-UP!\n');
    inquirer.prompt(questions);
  }
}

const instance = new ReactUp();

module.exports = instance;
