import { createModel } from '@/models'
import Person from '@/models/person'

export default createModel({
    name: 'Student',

    fields: {
        identifier: 'identifier',
        degree: 'degree',
        personId: 'id'
    },

    depends: [
        'Person'
    ],

    rows: [
        { identifier: '145277', degree: 'tech.', personId: 1 },
        { identifier: '145265', personId: 2 },
        { identifier: '145375', personId: 3 }
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE Student(
                id INT PRIMARY KEY,
                identifier VARCHAR(10) NOT NULL,
                degree VARCHAR(30),
                FOREIGN KEY(id) REFERENCES Person(id)
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Student`)
    }
})
