import { genericMapRow, injectDb } from '@/models';

const mapRow = row => genericMapRow(row, {
    firstName: 'first_name',
    lastName: 'last_name'
})

export default injectDb({
    async init(db) {
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

    async insert(db, student) {
        await db.query(`
            INSERT INTO Student(first_name, last_name)
            VALUES(?, ?)
        `, [student.firstName, student.lastName])
    },

    async selectAll(db) {
        const [rows, _] = await db.query(`SELECT * FROM Student`)
        return rows.map(mapRow)
    },

    async selectById(db, id) {
        const [rows, _] = await db.query(`SELECT * FROM Student WHERE id = ?`, [id])
        return rows.map(mapRow)[0]
    },

    async exists(db, id) {
        const [rows, _] = await db.query(`SELECT * FROM Student WHERE id = ?`, [id])
        return rows[0] !== undefined
    },
    
    async deleteById(db, id) {
        await db.query(`DELETE FROM Student WHERE id = ?`, [id])
    },

    async updateById(db, id, student) {
        await db.query(`
            UPDATE Student
            SET first_name = ?, last_name = ?
            WHERE id = ?
        `, [student.firstName, student.lastName, id])
    }
})