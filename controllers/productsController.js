const productsService = require('../services/productsService');

const listAll = async (req, res, next) => {
  try {
    const products = await productsService.listAll();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const listById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await productsService.listById(id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { name, quantity } = req.body;

  try {
    const createdProduct = await productsService.create({ name, quantity });
    if (!createdProduct) {
      return res.status(409).json({ message: 'Product already exists' });
    }

    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    const updatedProduct = await productsService.update({ id, name, quantity });

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const exclude = async (req, res, next) => {
  const { id } = req.params;

  try {
    const validProduct = await productsService.exclude(id);

    if (!validProduct) return res.status(404).json({ message: 'Product not found' });

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listAll,
  listById,
  create,
  update,
  exclude,
};
