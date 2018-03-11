function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

function toKebabCase(str) {
  return str.toLowerCase().replace(/\W+/g, '-');
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .replace(/[-_.]/g, ' ')
    .split(' ')
    .map(word => word.replace(word[0], word[0].toUpperCase()))
    .join(' ');
}

function replaceAll(str, keyMap) {
  return Object.keys(keyMap).reduce((acc, cur) => {
    return acc.replace(new RegExp(escapeRegExp(cur), 'g'), keyMap[cur]);
  }, str);
}

const formatters = {
  escapeRegExp,
  toKebabCase,
  toTitleCase,
  replaceAll
};

module.exports = formatters;
