const validators = require('./validators/validators');

const checkCreateProductInputMiddleware = async (req, res, next ) => {
  const { name, quantity } = req.body;
  const checkResult = validators.checkCreateProductInput(name, quantity);
  if (checkResult.error) { next(checkResult.error);}
  next();
};

module.exports = {
  checkCreateProductInputMiddleware,
};