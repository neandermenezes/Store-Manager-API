const connection = require('./connection');

const listAll = async () => {
  const query = `SELECT sp.*, s.date
  FROM StoreManager.sales_products as sp
  JOIN StoreManager.sales as s WHERE sp.sale_id = s.id
  ORDER BY sp.sale_id, sp.product_id;`;
  const [result] = await connection.execute(query);

  return result;
};

const listById = async (saleId) => {
  const query = `SELECT sp.product_id, sp.quantity, s.date
  FROM StoreManager.sales_products as sp
  JOIN StoreManager.sales as s WHERE sp.sale_id = s.id AND sp.sale_id = ?
  ORDER BY sp.sale_id, sp.product_id;`;
  const [result] = await connection.execute(query, [saleId]);

  return result;
};

const create = async (sales) => {
  const querySales = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [resultId] = await connection.execute(querySales);

  const id = resultId.insertId;

  const querySalesProducts = `INSERT INTO StoreManager.sales_products
  (sale_id, product_id, quantity) VALUES (?, ?, ?);`;

  await connection.execute(querySalesProducts, [id, sales[0].productId, sales[0].quantity]);

  return {
    id,
    itemsSold: [...sales],
  };
};

const update = async (updatedSale) => {
  const query = `UPDATE StoreManager.sales_products
  SET quantity = ? WHERE sale_id = ? AND product_id = ?;`;
  await connection.execute(query, [updatedSale.quantity, updatedSale.id, updatedSale.productId]);

  return updatedSale;
};

const exclude = async (saleId) => {
  const querySaleProducts = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?;';
  await connection.execute(querySaleProducts, [saleId]);

  const querySale = 'DELETE FROM StoreManager.sales WHERE id = ?;';
  await connection.execute(querySale, [saleId]);
};

module.exports = {
  listAll,
  listById,
  create,
  update,
  exclude,
};
