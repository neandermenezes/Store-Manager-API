const express = require('express');

const productsValidation = require('../middlewares/productsValidation');

const { nameValidation, quantityValidation } = productsValidation;

const productsController = require('./productsController');
const salesController = require('./salesController');

const productsRouter = express.Router();
const salesRouter = express.Router();

productsRouter.get('/', productsController.listAll);
productsRouter.get('/:id', productsController.listById);
productsRouter.post('/', nameValidation, quantityValidation, productsController.create);
productsRouter.put('/:id', nameValidation, quantityValidation, productsController.update);

salesRouter.get('/', salesController.listAll);
salesRouter.get('/:id', salesController.listById);

module.exports = {
  productsRouter,
  salesRouter,
};
