const fromHTML = require("from-html/lib/from-html.js");

const {
  findRootNodeMatching,
  elementMatchesSelectorAll
} = require("../js/utils");

describe("Utils", () => {
  describe(".findRootNodeMatching", () => {
    it("finds the root element from on a selector", () => {
      const { element, target } = fromHTML(`
        <div ref="target" data-id="1">
          <div data-id="2">
            <div ref="element" data-id="3"></div>
          </div>
        </div>
    `);

      const node = findRootNodeMatching('[data-id="1"]', element);

      expect(node.isEqualNode(target)).to.equal(true);
    });

    it("finds nothing when the selector does not match", () => {
      const { element } = fromHTML(`
        <div ref="target" data-id="1">
          <div data-id="2">
            <div ref="element" data-id="3"></div>
          </div>
        </div>
    `);

      const node = findRootNodeMatching(".unknown", element);

      expect(node).to.equal(null);
    });
  });

  describe(".elementMatchesSelectorAll", () => {
    it("returns true when the root element matches", () => {
      const { element } = fromHTML(`<div ref="element" data-id="test" />`);

      expect(elementMatchesSelectorAll('[data-id="test"]', element)).to.equal(
        true
      );
    });

    it("returns true when a child element belongs to the selector", () => {
      const { target } = fromHTML(`
        <div ref="element" data-id="test">
          <span ref="target" data-id="test-1"></span>
        </div>
      `);

      expect(elementMatchesSelectorAll('[data-id="test"]', target)).to.equal(
        true
      );
    });

    it("returns false the selector matches neither element or child element", () => {
      const { target } = fromHTML(`
        <div ref="element" data-id="test">
          <span ref="target" data-id="test-1"></span>
        </div>
      `);

      expect(elementMatchesSelectorAll("li", target)).to.equal(false);
    });
  });
});
