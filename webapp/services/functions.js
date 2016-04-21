const classModifiers = (className, modifiers) => {
  if (!modifiers) return className;
  if (!Array.isArray(modifiers)) modifiers = [modifiers];
  let newClassName = className;
  modifiers.map(modifier => {
    if (!modifier) return;
    newClassName += ' ' + className + '--' + modifier;
  });
  return newClassName;
};

export default {
  classModifiers
};