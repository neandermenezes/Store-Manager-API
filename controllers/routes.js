const express = require('express');
const productsController = require('./productsController');
const salesController = require('./salesController');

const productsRouter = express.Router();
const salesRouter = express.Router();

productsRouter.get('/', productsController.listAll);
productsRouter.get('/:id', productsController.listById);

salesRouter.get('/', salesController.listAll);
salesRouter.get('/:id', salesController.listById);

module.exports = {
  productsRouter,
  salesRouter,
};
