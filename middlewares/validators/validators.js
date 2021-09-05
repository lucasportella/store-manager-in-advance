const Joi = require('@hapi/joi');
const minNameLength = 5;
const minIdLength = 24;

const checkCreateProductInput = (name, quantity) => 
  Joi.object({
    name: Joi.string().not().empty().min(minNameLength).required(),
    quantity: Joi.number().min(1).not().empty().required()
  }).validate({name, quantity});

const checkProductIdInput = (id) => Joi.object({
  id:Joi.string().not().empty().min(minIdLength).required()
}).validate({id});

module.exports = {
  checkCreateProductInput,
  checkProductIdInput,
};
