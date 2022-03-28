import { NextFunction, Request, Response } from 'express';
import { jwt } from '../utils/jwt';
import AuthenticationException from '../exceptions/AuthenticationException';
import HttpException from '../exceptions/HttpException';
import { Container } from 'typedi';
import UserService from '../services/user.service';

const userService = Container.get(UserService);

export const authenticateUser = () => {
    return async (request: Request, response: Response, next: NextFunction) => {
        if (!request.url.match('/api/login')) {
            if (request.headers.authorization === undefined) {
                next(new HttpException(401, 'Token is not provided'));
                return;
            }

            const [bearerWord, token] = request.headers.authorization.split(' ');

            try {
                const parsedToken = await jwt.verifyToken(token);
                await userService.getUserById(parsedToken.id);
            } catch (error) {
                next(new AuthenticationException('Invalid token'));
            }
        }

        next();
    };
};
