import 'joi-extract-type';
import * as Joi from 'joi';

import { extractType } from '@hapi/joi';
import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';

export const groupIdValidation = Joi.object({
    id: Joi.string().required()
});

export interface GroupIdValidationRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: extractType<typeof groupIdValidation>
}
