const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../models/connection");

const salesModel = require("../../../models/salesModel");

describe("Lists all sales", () => {
  beforeEach(() => {
    const execute = [[]];

    sinon.stub(connection, "execute").resolves(execute);
  });

  afterEach(() => connection.execute.restore());

  describe("Returns all sales", () => {
    const listAllResult =   [
      {
        saleId: 1,
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2
      }
    ]

    beforeEach(() =>
      sinon.stub(salesModel, 'listAll').resolves(listAllResult)
    );

    afterEach(() => salesModel.listAll.restore());

    it('Returns an array of not empty objects, with all keys', async () => {
      const result = await salesModel.listAll();

      expect(result).to.be.an('array');
      expect(result).to.be.eql(listAllResult);
    });
  });
});

describe("Sale is found", () => {
  beforeEach(() =>
    sinon.stub(salesModel, "listById").resolves([
      {
        date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2
      },
      {
        date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 2
      }
    ])
  );

  afterEach(() => salesModel.listById.restore());

  it('Returns a non empty object, with "id, name, quanity" keys', async () => {
    const response = await salesModel.listById(1);

    expect(response).to.be.an("array");
    expect(response).to.be.not.empty;
    expect(response[0]).to.include.all.keys("date", "productId", "quantity");
  });
});

describe("Creates a sale", () => {
  const payloadSale = [{productId: 1, quantity: 3}];
  const returnSale = { id: 1, itemsSold: [{ productId: 1, quantity: 3 }]};

  beforeEach(() => {
    const execute = [{ insertId: 1 }];

    sinon.stub(connection, 'execute').returns(execute);
  });

  afterEach(() => connection.execute.restore());

  describe("Successfully creates a sale", () => {
    it('Returns object with created sale and id property', async () => {
      const result = await salesModel.create(payloadSale);
      expect(result).to.be.an('object')
      expect(result).to.be.eql(returnSale);
    });
  });
});

describe("Updates a certain sale", () => {
  const payloadSale = {productId: 1, quantity: 6};

  const affectedRows = [{ affectedRows: 1 }];

  beforeEach(() => {
    sinon.stub(connection, "execute").returns([affectedRows, []]);
  });

  afterEach(() => {
    connection.execute.restore();
  });

  it("Returns object with updated sale info", async () => {
    const result = await salesModel.update(payloadSale);

    expect(result).to.be.an('object');
    expect(result).to.be.eql(payloadSale);
  });
});

describe("Deletes a certain sale", () => {
  beforeEach(() => {
    const affectedRows = [{ affectedRows: 1 }];

    sinon.stub(connection, 'execute').returns(affectedRows);
  });

  afterEach(() => connection.execute.restore());

  it('Successfully deletes a sale', async () => {
    const result = await salesModel.exclude(1);

    expect(result).to.be.undefined;
  })
});
