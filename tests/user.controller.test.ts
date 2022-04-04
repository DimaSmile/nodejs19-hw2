import 'reflect-metadata';
import { Container } from 'typedi';
import { ValidatedRequest } from 'express-joi-validation';
import UserController from '../src/api/controllers/UserController';
import { IdValidationRequestSchema } from '../src/api/requests/IdValidationRequest';
import UserService from '../src/services/user.service';
import ModelNotFoundException from '../src/exceptions/ModelNotFoundException';
import { GetAutoSuggestUsersRequest } from "../src/api/requests/GetAutoSuggestUsersRequest";
import {CreateOrUpdateUserRequest} from "../src/api/requests/CreateOrUpdateUserRequest";

beforeEach(() => {
    Container.reset();
});
describe('UserController show', () => {
    it('can get user by id', async () => {
        const userServiceMock = {
            getUserById: jest.fn(async () => {
                return {
                    toJSON: jest.fn(() => {
                        return {
                            id: 'test',
                            login: 'testLogin',
                            password: 'test',
                            age: 20,
                            isDelete: false
                        };
                    })
                };
            })
        };
        Container.set(UserService, userServiceMock);

        const userController = Container.get(UserController);
        const request: any = {
            params: {
                id: 'test'
            }
        } as ValidatedRequest<IdValidationRequestSchema>;
        const response: any = { send: jest.fn() };
        const next = jest.fn();

        await userController.show(request, response, next);

        expect(userServiceMock.getUserById).toHaveBeenCalledTimes(1);
        expect(response.send).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledTimes(0);
    });

    it('throw ModelNotFoundException and call next callback', async () => {
        const userServiceMock = {
            getUserById: jest.fn(async () => {
                throw new ModelNotFoundException();
            })
        };
        Container.set(UserService, userServiceMock);
        const userController = Container.get(UserController);
        const request: any = {
            params: {
                id: 'test'
            }
        } as ValidatedRequest<IdValidationRequestSchema>;
        const response: any = { send: jest.fn() };
        const next = jest.fn();

        await userController.show(request, response, next);

        await expect(userServiceMock.getUserById).rejects.toThrowError(ModelNotFoundException);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('throw TypeError and call next callback', async () => {
        const userServiceMock = {};
        Container.set(UserService, userServiceMock);
        const userController = Container.get(UserController);
        const request: any = {} as ValidatedRequest<IdValidationRequestSchema>;
        const response: any = { send: jest.fn() };
        const next = jest.fn();

        await userController.show(request, response, next);

        await expect(userController.show).rejects.toThrowError(TypeError);
        expect(next).toHaveBeenCalledTimes(1);
    });
});

describe('UserController getAutoSuggestUsers', () => {
    it('can getAutoSuggestUsers', async () => {
        const userServiceMock = {
            filterByLoginSubstring: jest.fn(async () => {
                return [{
                    id: 'test',
                    login: 'testLogin',
                    password: 'test',
                    age: 20,
                    isDelete: false
                }];
            })
        };
        Container.set(UserService, userServiceMock);

        const userController = Container.get(UserController);
        const request: any = {
            query: {
                login: 'test',
                limit: 10
            }
        } as ValidatedRequest<GetAutoSuggestUsersRequest>;
        const response: any = { send: jest.fn() };
        const next = jest.fn();

        await userController.getAutoSuggestUsers(request, response, next);

        expect(userServiceMock.filterByLoginSubstring).toHaveBeenCalledTimes(1);
        expect(response.send).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledTimes(0);
    });

    it('throw Error and call next callback', async () => {
        const userServiceMock = {
            filterByLoginSubstring: jest.fn(async () => {
                throw new Error();
            })
        };
        Container.set(UserService, userServiceMock);

        const userController = Container.get(UserController);
        const request: any = {} as ValidatedRequest<GetAutoSuggestUsersRequest>;
        const response: any = { send: jest.fn() };
        const next = jest.fn();

        await userController.getAutoSuggestUsers(request, response, next);

        await expect(userController.getAutoSuggestUsers).rejects.toThrowError(Error);
        expect(next).toHaveBeenCalledTimes(1);
    });
});

describe('UserController update', () => {
    it('can update user by id', async () => {
        const userServiceMock = {
            update: jest.fn(async () => {
                return {
                    toJSON: jest.fn(() => {
                        return {
                            id: 'test',
                            login: 'testLogin',
                            password: 'test',
                            age: 20,
                            isDelete: false
                        };
                    })
                };
            })
        };
        Container.set(UserService, userServiceMock);

        const userController = Container.get(UserController);
        const request: any = {
            params: {
                id: 'test'
            },
            body: {
                login: 'testLogin',
                password: 'test',
                age: 20
            }
        } as ValidatedRequest<any>;
        const response: any = { send: jest.fn() };
        const next = jest.fn();

        await userController.update(request, response, next);

        expect(userServiceMock.update).toHaveBeenCalledTimes(1);
        expect(response.send).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledTimes(0);
    });

    it('throw ModelNotFoundException and call next callback', async () => {
        const userServiceMock = {
            update: jest.fn(async () => {
                throw new ModelNotFoundException();
            })
        };
        Container.set(UserService, userServiceMock);
        const userController = Container.get(UserController);
        const request: any = {
            params: {
                id: 'test'
            },
            body: {
                login: 'testLogin',
                password: 'test',
                age: 20
            }
        } as ValidatedRequest<any>;
        const response: any = { send: jest.fn() };
        const next = jest.fn();

        await userController.update(request, response, next);

        await expect(userServiceMock.update).rejects.toThrowError(ModelNotFoundException);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('throw TypeError and call next callback', async () => {
        const userServiceMock = {
            update: jest.fn(async () => {
                return {
                    toJSON: jest.fn(() => {
                        return {
                            id: 'test',
                            login: 'testLogin',
                            password: 'test',
                            age: 20,
                            isDelete: false
                        };
                    })
                };
            })
        };
        Container.set(UserService, userServiceMock);
        const userController = Container.get(UserController);
        const request: any = {} as ValidatedRequest<any>;
        const response: any = { send: jest.fn() };
        const next = jest.fn();

        await userController.update(request, response, next);

        await expect(userController.update).rejects.toThrowError(TypeError);
        expect(next).toHaveBeenCalledTimes(1);
    });
});

describe('UserController store', () => {
    it('can store user', async () => {
        const userServiceMock = {
            create: jest.fn(async () => {
                return 'userId';
            })
        };
        Container.set(UserService, userServiceMock);

        const userController = Container.get(UserController);
        const request: any = {
            body: {
                login: 'testLogin',
                password: 'test',
                age: 20
            }
        } as ValidatedRequest<CreateOrUpdateUserRequest>;
        const response: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        await userController.store(request, response, next);

        expect(userServiceMock.create).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledTimes(1);
        expect(response.send).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledTimes(0);
    });

    it('throw Error and call next callback', async () => {
        const userServiceMock = {
            create: jest.fn(async () => {
                throw new Error();
            })
        };
        Container.set(UserService, userServiceMock);

        const userController = Container.get(UserController);
        const request: any = {} as ValidatedRequest<CreateOrUpdateUserRequest>;
        const response: any = { send: jest.fn() };
        const next = jest.fn();

        await userController.store(request, response, next);

        await expect(userController.store).rejects.toThrowError(Error);
        expect(next).toHaveBeenCalledTimes(1);
    });
});

describe('UserController delete', () => {
    it('can delete user by id', async () => {
        const userServiceMock = {
            delete: jest.fn(async () => {
                return true;
            })
        };
        Container.set(UserService, userServiceMock);

        const userController = Container.get(UserController);
        const request: any = {
            params: {
                id: 'userId'
            }
        } as ValidatedRequest<IdValidationRequestSchema>;
        const response: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        await userController.delete(request, response, next);

        expect(userServiceMock.delete).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledTimes(1);
        expect(response.send).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledTimes(0);
    });

    it('throw Error and call next callback', async () => {
        const userServiceMock = {
            delete: jest.fn(async ()=> {
                throw new Error();
            })
        };
        Container.set(UserService, userServiceMock);

        const userController = Container.get(UserController);
        const request: any = {
            params: {
                id: 'userId'
            }
        } as ValidatedRequest<IdValidationRequestSchema>;
        const response: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        await userController.delete(request, response, next);

        await expect(userServiceMock.delete).rejects.toThrowError(Error);
        expect(next).toHaveBeenCalledTimes(1);
    });
});
