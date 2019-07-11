require("dotenv").config({ path: ".env-test" });

const jsdom = require("jsdom");
const chai = require("chai");
const sinon = require("sinon");
const expect = require("chai").expect;

const { JSDOM } = jsdom;

// JSDOM
const exposedProperties = ["window", "navigator", "document"];
const { document } = new JSDOM(``, {
  url: "http://example.org/",
  referrer: "http://example.com/",
  contentType: "text/html",
  includeNodeLocations: true
}).window;

global.document = document;
global.window = document.defaultView;

Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === "undefined") {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: "node.js"
};

global.expect = chai.expect;
global.sinon = sinon;
global.expect = expect;
