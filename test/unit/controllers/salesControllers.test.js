const sinon = require('sinon');
const { expect } = require('chai');

const salesController = require('../../../controllers/salesController');
const salesService = require ('../../../services/salesService');

describe('Tests listAll controller', () => {
  const response = {};
  const request = {};
  let next = () => {};

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });

  it('Returns a json with all sales', async () => {
    const sales = [
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

    sinon.stub(salesService, 'listAll').resolves(sales);

    await salesController.listAll(request, response, next);

    expect(response.status.calledWith(200)).to.be.true;
    expect(response.json.calledWith(sales)).to.be.true;

    salesService.listAll.restore();
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

  it('Sale is found', async () => {
    const sale =   {
      id: 1,
      name: "produto A",
      quantity: 10
    }

    sinon.stub(salesService, 'listById').returns(sale);

    await salesController.listById(request, response, next);

    expect(response.status.calledWith(200)).to.be.true;
    expect(response.json.calledWith(sale)).to.be.true;

    salesService.listById.restore();
  });

  it('Sale is not found', async () => {
    const message = { message: 'Sale not found' }
    sinon.stub(salesService, 'listById').returns(undefined);

    await salesController.listById(request, response, next);

    expect(response.status.calledWith(404)).to.be.true;
    expect(response.json.calledWith(message)).to.be.true;

    salesService.listById.restore();
  });
});


describe('Tests create controller cases', () => {
  const response = {};
  const request =   [
    {
      productId: 1,
      quantity: 2
    },
    {
      productId: 2,
      quantity: 5
    }
  ];
  let next = () => {};

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });

  it('Creates a new sale', async () => {
    const saleCreated =   {
      id: 1,
      itemsSold: [
        {
          productId: 1,
          quantity: 2
        },
        {
          productId: 2,
          quantity: 5
        }
      ]
    };

    sinon.stub(salesService, 'create').returns(saleCreated);

    await salesController.create(request, response, next);

    expect(response.status.calledWith(201)).to.be.true;
    expect(response.json.calledWith(saleCreated)).to.be.true;

    salesService.create.restore();
  });
});

describe('Tests update controller cases', () => {
  const response = {};
  const request = {
    body: [
      {
        productId: 1,
        quantity: 6
      }
    ],
    params: { id: 1 }
  };
  let next = () => {};

  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  });

  it('Updates a sale', async () => {
    const updatedSale =   {
      saleId: 1,
      itemUpdated: [
        {
          productId: 1,
          quantity: 6
        }
      ]
    };

    sinon.stub(salesService, 'update').returns(updatedSale);

    await salesController.update(request, response, next);

    expect(response.status.calledWith(200)).to.be.true;
    expect(response.json.calledWith(updatedSale)).to.be.true;

    salesService.update.restore();
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
    sinon.stub(salesService, 'exclude').returns(true);

    await salesController.exclude(request, response, next);

    expect(response.status.calledWith(204));

    salesService.exclude.restore();
  });

  it('Fails to delete a product', async () => {
    const message = { message: 'Sale not found' }

    sinon.stub(salesService, 'exclude').returns(false);

    await salesController.exclude(request, response, next);

    expect(response.status.calledWith(404)).to.be.true;
    expect(response.json.calledWith(message)).to.be.true;

    salesService.exclude.restore();
  });
});
