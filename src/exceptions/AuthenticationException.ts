import HttpException from './HttpException';

export default class AuthenticationException extends HttpException {
    constructor(message: string) {
        super(401, message);
    }
}
