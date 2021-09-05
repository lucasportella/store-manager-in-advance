const validators = require('./validators/validators');
const productsService = require('../services/productsService');

const checkCreateProductInput = async (req, res, next ) => {
  const { name, quantity } = req.body;
  const checkResult = validators.checkCreateProductInput(name, quantity);
  if (checkResult.error) { next(checkResult.error);}
  next();
};

const checkRepeatedName = async (req, res, next) => {
  const { name } = req.body;
  const checkResult = await productsService.findName(name);
  if (checkResult) { next({isRepeatedName: true, message: 'Product already exists'});}
  next();
};

const checkId = async ( req, res, next) => {
  const { id } = req.params;
  const validateResult = validators.checkProductIdInput(id);
  if (validateResult.error) { 
    next({isInvalidId: true, message: 'Wrong id format'}); return null;}

  const checkResult = await productsService.getById(id);
  if (!checkResult) { next({isInvalidId: true, message: 'Wrong id format'});}
  next();
};

const checkSale =  async ( req, res, next) => {
  const saleArray = req.body;
  const result = saleArray.every((sale) => validators.checkSaleQuantity(sale.quantity));
  if (!result) { next({})}
  return result;
};

module.exports = {
  checkCreateProductInput,
  checkRepeatedName,
  checkId,
  checkSale,
};