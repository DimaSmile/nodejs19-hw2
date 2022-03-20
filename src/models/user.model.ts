import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Model, Table, PrimaryKey, Column, AllowNull, NotEmpty, Default, IsUUID } from 'sequelize-typescript';

export interface UserI {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

@Table({
    tableName: 'users',
    timestamps: false
})
export default class User extends Model implements UserI {
    @AllowNull(false)
    @PrimaryKey
    @IsUUID(4)
    @Default(uuid)
    @Column
    declare id: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    declare login: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    set password(value: string) {
        const hash = this.generateHash(value);

        this.setDataValue('password', hash);
    }

    @AllowNull(false)
    @NotEmpty
    @Column
    declare age: number;

    @AllowNull(false)
    @NotEmpty
    @Default(false)
    @Column
    declare isDeleted: boolean;

    private generateHash(value: string) {
        const salt = bcrypt.genSaltSync(10);
        const result = bcrypt.hashSync(value as string, salt);

        return result;
    }
}
