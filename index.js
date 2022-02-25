require('dotenv').config();
const express = require('express');
const routers = require('./middlewares/routes');

const app = express();

app.use(express.json());

app.use('/products', routers.productsRouter);
app.use('/sales', routers.salesRouter);

app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
