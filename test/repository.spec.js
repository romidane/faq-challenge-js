const contentRepository = require("../js/repository");

describe("contentRepository", () => {
  it("return data when the client returns expected data", async () => {
    const client = {
      get: sinon.stub().resolves({
        faqs: [1, 2, 3]
      })
    };
    const repository = contentRepository(client);

    const result = await repository.faqs();

    expect(result).to.eql([1, 2, 3]);
  });

  it("return empty when the client returns unexpected data", async () => {
    const client = {
      get: sinon.stub().resolves({
        unexpected: [1, 2, 3]
      })
    };
    const repository = contentRepository(client);

    const result = await repository.faqs();

    expect(result).to.eql([]);
  });

  it("return empty when the client errors", async () => {
    const client = {
      get: sinon.stub().rejects("foo")
    };
    const repository = contentRepository(client);

    const result = await repository.faqs();

    expect(result).to.eql([]);
  });
});
