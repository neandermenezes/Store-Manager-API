module.exports = (err, req, res) => {
  console.error(err.message);
  res.status(500).end();
};
