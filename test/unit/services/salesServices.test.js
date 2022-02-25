

const { expect } = require("chai");
const sinon = require("sinon");
const connection = require('../../../models/connection');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');


describe('Tests list All service', () => {
  beforeEach(() => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  afterEach(() => connection.execute.restore());

  it('List all service returns all sales', async () => {
    const listAllResult =   [
      {
        sale_id: 1,
        date: "2021-09-09T04:54:29.000Z",
        product_id: 1,
        quantity: 2
      },
      {
        saleId: 1,
        date: "2021-09-09T04:54:54.000Z",
        product_id: 2,
        quantity: 2
      }
    ]

    sinon.stub(salesModel, 'listAll').returns(listAllResult);

    const response = await salesService.listAll();

    expect(response).to.be.an('array');

    salesModel.listAll.restore();
  });
});

describe('List by Id cases test', () => {
  beforeEach(() => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  afterEach(() => connection.execute.restore());

  it('returns product when the sale is found', async () => {
    const sale = [
      {
        date: "2021-09-09T04:54:29.000Z",
        product_id: 1,
        quantity: 2
      },
      {
        date: "2021-09-09T04:54:54.000Z",
        product_id: 2,
        quantity: 2
      }
    ]

    sinon.stub(salesModel, 'listById').returns(sale);

    const result = await salesService.listById(1);

    expect(result).to.be.an('array');

    salesModel.listById.restore();
  });

  it('returns false when sale is not found', async () => {
    const product = [];

    sinon.stub(salesModel, 'listById').returns(product);

    const result = await salesService.listById(1);

    expect(result).to.be.false;

    salesModel.listById.restore();
  });
});

// describe('Tests create service cases', () => {
//   beforeEach(() => {
//     const execute = [[]];

//     sinon.stub(connection, 'execute').resolves(execute);
//   });

//   afterEach(() => connection.execute.restore());

//   it('Successfully creates sale', async () => {
//     const payloadSale = [{productId: 1, quantity: 3}];
//     const returnSale = { id: 1, itemsSold: [{ productId: 1, quantity: 3 }]};

//     sinon.stub(salesModel, 'create').returns(returnSale);

//     const result = await salesService.create(returnSale);

//     expect(result).to.be.eql(returnSale);

//     salesModel.create.restore();
//   });

//   it('Fails to create sale because it already existes', async () => {
//     const payloadProduct = { name: "produto", quantity: 10 };

//     sinon.stub(productsService, 'create').returns(false);

//     const result = await productsService.create(payloadProduct);

//     expect(result).to.be.false;
//   });
// });

describe('Tests update service cases', () => {
  beforeEach(() => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  afterEach(() => connection.execute.restore());

  it('Successfully updates sale', async () => {
    const payloadSale = {productId: 1, quantity: 6};

    sinon.stub(salesModel, 'update').returns(payloadSale);

    const result = await salesService.update(payloadSale);

    expect(result).to.be.an('object');

    salesModel.update.restore();
  });

  // it('Fails to update sale because it doesnt exist', async () => {
  //   const payloadProduct = { id: 1, name: "produto", quantity: 15 };

  //   sinon.stub(productsService, 'update').returns(false);

  //   const result = await productsService.update(payloadProduct);

  //   expect(result).to.be.false;

  //   productsService.update.restore();
  // });
});

// describe('Tests exclude service cases', () => {
//   beforeEach(() => {
//     const execute = [[]];

//     sinon.stub(connection, 'execute').resolves(execute);
//   });

//   afterEach(() => connection.execute.restore());

//   it('Successfully deletes a sale', async () => {
//     sinon.stub(productsModel, 'listById').resolves([1, 2, 3]);

//     const result = await productsService.exclude(1);

//     expect(result).to.be.true;

//     productsModel.listById.restore();
//   });

//   it('Fails to delete a sale because it doesnt exist', async () => {
//     const result = await productsService.exclude();

//     expect(result).to.be.false;
//   });
// });
