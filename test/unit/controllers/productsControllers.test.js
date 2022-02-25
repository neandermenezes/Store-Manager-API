const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../../controllers/productsController');
const productsService = require ('../../../services/productsService');

describe('Tests listAll controller', () => {
  const response = {};
  const request = {};
  let next = () => {};

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });

  it('Returns a json with all products', async () => {
    const products =   [
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
    ];

    sinon.stub(productsService, 'listAll').resolves(products);

    await productsController.listAll(request, response, next);

    expect(response.status.calledWith(200)).to.be.true;
    expect(response.json.calledWith(products)).to.be.true;

    productsService.listAll.restore();
  });
});

describe('tests listById controller cases', () => {
  const response = {};
  const request = { params: { id: 1 }};
  let next = () => {};

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });

  it('Product is found', async () => {
    const product = {
      id: 1,
      name: "produto A",
      quantity: 10
    }

    sinon.stub(productsService, 'listById').returns(product);

    await productsController.listById(request, response, next);

    expect(response.status.calledWith(200)).to.be.true;
    expect(response.json.calledWith(product)).to.be.true;

    productsService.listById.restore();
  });

  it('Product is not found', async () => {
    const message = { message: 'Product not found' }
    sinon.stub(productsService, 'listById').returns(undefined);

    await productsController.listById(request, response, next);

    expect(response.status.calledWith(404)).to.be.true;
    expect(response.json.calledWith(message)).to.be.true;

    productsService.listById.restore();
  });
});


describe('Tests create controller cases', () => {
  const response = {};
  const request = { body: { name: "produto", quantity: 10 }};
  let next = () => {};

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });

  it('Creates a new item', async () => {
    const productCreated = { id: 1, name: "produto", quantity: 10 };

    sinon.stub(productsService, 'create').returns(productCreated);

    await productsController.create(request, response, next);

    expect(response.status.calledWith(201)).to.be.true;
    expect(response.json.calledWith(productCreated)).to.be.true;

    productsService.create.restore();
  });

  it('Fails to create new item', async () => {
    const message = { message: 'Product already exists' };

    sinon.stub(productsService, 'create').returns(false);

    await productsController.create(request, response, next);

    expect(response.status.calledWith(409)).to.be.true;
    expect(response.json.calledWith(message)).to.be.true;

    productsService.create.restore();
  });
});

describe('Tests update controller cases', () => {
  const response = {};
  const request = { body: { name: "produto", quantity: 10 }, params: { id: 1 }};
  let next = () => {};

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });

  it('Updates a product', async () => {
    const updatedProduct = { id: 1, name: "produto", quantity: 10 };

    sinon.stub(productsService, 'update').returns(updatedProduct);

    await productsController.update(request, response, next);

    expect(response.status.calledWith(200)).to.be.true;
    expect(response.json.calledWith(updatedProduct)).to.be.true;

    productsService.update.restore();
  });

  it('Fails to update a product', async () => {
    const message = { message: 'Product not found' };

    sinon.stub(productsService, 'update').returns(false);

    await productsController.update(request, response, next);

    expect(response.status.calledWith(404)).to.be.true;
    expect(response.json.calledWith(message)).to.be.true;

    productsService.update.restore();
  });
});

describe('Tests exclude controller cases', () => {
  const response = {};
  const request = { params: { id: 1 }};
  let next = () => {};

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });

  it('Deletes a product', async () => {
    sinon.stub(productsService, 'exclude').returns(true);

    await productsController.exclude(request, response, next);

    expect(response.status.calledWith(204));

    productsService.exclude.restore();
  });

  it('Fails to delete a product', async () => {
    const message = { message: 'Product not found' }

    sinon.stub(productsService, 'exclude').returns(false);

    await productsController.exclude(request, response, next);

    expect(response.status.calledWith(404)).to.be.true;
    expect(response.json.calledWith(message)).to.be.true;

    productsService.exclude.restore();
  });
});
