const express = require('express');

const productsValidation = require('../middlewares/productsValidation');
const salesValidation = require('../middlewares/salesValidation');

const { nameValidation, quantityValidation } = productsValidation;
const { idValidation, salesQuantityValidation, quantityAvailableValidation } = salesValidation;

const productsController = require('./productsController');
const salesController = require('./salesController');

const productsRouter = express.Router();
const salesRouter = express.Router();

productsRouter.get('/', productsController.listAll);
productsRouter.get('/:id', productsController.listById);
productsRouter.post(
  '/',
  nameValidation,
  quantityValidation,
  productsController.create,
);
productsRouter.put(
  '/:id',
  nameValidation,
  quantityValidation,
  productsController.update,
);
productsRouter.delete('/:id', productsController.exclude);

salesRouter.get('/', salesController.listAll);
salesRouter.get('/:id', salesController.listById);
salesRouter.post(
  '/',
  idValidation,
  salesQuantityValidation,
  quantityAvailableValidation,
  salesController.create,
);
salesRouter.put(
  '/:id',
  idValidation,
  salesQuantityValidation,
  salesController.update,
);
salesRouter.delete('/:id', salesController.exclude);

module.exports = {
  productsRouter,
  salesRouter,
};
