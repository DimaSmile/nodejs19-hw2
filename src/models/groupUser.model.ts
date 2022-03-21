import { Model, Table, Column, IsUUID, ForeignKey } from 'sequelize-typescript';
import Group from './group.model';
import User from './user.model';

export interface GroupI {
    groupId: string;
    userId: string;
}

@Table({
    tableName: 'group_user',
    timestamps: false
})
export default class GroupUser extends Model implements GroupI {
    @IsUUID(4)
    @ForeignKey(() => Group)
    @Column
    groupId: string;

    @IsUUID(4)
    @ForeignKey(() => User)
    @Column
    userId: string;
}
