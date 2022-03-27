import { Service } from 'typedi';
import { NextFunction, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import GroupService from './../../services/group.service';
import { GroupIdValidationRequestSchema } from '../requests/groups/GroupIdValidationRequest';
import { CreateOrUpdateGroupRequest } from '../requests/groups/CreateOrUpdateGroupRequest';
import { AddUsersToGroupRequest } from '../requests/users/UsersIdsValidation';

@Service()
export default class GroupController {
    public constructor(private groupService: GroupService) {
        //
    }

    public show = async (request: ValidatedRequest<GroupIdValidationRequestSchema>, response: Response, next: NextFunction) => {
        try {
            const group = await this.groupService.getGroupById(request.params.id);

            return response.send(group);
        } catch (error: any) {
            next(error);
        }
    };

    public store = async (request: ValidatedRequest<CreateOrUpdateGroupRequest>, response: Response, next: NextFunction) => {
        try {
            const groupId = await this.groupService.create(request.body);

            return response.status(201).send({ id: groupId });
        } catch (error: any) {
            next(error);
        }
    };

    public update = async (request: ValidatedRequest<CreateOrUpdateGroupRequest>, response: Response, next: NextFunction) => {
        try {
            const group = await this.groupService.update(request.params.id, request.body);

            return response.send(group);
        } catch (error: any) {
            next(error);
        }
    };

    public delete = async (request: ValidatedRequest<GroupIdValidationRequestSchema>, response: Response, next: NextFunction) => {
        try {
            await this.groupService.delete(request.params);

            return response.status(204).send();
        } catch (error: any) {
            next(error);
        }
    };

    public addUsersToGroup = async (request: ValidatedRequest<AddUsersToGroupRequest>, response: Response, next: NextFunction) => {
        try {
            await this.groupService.addUsersToGroup(request.params, request.body);

            return response.status(204).send();
        } catch (error: any) {
            next(error);
        }
    };
}
