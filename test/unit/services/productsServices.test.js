const { expect } = require("chai");
const sinon = require("sinon");
const connection = require('../../../models/connection');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');


describe('Tests list All service', () => {
  beforeEach(() => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  afterEach(() => connection.execute.restore());

  it('List all service returns all products', async () => {
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

    sinon.stub(productsModel, 'listAll').returns(listAllResult);

    const response = await productsService.listAll();

    expect(response).to.be.eql(listAllResult);

    productsModel.listAll.restore();
  });
});

describe('List by Id cases test', () => {
  beforeEach(() => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  afterEach(() => connection.execute.restore());

  it('returns product when the product is found', async () => {
    const product = [{
      id: 1,
      name: "produto A",
      quantity: 10,
    }]

    sinon.stub(productsModel, 'listById').returns(product);

    const result = await productsService.listById(1);

    expect(result).to.be.eql(product[0]);

    productsModel.listById.restore();
  });

  it('returns false when product is not found', async () => {
    const product = [];

    sinon.stub(productsModel, 'listById').returns(product);

    const result = await productsService.listById(1);

    expect(result).to.be.false;

    productsModel.listById.restore();
  });
});

describe('Tests create service cases', () => {
  beforeEach(() => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  afterEach(() => connection.execute.restore());

  it('Successfully creates product', async () => {
    const payloadProduct = { name: "produto", quantity: 10 };
    const product = { id: 1, name: "produto", quantity: 10 };

    sinon.stub(productsService, 'listAll').returns(false);
    sinon.stub(productsModel, 'create').returns(product);

    const result = await productsService.create(payloadProduct);

    expect(result).to.be.eql(product);

    productsService.listAll.restore();
    productsModel.create.restore();
  });

  it('Fails to create product because it already existes', async () => {
    const payloadProduct = { name: "produto", quantity: 10 };

    sinon.stub(productsService, 'create').returns(false);

    const result = await productsService.create(payloadProduct);

    expect(result).to.be.false;

    productsService.create.restore();
  });
});

describe('Tests update service cases', () => {
  beforeEach(() => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  afterEach(() => connection.execute.restore());

  it('Successfully updates product', async () => {
    const payloadProduct = { id: 1, name: "produto", quantity: 15 };

    sinon.stub(productsModel, 'listById').resolves([1, 2, 3]);
    sinon.stub(productsModel, 'update').returns(payloadProduct);

    const result = await productsService.update(payloadProduct);

    expect(result).to.be.eql(payloadProduct);

    productsModel.listById.restore();
    productsModel.update.restore();
  });

  it('Fails to update product because it doesnt exist', async () => {
    const payloadProduct = { id: 1, name: "produto", quantity: 15 };

    sinon.stub(productsService, 'update').returns(false);

    const result = await productsService.update(payloadProduct);

    expect(result).to.be.false;

    productsService.update.restore();
  });
});

describe('Tests exclude service cases', () => {
  beforeEach(() => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  afterEach(() => connection.execute.restore());

  it('Successfully deletes a product', async () => {
    sinon.stub(productsModel, 'listById').resolves([1, 2, 3]);

    const result = await productsService.exclude(1);

    expect(result).to.be.true;

    productsModel.listById.restore();
  });

  it('Fails to delete a product because it doesnt exist', async () => {
    const result = await productsService.exclude();

    expect(result).to.be.false;
  });
});
