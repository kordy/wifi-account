const classModify = (className, modifiers) => {
  if (!modifiers) return className;
  if (!Array.isArray(modifiers)) modifiers = [modifiers];
  let newClassName = className;
  modifiers.map(modifier => {
    if (!modifier) return;
    newClassName += ' ' + className + '--' + modifier;
  });
  return newClassName;
};

const keyMirror = function(prefix, keys) {
  if (keys == null) {
    keys = prefix;
    prefix = '';
  }

  if (!Array.isArray(keys)) {
    throw new Error('keyMirror(...): Argument must be an array.');
  }

  (prefix.length) && (prefix += '.');

  let result = {};

  keys.forEach((key) => (result[key] = prefix + key));

  return result;
};

export default {
  classModify,
  keyMirror
};