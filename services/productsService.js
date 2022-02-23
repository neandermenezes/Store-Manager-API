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

const create = async (product) => {
  const allProducts = await listAll();
  const repeatedName = allProducts.some(({ name }) => name === product.name);
  if (repeatedName) return false;

  const createdProduct = await productsModel.create(product);
  return createdProduct;
};

const update = async (product) => {
  const validProduct = await listById(product.id);

  if (!validProduct) return false;

  const updatedProduct = await productsModel.update(product);

  return updatedProduct;
};

module.exports = {
  listAll,
  listById,
  create,
  update,
};
