require('dotenv').config();
const express = require('express');
const routers = require('./middlewares/routes');
// const error = require('./middlewares/error');
// const productsController = require('./controllers/productsController');
// const salesController = require('./controllers/salesController');

const app = express();

app.use(express.json());

// app.use(error);

app.use('/products', routers.productsRouter);
app.use('/sales', routers.salesRouter);

// app.get('/products', productsController.listAll);
// app.get('./products/:id', productsController.listById);
// app.get('./sales', salesController.listAll);
// app.get('./sales/:id', salesController.listById);

app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
