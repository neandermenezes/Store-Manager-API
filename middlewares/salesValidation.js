const idValidation = async (req, res, next) => {
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ message: '"productId" is required' });

  next();
};

const quantityValidation = async (req, res, next) => {
  const { quantity } = req.body;
  if (!quantity || typeof quantity !== 'number') {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  idValidation,
  quantityValidation,
};
