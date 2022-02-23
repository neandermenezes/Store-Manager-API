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

module.exports = {
  listAll,
  listById,
  create,
};
