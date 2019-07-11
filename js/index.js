import contentRepository from "./repository";
import app from "./app";

const client = {
  get: url => {
    return fetch(url).then(res => res.json());
  }
};

const repository = contentRepository(client);

repository.faqs().then(data => {
  app.initialize({
    data,
    template: document.getElementById("template").innerHTML,
    rootElement: document.getElementById("app")
  });
});
