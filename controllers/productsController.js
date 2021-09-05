const productsService = require('../services/productsService');
const { created, ok } = require('../utils/statusCodes');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productsService.createProduct(name, quantity);
  return res.status(created).json(result);
};

const getAll = async (req, res) => {
  const result = await productsService.getAll();
  return res.status(ok).json({products: result});
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getById(id);
  return res.status(ok).json(result);
};

module.exports = {
  createProduct,
  getAll,
  getById,
};
