import { createModel } from '@/models'

export default createModel({
    name: 'Student',

    fields: {
        firstName: 'first_name',
        lastName: 'last_name'
    },

    async initialize(db) {
        await db.query(`
            CREATE TABLE Student(
                id INT PRIMARY KEY AUTO_INCREMENT,
                first_name VARCHAR(30) NOT NULL,
                last_name VARCHAR(30) NOT NULL
            );
        `)

        const students = [
            { firstName: 'Eryk', lastName: 'Andrzejewski' },
            { firstName: 'Konrad', lastName: 'Bankiewicz' },
            { firstName: 'Paweł', lastName: 'Błoch' }
        ]

        for (const student of students) {
            await db.query(`
                INSERT INTO Student (first_name, last_name)
                VALUES (?, ?);
            `, [student.firstName, student.lastName])
        }
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Student`)
    },

    select: {
        single: {
            async selectById(db, id) {
                return await db.query(`SELECT * FROM Student WHERE id = ?`, [id])
            },
        },
        many: {
            async selectAll(db) {
                return await db.query(`SELECT * FROM Student`)
            },
        }
    },

    insert: {
        async insert(db, student) {
            await db.query(`
                INSERT INTO Student(first_name, last_name)
                VALUES(?, ?)
            `, [student.firstName, student.lastName])
        },
    },

    update: {
        updateById: {
            checkBefore: 'selectById',
            fn: async (db, id, student) => {
                await db.query(`
                    UPDATE Student
                    SET first_name = ?, last_name = ?
                    WHERE id = ?
                `, [student.firstName, student.lastName, id])
            }
        }
    },

    delete: {
        deleteById: {
            checkBefore: 'selectById',
            fn: async (db, id) => {
                await db.query(`DELETE FROM Student WHERE id = ?`, [id])
            }
        }
    }
})
