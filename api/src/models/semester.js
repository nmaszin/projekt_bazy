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

    rows: [
        { number: 1, year: 2019, subjectId: 1 },
        { number: 3, year: 2019, subjectId: 1 },
        { number: 1, year: 2020, subjectId: 1 },
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE Semester(
                id INT PRIMARY KEY AUTO_INCREMENT,
                number INT NOT NULL,
                year INT NOT NULL,
                subject_id INT NOT NULL,
                FOREIGN KEY(subject_id) REFERENCES Subject(id) ON DELETE CASCADE,
                UNIQUE(number, year, subject_id)
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Semester`)
    }
})
