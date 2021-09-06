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

const getSaleById = async (id) => {
  const db = await connection();
  const result = await db.collection('sales').findOne(new ObjectId(id));
  return result;
};

const updateSale = async (id, productId, quantity) => {
  const db = await connection();;
  await db.collection('sales')
    .updateOne(
      {_id: ObjectId(id)},
      {$set: { 'itensSold.$[element].quantity': quantity}},
      {arrayFilters: [ {'element.productId': productId}]}
    );
  const updatedSale = await getSaleById(id);
  return updatedSale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
};