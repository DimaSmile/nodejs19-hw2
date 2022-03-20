import { Router } from 'express';
import { Container } from 'typedi';
import { createValidator } from 'express-joi-validation';
import UserController from '../api/controllers/UserController';
import { idValidationRequest } from '../api/requests/IdValidationRequest';
import { createUserValidation } from '../api/requests/CreateOrUpdateUserRequest';
import { getAutoSuggestUsers } from '../api/requests/GetAutoSuggestUsersRequest';

const apiRouter = Router();
const validator = createValidator();
const userController = Container.get(UserController);

apiRouter.get('/users/:id', validator.params(idValidationRequest), userController.show);
apiRouter.get('/users', validator.query(getAutoSuggestUsers), userController.getAutoSuggestUsers);

apiRouter.post('/users', validator.body(createUserValidation), userController.store);

apiRouter.put(
    '/users/:id',
    validator.params(idValidationRequest),
    validator.body(createUserValidation),
    userController.update
);

apiRouter.delete('/users/:id',  validator.params(idValidationRequest), userController.delete);

export { apiRouter };
