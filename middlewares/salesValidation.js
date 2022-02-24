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
  console.log(quantityData);
  const isMissingQuantity = quantityData.some((obj) => obj.quantity === undefined);
  if (isMissingQuantity) { return res.status(400).json({ message: '"quantity" is required' }); }

  const invalidQuantity = quantityData.some(({ quantity }) => quantity <= 0);
  if (invalidQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  idValidation,
  salesQuantityValidation,
};
