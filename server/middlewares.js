const { productSchema, userSchema } = require('./schema');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

module.exports.validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
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

module.exports.isUserAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'test');

      req.user = await User.findById(decodedToken.id);
      console.log('user');
      console.log(req.user);
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'User not auth' });
  }
};

module.exports.isUserAdmin = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'test');

      if (decodedToken.isAdmin) {
        next();
      } else {
        return res.status(405).json({ message: 'You are not allowed' });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
