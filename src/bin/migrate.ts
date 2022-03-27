import User from '../models/user.model';
import DB from '../database';


async function seedUsers() {
    const users = [
        { login: 'Test', password: '123456', age: 20 },
        { login: 'Test2', password: 'pass', age: 21 },
        { login: 'Test3', password: '111111', age: 22 },
        { login: 'Test4', password: '123123', age: 25 }
    ];

    await User.bulkCreate(users);
    console.log('users were created');
}

(async () => {
    try {
        await DB.sync();
        const count = await User.count({ paranoid: false });
        if (count === 0) {
            await seedUsers();
        }
    } catch (error: any) {
        console.error(error.message);
        process.exit(1);
    }
})();

