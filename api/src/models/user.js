import bcrypt from 'bcrypt'
import { createModel } from '@/models'

export default createModel({
    name: 'User',

    fields: {
        username: 'username',
        password: 'password'
    },

    async initialize(db) {
        await db.query(`
            CREATE TABLE User(
                id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(100) NOT NULL,
                password VARCHAR(60) NOT NULL,
                UNIQUE(username)
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE User`)
    },

    select: {
        async selectByUsername(db, username, password) {
            return db.query(`
                SELECT * FROM User
                WHERE username = ?
            `, [username])
        }
    },

    insert: {
        // Override
        async insert(db, user) {
            const { username, password } = user
            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(password, salt)

            return db.query(`
                INSERT INTO User(username, password)
                VALUES(?, ?)
            `, [username, hash])
        }
    },

    custom: {
        async verify(db, username, password) {
            const [[user], _] = await db.query(`
                SELECT * FROM User
                WHERE username = ?
            `, [username])

            if (user === undefined) {
                return undefined;
            }

            const hash = user.password
            const ok = await bcrypt.compare(password, hash)
            return ok ? user : undefined;
        }
    }
})
