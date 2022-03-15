import { Response } from 'express';
import User from '../models/User';
import { ValidatedRequest } from 'express-joi-validation';
import { CreateOrUpdateUserRequest } from '../requests/CreateOrUpdateUserRequest';
import { IdValidationRequestSchema } from '../requests/IdValidationRequest';
import { GetAutoSuggestUsersRequest } from '../requests/GetAutoSuggestUsersRequest';

class UserController {
    public getAutoSuggestUsers(request: ValidatedRequest<GetAutoSuggestUsersRequest>, response: Response) {
        try {
            return response.send(User.filterByLoginSubstring(request.query));
        } catch (error: any) {
            return response.status(404).send({ errorMessage: error.message });
        }
    }

    public show(request: ValidatedRequest<IdValidationRequestSchema>, response: Response) {
        try {
            return response.send(User.getUserById(request.params.id));
        } catch (error: any) {
            return response.status(404).send({ errorMessage: error.message });
        }
    }

    public store(request: ValidatedRequest<CreateOrUpdateUserRequest>, response: Response) {
        const userId = User.create(request.body);

        return response.status(201).send({ id: userId });
    }

    public update(request: ValidatedRequest<any>, response: Response) {
        try {
            const user = User.getUserById(request.params.id);
            user.update(request.body);

            return response.status(201).send(user);
        } catch (error: any) {
            return response.status(404).send({ errorMessage: error.message });
        }
    }

    public delete(request: ValidatedRequest<IdValidationRequestSchema>, response: Response) {
        try {
            User.delete(request.params);

            return response.status(204).send();
        } catch (error: any) {
            return response.status(404).send({ errorMessage: error.message });
        }
    }
}

export default new UserController();
