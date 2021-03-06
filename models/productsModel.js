const connection = require('./connection');

const listAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id;';
  const [result] = await connection.execute(query);

  return result;
};

const listById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id;';
  const [result] = await connection.execute(query, [id]);

  return result;
};

const create = async (product) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);';
  const [result] = await connection.execute(query, [product.name, product.quantity]);

  return {
    id: result.insertId,
    ...product,
  };
};

const update = async (product) => {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;';
  await connection.execute(query, [product.name, product.quantity, product.id]);

  return product;
};

const exclude = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?;';
  await connection.execute(query, [id]);
};

const updateQuantity = async (id, quantity) => {
  const query = 'UPDATE StoreManager.products SET quantity = ? WHERE id = ?;';
  await connection.execute(query, [quantity, id]);
};

module.exports = {
  listAll,
  listById,
  create,
  update,
  exclude,
  updateQuantity,
};
