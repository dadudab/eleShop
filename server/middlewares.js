const { productSchema } = require('./schema');

module.exports.validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body.product);
  if (error) {
    console.log(error.message);
    // return res.json(error);
    res.send(error.message);
  } else {
    next();
  }
};

module.exports.giveUser = (req, res, next) => {
  return res.json(req.user);
};
