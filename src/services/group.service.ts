import { Service } from 'typedi';

import DB from '../database';
import Group from '../models/group.model';
import GroupUser from '../models/groupUser.model';

@Service()
export default class GroupService {
    public async getGroupById(groupId: string): Promise<Group> {
        const group = await Group.findByPk(groupId);

        if (group) return group;

        throw new Error('Group not found');
    }

    public async create(data: {
        name: string,
        permissions: Permissions[],
    }): Promise<string> {
        const newGroup = await Group.create(data);

        return newGroup.id;
    }

    public async update(groupId: string, data: { name: string; permissions: Permissions[]; }): Promise<Group> {
        const group = await this.getGroupById(groupId);
        await group.update(data);

        return group;
    }

    public async delete({ id }: { id: string }): Promise<boolean> {
        const result = await Group.destroy({
            where: { id }
        });

        return !!result;
    }

    public async addUsersToGroup({ id }: {id: string}, { users }: {users: string[]}) {
        const transaction = await DB.sequelize.transaction();

        try {
            for (const userId of users) {
                await GroupUser.create({
                    groupId: id,
                    userId
                }, { transaction });
            }

            await transaction.commit();

            return true;
        } catch (error: any) {
            await transaction.rollback();
            throw new Error(error.message);
        }
    }
}
