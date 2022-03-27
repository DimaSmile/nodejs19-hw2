import HttpException from './HttpException';

export default class ModelNotFoundException extends HttpException {
    constructor() {
        super(404, 'Model not found');
    }
}
