import { Response } from 'express';
import { Service } from 'typedi';
import { ValidatedRequest } from 'express-joi-validation';
import UserService from './../../services/user.service';
import { IdValidationRequestSchema } from '../requests/IdValidationRequest';
import { CreateOrUpdateUserRequest } from '../requests/CreateOrUpdateUserRequest';
import { GetAutoSuggestUsersRequest } from '../requests/GetAutoSuggestUsersRequest';

@Service()
export default class UserController {
    public constructor(private userService: UserService) {
        //
    }
    public getAutoSuggestUsers = async (request: ValidatedRequest<GetAutoSuggestUsersRequest>, response: Response) => {
        try {
            const users = await this.userService.filterByLoginSubstring(request.query);
            return response.send(users);
        } catch (error: any) {
            return response.status(404).send({ errorMessage: error.message });
        }
    };

    public show = async (request: ValidatedRequest<IdValidationRequestSchema>, response: Response) => {
        try {
            const user = await this.userService.getUserById(request.params.id);
            return response.send(user);
        } catch (error: any) {
            return response.status(404).send(error.message);
        }
    };

    public store = async (request: ValidatedRequest<CreateOrUpdateUserRequest>, response: Response) => {
        try {
            const userId = await this.userService.create(request.body);

            return response.status(201).send({ id: userId });
        } catch (error: any) {
            return response.status(404).send(error.message);
        }
    };

    public update = async (request: ValidatedRequest<any>, response: Response) => {
        try {
            const user = await this.userService.update(request.params.id, request.body);

            return response.send(user);
        } catch (error: any) {
            return response.status(404).send({ errorMessage: error.message });
        }
    };

    public delete = async (request: ValidatedRequest<IdValidationRequestSchema>, response: Response) => {
        try {
            await this.userService.delete(request.params);

            return response.status(204).send();
        } catch (error: any) {
            return response.status(404).send({ errorMessage: error.message });
        }
    };
}
