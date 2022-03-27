import { NextFunction, Response } from 'express';
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

    public getAutoSuggestUsers = async (request: ValidatedRequest<GetAutoSuggestUsersRequest>, response: Response, next: NextFunction) => {
        try {
            const users = await this.userService.filterByLoginSubstring(request.query);
            return response.send(users);
        } catch (error: any) {
            next(error);
        }
    };

    public show = async (request: ValidatedRequest<IdValidationRequestSchema>, response: Response, next: NextFunction) => {
        try {
            const user = await this.userService.getUserById(request.params.id);
            const { password, ...userWithoutPassword } = user.toJSON();

            return response.send(userWithoutPassword);
        } catch (error: any) {
            next(error);
        }
    };

    public store = async (request: ValidatedRequest<CreateOrUpdateUserRequest>, response: Response, next: NextFunction) => {
        try {
            const userId = await this.userService.create(request.body);

            return response.status(201).send({ id: userId });
        } catch (error: any) {
            next(error);
        }
    };

    public update = async (request: ValidatedRequest<any>, response: Response, next: NextFunction) => {
        try {
            const user = await this.userService.update(request.params.id, request.body);

            return response.send(user);
        } catch (error: any) {
            next(error);
        }
    };

    public delete = async (request: ValidatedRequest<IdValidationRequestSchema>, response: Response, next: NextFunction) => {
        try {
            await this.userService.delete(request.params);

            return response.status(204).send();
        } catch (error: any) {
            next(error);
        }
    };
}
