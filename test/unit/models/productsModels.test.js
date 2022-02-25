const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../models/connection");

const productsModel = require("../../../models/productsModel");

describe("Lists all products", () => {
  beforeEach(() => {
    const execute = [[]];

    sinon.stub(connection, "execute").resolves(execute);
  });

  afterEach(() => connection.execute.restore());

  describe("Returns all products", () => {
    const listAllResult = [
      {
        id: 1,
        name: "produto A",
        quantity: 10
      },
      {
        id: 2,
        name: "produto B",
        quantity: 20
      }
    ]
    beforeEach(() =>
      sinon.stub(productsModel, 'listAll').resolves(listAllResult)
    );

    afterEach(() => productsModel.listAll.restore());

    it('Returns an array of not empty objects, with all keys', async () => {
      const result = await productsModel.listAll();

      expect(result).to.be.eql(listAllResult);
    });
  });
});

describe("Lists a product by ID", () => {
  beforeEach(() => {
    const execute = [[]];

    sinon.stub(connection, "execute").resolves(execute);
  });

  afterEach(() => connection.execute.restore());

  describe("Product is found", () => {
    beforeEach(() =>
      sinon.stub(productsModel, "listById").resolves({
        id: 1,
        name: "produto A",
        quantity: 10,
      })
    );

    afterEach(() => productsModel.listById.restore());

    it('Returns a non empty object, with "id, name, quanity" keys', async () => {
      const response = await productsModel.listById(1);

      expect(response).to.be.an("object");
      expect(response).to.be.not.empty;
      expect(response).to.include.all.keys("id", "name", "quantity");
    });
  });

  describe("Product is not found", () => {
    it('Returns empty array', async () => {
      const response = await productsModel.listById();

      expect(response).to.be.eql([]);
    });
  });
});

describe("Creates a product", () => {
  const payloadProduct = { name: "produto", quantity: 10 };

  beforeEach(() => {
    const execute = [{ insertId: 1 }];

    sinon.stub(connection, 'execute').returns(execute);
  });

  afterEach(() => connection.execute.restore());

  describe("Successfully creates a product", () => {
    it('Returns boject with created product and id property', async () => {
      const result = await productsModel.create(payloadProduct);
      expect(result).to.be.an('object')
      expect(result).to.be.eql({ id: 1, name: "produto", quantity: 10 });
    });
  });
});

describe("Updates a certain product", () => {
  const payloadProduct = { id: 1, name: "produto", quantity: 15 };
  const affectedRows = [{ affectedRows: 1 }];

  beforeEach(() => {
    sinon.stub(connection, "execute").returns([affectedRows, []]);
  });

  afterEach(() => {
    connection.execute.restore();
  });

  it("Returns object with updated product info", async () => {
    const result = await productsModel.update(payloadProduct);

    expect(result).to.be.an('object');
    expect(result).to.be.eql(payloadProduct);
  });
});

describe("Deletes a certain product", () => {
  beforeEach(() => {
    const affectedRows = [{ affectedRows: 1 }];

    sinon.stub(connection, 'execute').returns(affectedRows);
  });

  afterEach(() => connection.execute.restore());

  it('Successfully deletes a product', async () => {
    const result = await productsModel.exclude(1);

    expect(result).to.be.undefined;
  })
});

describe("Updates a product quantity", () => {});
