import 'joi-extract-type';
import * as Joi from 'joi';

import { extractType } from '@hapi/joi';
import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";

export const getAutoSuggestUsers = Joi.object({
    login: Joi.string().required(),
    limit: Joi.number().optional()
});

export interface GetAutoSuggestUsersRequest extends ValidatedRequestSchema {
    [ContainerTypes.Query]: extractType<typeof getAutoSuggestUsers>
}