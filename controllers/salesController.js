const salesService = require('../services/salesService');

const listAll = async (req, res, next) => {
  try {
    const sales = await salesService.listAll();

    res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const listById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const sale = await salesService.listById(id);

    if (!sale) return res.status(404).json({ message: 'Sale not found' });

    return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const data = req.body;

  try {
    const sales = await salesService.create(data);

    return res.status(201).json(sales);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;
  const { productId, quantity } = data[0];

  try {
    const updatedProduct = await salesService.update({ id: Number(id), productId, quantity });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const exclude = async (req, res, next) => {
  const { id } = req.params;

  try {
    const validSale = await salesService.exclude(id);

    if (!validSale) return res.status(404).json({ message: 'Sale not found' });

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
