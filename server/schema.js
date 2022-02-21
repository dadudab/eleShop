const Joi = require('joi');

module.exports.productSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  description: Joi.string().min(1).max(255).required(),
  price: Joi.number().min(1).required(),
  categories: Joi.array().items(Joi.string().min(1).max(20)),
}).required();
