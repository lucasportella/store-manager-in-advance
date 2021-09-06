const salesModel = require('../models/salesModel');

const createSale = async (salesArray) => {
  const result = await salesModel.createSale(salesArray);
  const createdSale = {'_id': result.ops[0]._id, 'itensSold': result.ops[0].itensSold};
  return createdSale;
};

const getAllSales = async () => {
  const result = await salesModel.getAllSales();
  return {'sales': result};
};

const getSaleById = async (id) => {
  const result = await salesModel.getSaleById(id);
  return result;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
