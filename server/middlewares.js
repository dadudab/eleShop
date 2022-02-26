const { productSchema, userSchema } = require('./schema');

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

module.exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    console.log(error.message);
    res.send(error.message);
  } else {
    next();
  }
};

module.exports.getCurrentUser = (req, res, next) => {
  if (!req.user) {
    return res.status(404).json({ message: 'User not logged in' });
  }
  return res.status(200).json(req.user);
};
