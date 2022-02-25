const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const sequelize = (product) => ({
  saleId: product.sale_id,
  date: product.date,
  productId: product.product_id,
  quantity: product.quantity,
});

const increaseProductQuantity = async (product) => {
  const quantity = await productsModel.listById(product.productId);
  const newQuantity = (quantity[0].quantity - product.quantity);

  await productsModel.updateQuantity(product.productId, newQuantity);
  return newQuantity;
};

const decreaseProductQuantity = async (product) => {
  const quantity = await productsModel.listById(product.product_id);
  const newQuantity = (quantity[0].quantity + product.quantity);

  await productsModel.updateQuantity(product.product_id, newQuantity);
};

const listAll = async () => {
  const sales = await salesModel.listAll();
  console.log(sales);
  const newSales = sales.map((sale) => sequelize(sale));
  console.log(newSales);
  return newSales;
};

const listById = async (id) => {
  const sale = await salesModel.listById(id);

  if (!sale || sale.length === 0) return false;

  const newSale = sale.map((sales) => sequelize(sales));
  return newSale;
};

const create = async (array) => {
  const sales = await salesModel.create(array);

  const { itemsSold } = sales;

  await Promise.all(itemsSold.map((item) => increaseProductQuantity(item)));

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
  const validSale = await listById(id);

  if (!validSale) return false;

  const sales = await salesModel.getSalesById(id);

  sales.forEach((sale) => decreaseProductQuantity(sale));

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
