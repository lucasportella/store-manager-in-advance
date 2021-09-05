const productsModel = require('../models/productsModel');

const createProduct = async (name, quantity) => {
  const result = await productsModel.createProduct(name, quantity);
  return result;
};

const findName = async (name) => {
  const result = await productsModel.findName(name);
  return result;
};

const getAll = async () => {
  const result = await productsModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  return result;
};

module.exports = {
  createProduct,
  findName,
  getAll,
  getById,
};
