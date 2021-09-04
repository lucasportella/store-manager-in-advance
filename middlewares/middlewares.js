const validators = require('./validators/validators');

const checkCreateProductInputMiddleware = async (req, res, next ) => {
  const { name, quantity } = req.body;
  const checkResult = validators.checkCreateProductInput(name, quantity);
  console.log(checkResult);
  if (checkResult !== 'sucesso') { next(checkResult);}
  next();
};

module.exports = {
  checkCreateProductInputMiddleware,
};