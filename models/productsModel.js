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

module.exports = {
  listAll,
  listById,
};
