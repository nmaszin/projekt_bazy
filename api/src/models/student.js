import { createModel } from '@/models'
import Person from '@/models/person'

export default createModel({
    name: 'Student',

    fields: {
        identifier: 'identifier',
        degree: 'degree',
        personId: 'id',
        groupId: 'group_id'
    },

    depends: [
        'Person',
        'GGroup'
    ],

    rows: [
        { identifier: '145277', degree: 'tech.', personId: 1, groupId: 1 },
        { identifier: '145265', personId: 2, groupId: 1 },
        { identifier: '145375', personId: 3, groupId: 1 }
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE Student(
                id INT PRIMARY KEY,
                identifier VARCHAR(10) NOT NULL,
                degree VARCHAR(30),
                group_id INT NULL,
                FOREIGN KEY(id) REFERENCES Person(id) ON DELETE CASCADE,
                FOREIGN KEY(group_id) REFERENCES GGroup(id) ON DELETE SET NULL
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Student`)
    }
})
