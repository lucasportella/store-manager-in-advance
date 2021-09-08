const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const productsModel = require('../../models/productsModel');

describe('test model layer', () => {
  before( async () => {
    const DBserver = new MongoMemoryServer();
    const URLMock = await DBserver.getUri();

    const connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    after(() => {
      MongoClient.connect.restore();
    });

  });
  
  describe('Create new Product', () => {
    const payloadProduct = {
      'name': 'tomatoes',
      'quantity': 200
    };
  
    describe('When creation is successful', () => {
  
      it('have _id property', async () => {
        const response = await productsModel
          .createProduct(payloadProduct.name, payloadProduct.quantity);
        expect(response).to.have.all.keys('_id', 'name', 'quantity');
      });
  
    });
  
  });
});