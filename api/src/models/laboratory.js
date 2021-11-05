import { createModel } from '@/models'
import Faculty from '@/models/faculty'

const maxLengths = {
    name: 100
}

export default createModel({
    fields: {
        name: 'name',
        facultyId: 'faculty_id'
    },
    
    constraints: {
        name: {
            presence: true,
            length: {
                minimum: 1,
                maximum: maxLengths.name
            }
        },
        facultyId: {
            presence: true,
            foreignKey: Faculty
        }
    },

    async initialize(db) {
        await db.query(`
            CREATE TABLE Laboratory(
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(?) NOT NULL,
                faculty_id INT NOT NULL,
                FOREIGN KEY(faculty_id) REFERENCES Faculty(id)
            );
        `, [maxLengths.name])

        const laboratories = [
            { name: 'Zakład Algorytmów i Struktur Danych', facultyId: 1 },
            { name: 'Zakład o piwo', facultyId: 2 },
        ]

        for (const laboratory of laboratories) {
            await db.query(`
                INSERT INTO Laboratory (name, faculty_id)
                VALUES (?, ?);
            `, [laboratory.name, laboratory.facultyId])
        }
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Laboratory`)
    },

    select: {
        single: {
            async selectById(db, id) {
                return await db.query(`SELECT * FROM Laboratory WHERE id = ?`, [id])
            },
        },
        many: {
            async selectAll(db) {
                return await db.query(`SELECT * FROM Laboratory`)
            },
        }
    },

    insert: {
        async insert(db, laboratory) {
            await db.query(`
                INSERT INTO Laboratory(name, faculty_id)
                VALUES(?, ?)
            `, [laboratory.name, laboratory.facultyId])
        },
    },

    update: {
        updateById: {
            checkBefore: 'selectById',
            fn: async (db, id, laboratory) => {
                await db.query(`
                    UPDATE Laboratory
                    SET name = ?, faculty_id = ?
                    WHERE id = ?
                `, [laboratory.name, laboratory.facultyId, id])
            }
        }
    },

    delete: {
        deleteById: {
            checkBefore: 'selectById',
            fn: async (db, id) => {
                await db.query(`DELETE FROM Laboratory WHERE id = ?`, [id])
            }
        }
    }
})
