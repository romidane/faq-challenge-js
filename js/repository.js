const config = require("./config");

function contentRepository(client) {
  function faqs() {
    return client
      .get(config.apis.faq)
      .then(data => {
        if (data && data.faqs) {
          return data.faqs; // if the data was complex I would use a decorator
        }
        return [];
      })
      .catch(exp => {
        console.log(exp); // in production would be an application logger such as bugsnag or rollbar;
        return []; // I don't have requirements for handling errors so I will return empty
      });
  }

  return {
    faqs
  };
}

module.exports = contentRepository;
