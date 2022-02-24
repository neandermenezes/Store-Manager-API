const productsModel = require('../models/productsModel');

const idValidation = async (req, res, next) => {
  const idData = req.body;
  const isInvalid = idData.some((obj) => obj.productId === undefined);
  if (isInvalid) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};

const salesQuantityValidation = async (req, res, next) => {
  const quantityData = req.body;

  const isMissingQuantity = quantityData.some((obj) => obj.quantity === undefined);
  if (isMissingQuantity) { return res.status(400).json({ message: '"quantity" is required' }); }

  const invalidQuantity = quantityData.some(({ quantity }) => quantity <= 0);
  if (invalidQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const quantityAvailableValidation = async (req, res, next) => {
  const { quantity, productId } = req.body[0];

  const availableQuantity = await productsModel.listById(productId);

  if (availableQuantity[0].quantity - quantity < 0) {
    return res.status(422).json({ message: 'Such amount is not permitted to sell' });
  }

  next();
};

module.exports = {
  idValidation,
  salesQuantityValidation,
  quantityAvailableValidation,
};
