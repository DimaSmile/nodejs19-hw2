import { Service } from 'typedi';
import { NextFunction, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import UserService from '../../services/user.service';
import { LoginRequest } from '../requests/LoginRequest';

@Service()
export default class AuthController {
    public constructor(private userService: UserService) {
        //
    }


    public login = async (request: ValidatedRequest<LoginRequest>, response: Response, next: NextFunction) => {
        try {
            return response.send(await this.userService.login(request.body.login, request.body.password));
        } catch (e) {
            next(e);
        }
    };
}
