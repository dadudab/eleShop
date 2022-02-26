const Joi = require('joi');

module.exports.productSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  description: Joi.string().min(1).max(255).required(),
  price: Joi.number().min(1).required(),
  categories: Joi.array().items(Joi.string().min(1).max(20)),
}).required();

module.exports.userSchema = Joi.object({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  city: Joi.string().min(1).required(),
  address: Joi.string().min(1).required(),
  postalCode: Joi.string().min(6).max(6).required(),
  email: Joi.string().min(3).required(),
  password: Joi.string().min(1).required(),
}).required();
