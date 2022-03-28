import { Router } from 'express';
import { Container } from 'typedi';
import { createValidator } from 'express-joi-validation';
import AuthController from '../api/controllers/AuthController';
import UserController from '../api/controllers/UserController';
import GroupController from '../api/controllers/GroupController';
import { idValidationRequest } from '../api/requests/IdValidationRequest';
import { createUserValidation } from '../api/requests/CreateOrUpdateUserRequest';
import { getAutoSuggestUsers } from '../api/requests/GetAutoSuggestUsersRequest';
import { createGroupValidation } from '../api/requests/groups/CreateOrUpdateGroupRequest';
import { groupIdValidation } from '../api/requests/groups/GroupIdValidationRequest';
import { usersIdsValidation } from '../api/requests/users/UsersIdsValidation';
import { loginValidation } from '../api/requests/LoginRequest';


const apiRouter = Router();
const validator = createValidator();
const authController = Container.get(AuthController);
const userController = Container.get(UserController);
const groupController = Container.get(GroupController);

// auth routes
apiRouter.post('/login', validator.body(loginValidation), authController.login);

// User routes
apiRouter.get('/users/:id', [validator.params(idValidationRequest)], userController.show);
apiRouter.get('/users', validator.query(getAutoSuggestUsers), userController.getAutoSuggestUsers);
apiRouter.post('/users', validator.body(createUserValidation), userController.store);
apiRouter.put(
    '/users/:id',
    validator.params(idValidationRequest),
    validator.body(createUserValidation),
    userController.update
);
apiRouter.delete('/users/:id',  validator.params(idValidationRequest), userController.delete);

// Group routes
apiRouter.get('/groups/:id', validator.params(groupIdValidation), groupController.show);
apiRouter.post('/groups', validator.body(createGroupValidation), groupController.store);
apiRouter.put(
    '/groups/:id',
    validator.params(groupIdValidation),
    validator.body(createGroupValidation),
    groupController.update
);
apiRouter.post(
    '/groups/:id/add-users',
    validator.params(groupIdValidation),
    validator.body(usersIdsValidation),
    groupController.addUsersToGroup
);
apiRouter.delete('/groups/:id',  validator.params(groupIdValidation), groupController.delete);


export { apiRouter };
