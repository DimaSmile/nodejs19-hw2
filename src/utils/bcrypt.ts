import * as bc from 'bcrypt';

class Bcrypt {
    public async generateHash(value: string): Promise<string> {
        const salt = await bc.genSalt(10);

        return await bc.hash(value, salt);
    }

    public async compare(password: string, hash: string): Promise<boolean> {
        return await bc.compare(password, hash);
    }
}

export const bcrypt = new Bcrypt();
