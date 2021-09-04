const productsService = require('../services/productsService');
const { created } = require('../utils/statusCodes');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productsService.createProduct(name, quantity);
  return res.status(created).json(result);
};

module.exports = {
  createProduct,
};
