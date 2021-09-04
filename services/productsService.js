const productsModel = require('../models/productsModel');

const createProduct = async (name, quantity) => {
  const result = await productsModel.createProduct(name, quantity);
  return result;
};

module.exports = {
  createProduct,
};
