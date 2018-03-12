const alphaOnly = value =>
  value.match(/^[A-Z]+$/gi) ? true : 'Alphabetical characters only';

const jsFile = value =>
  value.match(/\w+\.js$/)
    ? true
    : 'Please enter a valid filename (include .js extension)';

const name = value =>
  value.match(/^[A-Z ._-]+$/gi) ? true : 'Please enter a valid name';

const validators = {
  alphaOnly,
  jsFile,
  name
};

module.exports = validators;
