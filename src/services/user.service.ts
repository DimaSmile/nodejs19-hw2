import { Op } from 'sequelize';
import { Service } from 'typedi';
import User from '../models/user.model';

@Service()
export default class UserService {
    public async getUserById(userId: string, withTrashed: boolean = false): Promise<User | null> {
        const user = await User.findOne({
            where: {
                [Op.and]: [{ id: userId }, !withTrashed ? { isDeleted: false } : null]
            }
        });

        return user;
    }

    public async filterByLoginSubstring({ login, limit = 10 }: { login: string, limit: number }): Promise<User[]> {
        const users = await User.findAll({
            where: {
                login: {
                    [Op.like]: `%${login}%`
                },
                isDeleted: false
            },
            limit
        });

        return users;
    }

    public async create(data: {
        login: string,
        password: string,
        age: number
    }): Promise<string> {
        const newUser = await User.create(data);

        return newUser.id;
    }

    public async update(userId: string, data: { login: string; password: string; age: number; }): Promise<User | false> {
        const user = await this.getUserById(userId);
        if (user) {
            await user.update(data);

            return user;
        }

        throw new Error('user not found');
    }

    public async delete({ id }: { id: string }): Promise<boolean> {
        const user = await this.getUserById(id);

        if (user) {
            await user.update({ isDeleted: true });

            return true;
        }

        return false;
    }
}

