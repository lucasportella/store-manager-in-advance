const Joi = require('joi');
const minLength = 5;

const checkCreateProductInput = (name, quantity) => 
  Joi.object({
    name: Joi.string().not().empty().min(minLength).required(),
    quantity: Joi.number().min(1).not().empty().required()
  }).validate({name, quantity});


module.exports = {
  checkCreateProductInput,
};
