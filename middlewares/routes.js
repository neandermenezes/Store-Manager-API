const express = require('express');

const productsValidation = require('./productsValidation');
const salesValidation = require('./salesValidation');
const error = require('./error');

const { nameValidation, quantityValidation } = productsValidation;
const { idValidation, salesQuantityValidation, quantityAvailableValidation } = salesValidation;

const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');

const productsRouter = express.Router();
const salesRouter = express.Router();

productsRouter.get('/', productsController.listAll, error);
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
