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

module.exports = {
  listAll,
  listById,
};
