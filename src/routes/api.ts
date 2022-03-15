import UserController from '../controllers/UserController';

import { Router } from 'express';
import { createValidator } from 'express-joi-validation';
import { createUserValidation } from '../requests/CreateOrUpdateUserRequest';
import { idValidationRequest } from '../requests/IdValidationRequest';
import { getAutoSuggestUsers } from '../requests/GetAutoSuggestUsersRequest';

const apiRouter = Router();
const validator = createValidator();

apiRouter.get('/users/:id', validator.params(idValidationRequest), UserController.show);
apiRouter.get('/users', validator.query(getAutoSuggestUsers), UserController.getAutoSuggestUsers);

apiRouter.post('/users', validator.body(createUserValidation), UserController.store);

apiRouter.put(
    '/users/:id',
    validator.params(idValidationRequest),
    validator.body(createUserValidation),
    UserController.update
);

apiRouter.delete('/users/:id',  validator.params(idValidationRequest), UserController.delete);

export { apiRouter };
