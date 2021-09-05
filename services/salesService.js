const salesModel = require('../models/salesModel');

const createMany = async (salesArray) => {
  const result = await salesModel.createMany(salesArray);
  const createdSale = {'_id': result.ops[0]._id, 'itensSold': result.ops[0].itensSold};
  return createdSale;
};

module.exports = {
  createMany,
};
