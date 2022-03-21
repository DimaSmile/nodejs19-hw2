import 'joi-extract-type';
import * as Joi from 'joi';
import { extractType } from '@hapi/joi';
import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';
import { PERMISSIONS, TPermission } from '../../../models/group.model';

const isPermissionType = (value: TPermission, helpers: Joi.CustomHelpers) => {
    return PERMISSIONS.includes(value) ? value : helpers.error('any.invalid');
};

export const createGroupValidation = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().min(1).items(Joi.string().custom(isPermissionType))
});

export interface CreateOrUpdateGroupRequest extends ValidatedRequestSchema {
    [ContainerTypes.Body]: extractType<typeof createGroupValidation>
}
