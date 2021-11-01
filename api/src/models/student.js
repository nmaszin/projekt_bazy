import database from "@/database";

function mapRow(row) {
    return {
        id: row.id,
        data: {
            firstName: row['first_name'],
            lastName: row['last_name']
        }
    }
}

export default {
    async init() {
        const db = await database.connect()
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

    async insert(student) {
        const db = await database.connect()
        await db.query(`
            INSERT INTO Student(first_name, last_name)
            VALUES(?, ?)
        `, [student.firstName, student.lastName])
    },

    async selectAll() {
        const db = await database.connect()
        const [rows, _] = await db.query(`SELECT * FROM Student`)
        return rows.map(mapRow)
    },

    async selectById(id) {
        const db = await database.connect()
        const [rows, _] = await db.query(`SELECT * FROM Student WHERE id = ?`, [id])
        return rows.map(mapRow)[0]
    },

    async exists(id) {
        const db = await database.connect()
        const [rows, _] = await db.query(`SELECT * FROM Student WHERE id = ?`, [id])
        return rows[0] !== undefined
    },
    
    async deleteById(id) {
        const db = await database.connect()
        await db.query(`DELETE FROM Student WHERE id = ?`, [id])
    },

    async updateById(id, student) {
        const db = await database.connect()
        await db.query(`
            UPDATE Student
            SET first_name = ?, last_name = ?
            WHERE id = ?
        `, [student.firstName, student.lastName, id])
    }
}
