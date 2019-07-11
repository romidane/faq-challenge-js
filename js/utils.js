module.exports.elementMatchesSelectorAll = function elementMatchesSelectorAll(
  selector,
  element
) {
  const matchesElement = element.matches(selector);
  const matchesElementChildren = element.matches(`${selector} *`);

  return matchesElement || matchesElementChildren;
};

module.exports.findRootNodeMatching = function findRootNodeMatching(
  selector,
  element
) {
  if (!element || !element.matches) {
    return null;
  }

  if (element.matches(selector)) {
    return element;
  }

  if (element.parentNode) {
    return findRootNodeMatching(selector, element.parentNode);
  }

  return null;
};
