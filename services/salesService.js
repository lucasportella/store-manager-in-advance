const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const checkStock = async (salesArray) => {
  const stockLimit = 0;
  const zero = 0;

  for (let index = zero; index < salesArray.length; index++) {
    const productOrder = salesArray[index];
    const currentProduct = await productsModel.getById(productOrder.productId);
    if ((currentProduct.quantity - productOrder.quantity) < stockLimit)
      return {error: { message: 'Such amount is not permitted to sell'}};
  }

  return {};
};

const createSale = async (salesArray) => {
  const checkStockResult = await checkStock(salesArray);
  if (checkStockResult.error) {
    return checkStockResult;
  }
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

const updateSale = async (id, productId, quantity) => {
  const updatedSale = await salesModel.updateSale(id, productId, quantity);
  return updatedSale;
};

const deleteSale = async (id) => {
  const deletedData = await salesModel.deleteSale(id);
  return deletedData;
};


module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
