const Mustache = require("mustache");
const { elementMatchesSelectorAll, findRootNodeMatching } = require("./utils");

function render(rootElement, view, data) {
  const template = Mustache.render(view, { data });
  rootElement.innerHTML = template;
}

function decorateData(data) {
  return data.map(item => ({
    ...item,
    open: false
  }));
}

function initialize({ rootElement, data, template }) {
  if (!data.length) {
    return render(
      rootElement,
      "<p class='c-warn-text'>Did not find any faqs :(</p>",
      null
    );
  }

  // one event handler
  rootElement.addEventListener("click", event => {
    // only do something when an accordion header is clicked
    if (elementMatchesSelectorAll("[data-accordion-trigger]", event.target)) {
      const parentElem = findRootNodeMatching(
        "[data-accordion-item]",
        event.target
      );
      const triggerElem = parentElem.querySelector("[data-accordion-trigger]");
      const panelElement = parentElem.querySelector("[data-accordion-panel]");
      const isOpen = triggerElem.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        triggerElem.setAttribute("aria-expanded", "false");
        panelElement.setAttribute("aria-hidden", "true");
      } else {
        triggerElem.setAttribute("aria-expanded", "true");
        panelElement.setAttribute("aria-hidden", "false");
      }
    }
  });

  // render initial state
  render(rootElement, template, decorateData(data));
}

module.exports = {
  initialize
};
