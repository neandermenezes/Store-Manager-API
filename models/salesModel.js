const connection = require('./connection');

const listAll = async () => {
  const query = `SELECT sp.*, s.date
  FROM StoreManager.sales_products as sp
  JOIN StoreManager.sales as s WHERE sp.sale_id = s.id
  ORDER BY sp.sale_id, sp.product_id;`;
  const [result] = await connection.execute(query);

  return result;
};

const listById = async (id) => {
  const query = `SELECT sp.product_id, sp.quantity, s.date
  FROM StoreManager.sales_products as sp
  JOIN StoreManager.sales as s WHERE sp.sale_id = s.id AND sp.sale_id = ?
  ORDER BY sp.sale_id, sp.product_id;`;
  const [result] = await connection.execute(query, [id]);

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

module.exports = {
  listAll,
  listById,
  create,
};
