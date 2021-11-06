import { createModel } from '@/models'

export default createModel({
    name: 'Semester',

    fields: {
        number: 'number',
        year: 'year',
        subjectId: 'subject_id'
    },

    depends: [
        'Subject'
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE Semester(
                id INT PRIMARY KEY AUTO_INCREMENT,
                number INT NOT NULL,
                year INT NOT NULL,
                subject_id INT NOT NULL,
                FOREIGN KEY(subject_id) REFERENCES Subject(id),
                UNIQUE(number, year, subject_id)
            );
        `)

        const semesters = [
            { number: 1, year: 2019, subjectId: 1 },
            { number: 3, year: 2019, subjectId: 1 },
            { number: 1, year: 2020, subjectId: 1 },
        ]

        for (const semester of semesters) {
            await db.query(`
                INSERT INTO Semester (number, year, subject_id)
                VALUES (?, ?, ?);
            `, [semester.number, semester.year, semester.subjectId])
        }
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Semester`)
    },

    select: {
        single: {
            async selectById(db, id) {
                return db.query(`SELECT * FROM Semester WHERE id = ?`, [id])
            },
        },
        many: {
            async selectAll(db) {
                return db.query(`SELECT * FROM Semester`)
            },
        }
    },

    insert: {
        async insert(db, semester) {
            await db.query(`
                INSERT INTO Semester(number, year, subject_id)
                VALUES(?, ?, ?)
            `, [semester.number, semester.year, semester.subjectId])
        },
    },

    update: {
        updateById: {
            checkBefore: 'selectById',
            fn: async (db, id, semester) => {
                await db.query(`
                    UPDATE Semester
                    SET number = ?, year = ?, subject_id = ?
                    WHERE id = ?
                `, [semester.number, semester.year, semester.subjectId, id])
            }
        }
    },

    delete: {
        deleteById: {
            checkBefore: 'selectById',
            fn: async (db, id) => {
                await db.query(`DELETE FROM Semester WHERE id = ?`, [id])
            }
        }
    }
})
