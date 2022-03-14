import 'joi-extract-type';
import * as Joi from 'joi';

import { extractType } from '@hapi/joi';
import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";

export const createUserValidation = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.number().required(),
});

export interface CreateOrUpdateUserRequest extends ValidatedRequestSchema {
    [ContainerTypes.Body]: extractType<typeof createUserValidation>
}