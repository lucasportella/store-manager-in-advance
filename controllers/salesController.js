const salesService = require('../services/salesService');
const { created, ok } = require('../utils/statusCodes');

const createMany = async (req, res) => {
  const result = await salesService.createMany(req.body);
  return res.status(ok).json(result);
};

module.exports = {
  createMany,
};
