const salesModel = require('../models/salesModel');

const createSale = async (salesArray) => {
  const result = await salesModel.createSale(salesArray);
  const createdSale = {'_id': result.ops[0]._id, 'itensSold': result.ops[0].itensSold};
  return createdSale;
};

module.exports = {
    createSale,
};
