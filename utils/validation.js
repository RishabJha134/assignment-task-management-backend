const Joi = require('joi');

const createTaskValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500),
    due_date: Joi.date().iso().greater('now').required(),
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').default('MEDIUM')
  });

  return schema.validate(data);
};

const createSubTaskValidation = (data) => {
  const schema = Joi.object({
    task_id: Joi.string().required()
  });

  return schema.validate(data);
};

module.exports = {
  createTaskValidation,
  createSubTaskValidation
};