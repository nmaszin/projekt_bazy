import { createModel } from '@/models'

export default createModel({
    name: 'Employee',

    fields: {
        degree: 'degree',
        personId: 'id'
    },

    rows: [
        { degree: 'dr', personId: 4 },
        { degree: 'mgr inż.', personId: 5 },
    ],

    depends: [
        'Person'
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE Employee(
                id INT PRIMARY KEY,
                degree VARCHAR(30) NOT NULL,
                FOREIGN KEY (id) REFERENCES Person(id)
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Employee`)
    }
})
