import 'joi-extract-type';
import * as Joi from 'joi';

import { extractType } from '@hapi/joi';
import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';

export const loginValidation = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required()
});

export interface LoginRequest extends ValidatedRequestSchema {
    [ContainerTypes.Body]: extractType<typeof loginValidation>
}
