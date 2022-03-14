import 'joi-extract-type';
import * as Joi from 'joi';

import { extractType } from '@hapi/joi';
import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";

export const idValidationRequest = Joi.object({
    id: Joi.string().required()
});

export interface IdValidationRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: extractType<typeof idValidationRequest>
}