import * as bc from 'bcrypt';

class Bcrypt {
    public generateHashSync(value: string): string {
        const salt = bc.genSaltSync(10);
        const result = bc.hashSync(value, salt);

        return result;
    }
}

export const bcrypt = new Bcrypt();
