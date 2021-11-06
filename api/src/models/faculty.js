import { createModel } from '@/models'

export default createModel({
    name: 'Faculty',

    fields: {
        name: 'name',
        address: 'address'
    },

    async initialize(db) {
        await db.query(`
            CREATE TABLE Faculty(
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                address VARCHAR(100) NOT NULL
            );
        `)

        const faculties = [
            { name: 'Wydział Informatyki i Telekomunikacji', address: 'Poznań' },
            { name: 'Wydział Elektryczny', address: 'Poznań' },
            { name: 'Wydział Budowy Maszyn', address: 'Poznań' }
        ]

        for (const faculty of faculties) {
            await db.query(`
                INSERT INTO Faculty (name, address)
                VALUES (?, ?);
            `, [faculty.name, faculty.address])
        }
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Faculty`)
    },

    select: {
        single: {
            async selectById(db, id) {
                return await db.query(`SELECT * FROM Faculty WHERE id = ?`, [id])
            },
        },
        many: {
            async selectAll(db) {
                return await db.query(`SELECT * FROM Faculty`)
            },
        }
    },

    insert: {
        async insert(db, faculty) {
            await db.query(`
                INSERT INTO Faculty(name, address)
                VALUES(?, ?)
            `, [faculty.name, faculty.address])
        },
    },

    update: {
        updateById: {
            checkBefore: 'selectById',
            fn: async (db, id, faculty) => {
                await db.query(`
                    UPDATE Faculty
                    SET name = ?, address = ?
                    WHERE id = ?
                `, [faculty.name, faculty.address, id])
            }
        }
    },

    delete: {
        deleteById: {
            checkBefore: 'selectById',
            fn: async (db, id) => {
                await db.query(`DELETE FROM Faculty WHERE id = ?`, [id])
            }
        }
    }
})
