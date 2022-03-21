import { Service } from 'typedi';
import { Response } from 'express';
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

    public show = async (request: ValidatedRequest<GroupIdValidationRequestSchema>, response: Response) => {
        try {
            const group = await this.groupService.getGroupById(request.params.id);

            return response.send(group);
        } catch (error: any) {
            return response.status(404).send(error.message);
        }
    };

    public store = async (request: ValidatedRequest<CreateOrUpdateGroupRequest>, response: Response) => {
        try {
            const groupId = await this.groupService.create(request.body);

            return response.status(201).send({ id: groupId });
        } catch (error: any) {
            return response.status(404).send(error.message);
        }
    };

    public update = async (request: ValidatedRequest<CreateOrUpdateGroupRequest>, response: Response) => {
        try {
            const group = await this.groupService.update(request.params.id, request.body);

            return response.send(group);
        } catch (error: any) {
            return response.status(404).send({ errorMessage: error.message });
        }
    };

    public delete = async (request: ValidatedRequest<GroupIdValidationRequestSchema>, response: Response) => {
        try {
            await this.groupService.delete(request.params);

            return response.status(204).send();
        } catch (error: any) {
            return response.status(404).send({ errorMessage: error.message });
        }
    };

    public addUsersToGroup = async (request: ValidatedRequest<AddUsersToGroupRequest>, response: Response) => {
        try {
            await this.groupService.addUsersToGroup(request.params, request.body);

            return response.status(204).send();
        } catch (error: any) {
            return response.status(404).send({ errorMessage: error.message });
        }
    };
}
