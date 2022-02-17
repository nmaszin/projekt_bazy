import bcrypt from 'bcrypt'
import { createModel } from '@/models'

// Available roles:
// role 0 - reader
// role 1 - writer
// role 2 - admin

export default createModel({
    name: 'User',

    fields: {
        username: 'username',
        password: 'password',
        role: 'role'
    },

    rows: [
        { username: 'czytelnik', password: 'czytelnik', role: 0 },
        { username: 'pisarzyna', password: 'pisarzyna', role: 1 },
        { username: 'administrator', password: 'administrator', role: 2 }
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE User(
                id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(100) NOT NULL,
                password VARCHAR(60) NOT NULL,
                role INT NOT NULL,
                UNIQUE(username)
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE User`)
    },

    select: {
        async selectByUsername(db, username) {
            return db.query(`
                SELECT * FROM User
                WHERE username = ?
            `, [username])
        }
    },

    insert: {
        // Override
        async insert(db, user) {
            const { username, password, role } = user
            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(password, salt)

            return db.query(`
                INSERT INTO User(username, password, role)
                VALUES(?, ?, ?)
            `, [username, hash, role])
        }
    },

    update: {
         // Override
         async updateById(db, id, user) {
            if (user.password) {
                const salt = await bcrypt.genSalt()
                const hash = await bcrypt.hash(password, salt)
                return db.query(`
                    UPDATE User
                    SET
                        username = ?,
                        password = ?,
                        role = ?
                    WHERE id = ?
                `, [user.username, hash, user.role, id])
            } else {
                return db.query(`
                    UPDATE User
                    SET
                        username = ?,
                        role = ?
                    WHERE id = ?
                `, [user.username, user.role, id])
            }
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
