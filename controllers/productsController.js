const productsService = require('../services/productsService');
const {  ok, } = require('../utils/statusCodes');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productsService.createProduct(name, quantity);
  return res.status(ok).json(result);
};

module.exports = {
  createProduct,
};
