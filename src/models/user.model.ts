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
    get password(): string {
        return this.getDataValue('password');
    }
    set password(value: string) {
        // console.log(value);
        // this.bcrypt(value.toString()).then((val) => )
        this.setDataValue('password', value.toString());
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

    private async bcrypt(value: string) {
        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        const result = await bcrypt.hash(value as string, salt);

        return result;
    }
}
