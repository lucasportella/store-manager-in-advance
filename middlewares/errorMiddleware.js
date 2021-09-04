const { unprocessable_entity } = require('../utils/statusCodes');

const errorMiddleware = (error, req, res, next) => {
  if (error.isJoi) {
    return res.status(unprocessable_entity).json({
      err: {
        code: 'invalid_data',
        message: error.message
      }
    });
  }

  if (error.isRepeatedName) {
    return res.status(unprocessable_entity).json({
      err: {
        code: 'invalid_data',
        message: error.message
      }
    });
  }
};

module.exports = {
  errorMiddleware,
};
