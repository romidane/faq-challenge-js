const fromHTML = require("from-html/lib/from-html.js");
const app = require("../js/app");

describe("app", () => {
  describe("when data is empty", () => {
    it("renders a warning message", () => {
      const { rootElement } = fromHTML("<div ref='rootElement'>");
      app.initialize({
        rootElement,
        data: []
      });

      expect(rootElement.textContent).to.equal("Did not find any faqs :(");
    });
  });

  describe("when there is data", () => {
    let root;
    const data = [
      { id: 1, question: "foo", answer: "monkey" },
      { id: 2, question: "bar", answer: "lion" }
    ];
    const template = `
        {{#data}}
          <div data-accordion-item>
            <div data-accordion-trigger id={id} aria-expanded={{open}} class="accordion">
              <h2>{{question}}</h2>
              <div data-accordion-panel {{^open}} aria-hidden="true" {{/open}}>
                <p>{{answer}}</p>
              </div>
            </div>
          </div>
        {{/data}}
      `;

    beforeEach(() => {
      rootElement = fromHTML("<div ref='rootElement'>").rootElement;
    });

    it("renders the accordions with the correct content", () => {
      app.initialize({
        rootElement,
        data,
        template
      });

      expect(rootElement.children.length).to.equal(
        2,
        "show have rendered 2 accordions"
      );

      expect(rootElement.textContent).to.include("foo");
      expect(rootElement.textContent).to.include("monkey");
      expect(rootElement.textContent).to.include("bar");
      expect(rootElement.textContent).to.include("lion");
    });

    it("renders all the accordions closed be default", () => {
      app.initialize({
        rootElement,
        data,
        template
      });

      Array.from(rootElement.children).forEach(accordion => {
        const triggerElement = accordion.querySelector(
          "[data-accordion-trigger]"
        );
        const isExpended = triggerElement.getAttribute("aria-expanded");
        const contentHidden = accordion
          .querySelector("[data-accordion-panel]")
          .getAttribute("aria-hidden");

        expect(isExpended).to.equal("false");
        expect(contentHidden).to.equal("true");
      });
    });

    it("opens an accordion when trigger zone is clicked on an accordion", () => {
      app.initialize({
        rootElement,
        data,
        template
      });

      const firstAccordion = rootElement.children[0];
      const triggerElement = firstAccordion.querySelector(
        "[data-accordion-trigger]"
      );

      const isExpended = triggerElement.getAttribute("aria-expanded");
      expect(isExpended).to.equal("false");

      dispatchDOMEvent(triggerElement, "click");

      const isExpendedAfterClick = triggerElement.getAttribute("aria-expanded");

      expect(isExpendedAfterClick).to.equal("true");
    });

    it("closes an accordion when trigger zone is clicked and the accordion is open", () => {
      app.initialize({
        rootElement,
        data,
        template
      });

      const firstAccordion = rootElement.children[0];
      const triggerElement = firstAccordion.querySelector(
        "[data-accordion-trigger]"
      );

      const isExpended = triggerElement.getAttribute("aria-expanded");
      expect(isExpended).to.equal("false");

      dispatchDOMEvent(triggerElement, "click");

      const isExpendedAfterClick = triggerElement.getAttribute("aria-expanded");
      expect(isExpendedAfterClick).to.equal("true");

      dispatchDOMEvent(triggerElement, "click");

      const isExpendedAfterSecondClick = triggerElement.getAttribute(
        "aria-expanded"
      );
      expect(isExpendedAfterSecondClick).to.equal("false");
    });
  });
});

function dispatchDOMEvent(element, eventType) {
  const event = document.createEvent("Events");
  event.initEvent(eventType, true, false);
  element.dispatchEvent(event);
}
