const salesModel = require('../models/salesModel');

const sequelize = (product) => ({
  saleId: product.sale_id,
  date: product.date,
  productId: product.product_id,
  quantity: product.quantity,
});

const listAll = async () => {
  const sales = await salesModel.listAll();

  const newSales = sales.map((sale) => sequelize(sale));

  return newSales;
};

const listById = async (id) => {
  const sale = await salesModel.listById(id);

  if (sale.length === 0) return false;

  const newSale = sale.map((sales) => sequelize(sales));
  return newSale;
};

const create = async (array) => {
  const sales = await salesModel.create(array);

  return sales;
};

const update = async (object) => {
  const updatedSale = await salesModel.update(object);
  const { id, productId, quantity } = updatedSale;

  return {
    saleId: id,
    itemUpdated: [
      {
        productId,
        quantity,
      },
    ],
  };
};

const exclude = async (id) => {
  const validProduct = await listById(id);

  if (!validProduct) return false;

  await salesModel.exclude(id);
  return true;
};

module.exports = {
  listAll,
  listById,
  create,
  update,
  exclude,
};
