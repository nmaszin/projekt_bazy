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
                return db.query(`SELECT * FROM Student WHERE id = ?`, [id])
            },
        },
        many: {
            async selectAll(db) {
                return db.query(`SELECT * FROM Student`)
            },
        }
    },

    insert: {
        async insert(db, student) {
            return db.query(`
                INSERT INTO Student(first_name, last_name)
                VALUES(?, ?)
            `, [student.firstName, student.lastName])
        },
    },

    update: {
        async updateById(db, id, student) {
            return db.query(`
                UPDATE Student
                SET first_name = ?, last_name = ?
                WHERE id = ?
            `, [student.firstName, student.lastName, id])
        }
    },

    delete: {
        async deleteById(db, id) {
            return db.query(`DELETE FROM Student WHERE id = ?`, [id])
        }
    }
})
