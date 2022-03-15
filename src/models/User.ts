import { v4 as uuid } from 'uuid';

export default class User {
    readonly id: string = uuid();
    public static users: User[] = [];

    constructor(
        public login: string,
        public password: string,
        public age: number,
        public isDeleted: boolean = false
    ) {
    }

    public static create(data: {
        login: string,
        password: string,
        age: number
    }): string {
        const newUser = new User(data.login, data.password, data.age);
        User.users.push(newUser);

        return newUser.id;
    }

    public update(data: { login: string; password: string; age: number; }) {
        this.login = data.login;
        this.password = data.password;
        this.age = data.age;

        return this;
    }

    public static delete({ id }: { id: string }) {
        const user = User.getUserById(id);

        user.isDeleted = true;
        return true;
    }

    public static filterByLoginSubstring({ login, limit = 10 }: { login: string, limit: number }) {
        const users = User.users.slice(0, limit)
            .filter((user) => user.login.includes(login) && !user.isDeleted)
            .sort();

        return users;
    }

    public static getUserById(id: string, withTrashed: boolean = false) {
        const user = User.users.find((user) => {
            return (user.id === id) && (withTrashed || !user.isDeleted);
        });

        if (user !== undefined) {
            return user;
        }

        throw new Error("User doesn't exists!");
    }
}
