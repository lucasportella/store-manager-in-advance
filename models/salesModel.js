const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (salesArray) => {
  const db = await connection();
  const result = await db.collection('sales').insertOne({'itensSold': salesArray});
  return result;
};

module.exports = {
  createSale,
};