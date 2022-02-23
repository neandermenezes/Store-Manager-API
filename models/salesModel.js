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

module.exports = {
  listAll,
  listById,
};
