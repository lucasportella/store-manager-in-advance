const salesService = require('../services/salesService');
const { created, ok } = require('../utils/statusCodes');

const createSale = async (req, res) => {
  const result = await salesService.createSale(req.body);
  return res.status(ok).json(result);
};

const getAllSales = async (req, res) => {
  const result = await salesService.getAllSales();
  return res.status(ok).json(result);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.getSaleById(id);
  return res.status(ok).json(result);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
