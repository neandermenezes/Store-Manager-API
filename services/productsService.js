const productsModel = require('../models/productsModel');

const listAll = async () => {
  const products = await productsModel.listAll();

  return products;
};

const listById = async (id) => {
  const product = await productsModel.listById(id);

  if (product.length === 0) return false;

  return product[0];
};

module.exports = {
  listAll,
  listById,
};
