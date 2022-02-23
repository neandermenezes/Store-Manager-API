const idValidation = async (req, res, next) => {
  const idData = req.body;
  const isInvalid = idData.some((obj) => obj.productId === undefined);
  if (isInvalid) { return res.status(400).json({ message: '"productId" is required' }); }

  next();
};

const salesQuantityValidation = async (req, res, next) => {
  const quantityData = req.body;

  const quantityNotInformed = quantityData.some(
    ({ quantity }) => quantity !== undefined && typeof quantity !== 'number',
  );

  const quantityInvalid = quantityData.some(({ quantity }) => quantity <= 0);

  if (quantityNotInformed) { return res.status(400).json({ message: '"quantity" is required' }); }
  if (quantityInvalid) {
 return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
}

  next();
};

module.exports = {
  idValidation,
  salesQuantityValidation,
};
