const connection = require('./connection');
const { ObjectId } = require('mongodb');
const connect = require('mongodb');

const createSale = async (salesArray) => {
  const db = await connection();
  const result = await db.collection('sales').insertOne({'itensSold': salesArray});
  return result;
};

const getAllSales = async () => {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  return result;
};

module.exports = {
  createSale,
  getAllSales,
};