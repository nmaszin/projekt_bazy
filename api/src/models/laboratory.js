import { createModel } from '@/models'

export default createModel({
    name: 'Laboratory',

    fields: {
        name: 'name',
        facultyId: 'faculty_id'
    },

    depends: [
        'Faculty'
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE Laboratory(
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                faculty_id INT NOT NULL,
                FOREIGN KEY(faculty_id) REFERENCES Faculty(id)
            );
        `)

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
                return db.query(`SELECT * FROM Laboratory WHERE id = ?`, [id])
            },
        },
        many: {
            async selectAll(db) {
                return db.query(`SELECT * FROM Laboratory`)
            },
        }
    },

    insert: {
        async insert(db, laboratory) {
            return db.query(`
                INSERT INTO Laboratory(name, faculty_id)
                VALUES(?, ?)
            `, [laboratory.name, laboratory.facultyId])
        },
    },

    update: {
        async updateById(db, id, laboratory) {
            return db.query(`
                UPDATE Laboratory
                SET name = ?, faculty_id = ?
                WHERE id = ?
            `, [laboratory.name, laboratory.facultyId, id])
        }
    },

    delete: {
        async deleteById(db, id) {
            return db.query(`DELETE FROM Laboratory WHERE id = ?`, [id])
        }
    }
})
