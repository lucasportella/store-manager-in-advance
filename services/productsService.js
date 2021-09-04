const productsModel = require('../models/productsModel');

const createProduct = async (name, quantity) => {
  const result = await productsModel.createProduct(name, quantity);
  return result;
};

const findName = async (name) => {
  const result = await productsModel.findName(name);
  return result;
};

module.exports = {
  createProduct,
  findName,
};
