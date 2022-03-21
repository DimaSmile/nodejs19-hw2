import 'joi-extract-type';
import * as Joi from 'joi';

import { extractType } from '@hapi/joi';
import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';

export const usersIdsValidation = Joi.object({
    users: Joi.array().min(1).items(Joi.string())
});

export interface AddUsersToGroupRequest extends ValidatedRequestSchema {
    [ContainerTypes.Body]: extractType<typeof usersIdsValidation>
}
