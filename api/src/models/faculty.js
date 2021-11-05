import { createModel } from '@/models'

const maxLengths = {
    name: 100,
    address: 100
}

export default createModel({
    fields: {
        name: 'name',
        address: 'address'
    },
    
    constraints: {
        name: {
            presence: true,
            length: {
                minimum: 1,
                maximum: maxLengths.firstName
            }
        },
        address: {
            presence: true,
            length: {
                minimum: 1,
                maximum: maxLengths.lastName,
            }
        }
    },

    async initialize(db) {
        await db.query(`
            CREATE TABLE Faculty(
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(?) NOT NULL,
                address VARCHAR(?) NOT NULL
            );
        `, [maxLengths.name, maxLengths.address])

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
