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
  await db.collection('products')
    .updateOne({_id: ObjectId(id)}, {$set: {name, quantity}});
  const updatedProduct = await getById(id);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const db = await connection();
  const deletedData = await getById(id);
  await db.collection('products').deleteOne({_id: ObjectId(id)});
  return deletedData;
};

const updateQuantityAfterCreate = async (createdSale) => {
  const saleArray = createdSale.ops[0].itensSold;
  await saleArray.forEach( async (product) => {
    const outDatedProduct = await getById(product.productId);
    const updatedQuantity = outDatedProduct.quantity - product.quantity;
    await updateProduct(outDatedProduct.name, updatedQuantity, outDatedProduct._id);
  });
};

const updateQuantityAfterDelete = async (deletedSale) => {
  const { _id, itensSold } = deletedSale;
  await itensSold.forEach(async (product) => {
    const outDatedProduct = await getById(product.productId);
    const updatedQuantity = outDatedProduct.quantity + product.quantity;
    await updateProduct(outDatedProduct.name, updatedQuantity, outDatedProduct._id);
  });

  // { _id: 613616ebcdcefa3803d75339, name: 'biscoito', quantity: 10 }

  // {
  //   _id: 61362e64e22428449aac24d1,
  //   itensSold: [
  //     { productId: '613616ebcdcefa3803d75339', quantity: 2 },
  //     { productId: '61361702cdcefa3803d7533a', quantity: 1 }
  //   ]
  // }

};

module.exports = {
  createProduct,
  findName,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
  updateQuantityAfterCreate,
  updateQuantityAfterDelete,
};
