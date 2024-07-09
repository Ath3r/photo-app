import Joi from 'joi';

const createPostSchema = Joi.object({
  file: Joi.any(),
  description: Joi.string().required(),
});

const updatePostSchema = Joi.object({
  description: Joi.string().required(),
});

export { createPostSchema, updatePostSchema };