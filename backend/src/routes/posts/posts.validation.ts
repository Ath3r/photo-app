import Joi from 'joi';

const createPostSchema = Joi.object({
  description: Joi.string().required(),
});

const updatePostSchema = Joi.object({
  description: Joi.string().required(),
});

export { createPostSchema, updatePostSchema };