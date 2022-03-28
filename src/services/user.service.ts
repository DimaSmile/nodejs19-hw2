import { Op } from 'sequelize';
import { Service } from 'typedi';
import User from '../models/user.model';
import ModelNotFoundException from '../exceptions/ModelNotFoundException';
import HttpException from '../exceptions/HttpException';
import { jwt } from '../utils/jwt';
import { bcrypt } from '../utils/bcrypt';

@Service()
export default class UserService {
    public async getUserById(userId: string, withTrashed: boolean = false): Promise<User> {
        const user = await User.findOne({
            where: {
                [Op.and]: [{ id: userId }, !withTrashed ? { isDeleted: false } : null]
            }
        });

        if (user) return user;

        throw new ModelNotFoundException();
    }

    public async filterByLoginSubstring({ login, limit = 10 }: { login: string, limit: number }): Promise<User[]> {
        const users = await User.findAll({
            where: {
                login: {
                    [Op.like]: `%${login}%`
                },
                isDeleted: false
            },
            limit,
            attributes: { exclude: ['password'] }
        });

        return users;
    }

    public async create(data: {
        login: string,
        password: string,
        age: number
    }): Promise<string> {
        data.password = await bcrypt.generateHash(data.password);
        const newUser = await User.create(data);

        return newUser.id;
    }

    public async update(userId: string, data: { login: string; password: string; age: number; }): Promise<User> {
        data.password = await bcrypt.generateHash(data.password);

        const user = await this.getUserById(userId);
        await user.update(data);

        return user;
    }

    public async delete({ id }: { id: string }): Promise<boolean> {
        const user = await this.getUserById(id);

        if (user) {
            await user.update({ isDeleted: true });

            return true;
        }

        return false;
    }

    public async login(login: string, password: string) {
        const user = await User.findOne({
            where: {
                login,
                isDeleted: false
            }
        });

        if (user) {
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (isValidPassword) {
                const token = jwt.sign({ id: user.id, login: user.login });

                return token;
            }
        }

        throw new HttpException(400, 'Login or password are invalid');
    }
}

