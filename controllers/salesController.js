const salesService = require('../services/salesService');
const { created, ok } = require('../utils/statusCodes');

const createSale = async (req, res) => {
  const result = await salesService.createSale(req.body);
  return res.status(ok).json(result);
};

module.exports = {
  createSale,
};
