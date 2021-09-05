const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => {
  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  const { _id } = result.ops[0];
  return { _id, name, quantity };
};

const findName = async (name) => {
  const db = await connection();
  const result = await db.collection('products').findOne({name});
  return result;
};

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('products').find().toArray();
  return result;
};

const getById = async (id) => {
  const db = await connection();
  const result = await db.collection('products').findOne(new ObjectId(id));
  console.log(result);
  return result;
};

const updateProduct = async (name, quantity, id) => {
  const db = await connection();
  const result = await db.collection('products')
    .updateOne({_id: ObjectId(id)}, {$set: {name, quantity}});
  const updatedProduct = await getById(id);
  return updatedProduct;
};


module.exports = {
  createProduct,
  findName,
  getAll,
  getById,
  updateProduct,
};
