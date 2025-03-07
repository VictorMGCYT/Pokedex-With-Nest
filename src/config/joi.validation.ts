import * as Joi from 'joi';

// Esto es más o menos lo mismo que ZOD

export const JoiValidationSchema = Joi.object({

    MONGODB: Joi.required(),
    PORT: Joi.number().default(3002),
    DEFAULT_LIMIT: Joi.number().default(10)

})