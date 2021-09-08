const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient, ObjectId } = require('mongodb');
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
     
      it('returns a object', async () => {
        const response = await productsModel
          .createProduct(payloadProduct.name, payloadProduct.quantity);
        expect(response).to.be.a('object');
      });

      it('object has _id, name, quantity properties', async () => {
        const response = await productsModel
          .createProduct(payloadProduct.name, payloadProduct.quantity);
        expect(response).to.have.all.keys('_id', 'name', 'quantity');
      });
  
    });
  });

  describe('find name', () => {
    const name = 'tomatoes';
    describe('when name is found', () => {
      it('returns a object', async () => {
        const response = await productsModel.findName(name);
        expect(response).to.be.a('object');
      });
    });
  });

  describe('find all products', () => {
    describe('when at least one product is found', () => {
      it('returns an array', async () => {
        const response = await productsModel.getAll();
        expect(response).to.be.a('array');
      });
    });
  });

  describe('find product by id', () => {
    describe('when id is found', () => {
      const payloadProduct = {
        'name': 'steak',
        'quantity': 50
      };
      it('returns an object with it\'s proper keys', async () => {
        const { _id } = await productsModel
          .createProduct(payloadProduct.name, payloadProduct.quantity);
        const response = await productsModel.getById(_id);
        expect(response).to.be.a('object');
        expect(response).to.have.all.keys('_id', 'name', 'quantity');
      });
    });
    
  
    describe('when id is not found', () => {
      const id = '999999999999999999999999';
      it('returns null', async () => {
        const response = await productsModel.getById(id);
        expect(response).to.be.equal(null);
      });
    });

  });

  describe('update product', () => {
    describe('when update is successful', () => {
      const payloadProduct = {
        'name': 'rice',
        'quantity': 30
      };

      const payloadUpdate = {
        'name': 'rice',
        'quantity': 20,
      };

      it('returns object with it\'s properties', async () => {
        const { _id } = await productsModel
          .createProduct(payloadProduct.name, payloadProduct.quantity);
        const result = await productsModel
          .updateProduct(payloadUpdate.name, payloadUpdate.quantity, _id);
        expect(result).to.be.a('object');
        expect(result).to.have.all.keys('_id', 'name', 'quantity');
      });
    });
  });



});