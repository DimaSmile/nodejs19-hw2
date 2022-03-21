import { v4 as uuid } from 'uuid';
import { Model, Table, PrimaryKey, Column, AllowNull, NotEmpty, Default, IsUUID, DataType, BelongsToMany } from 'sequelize-typescript';
import User from './user.model';
import GroupUser from './groupUser.model';

export const PERMISSIONS = [
    'READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'
] as const;

export type TPermission = typeof PERMISSIONS[number];

export interface GroupI {
    id: string;
    name: string;
    permissions: TPermission[];
}

@Table({
    tableName: 'groups',
    timestamps: false
})
export default class Group extends Model implements GroupI {
    @AllowNull(false)
    @PrimaryKey
    @IsUUID(4)
    @Default(uuid)
    @Column
    declare id: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    declare name: string;

    @AllowNull
    @Column({
        type: DataType.ARRAY(DataType.STRING)
    })
    declare permissions: TPermission[];

    @BelongsToMany(() => User, () => GroupUser)
    users: Array<User & {GroupUser: GroupUser}>;
}
