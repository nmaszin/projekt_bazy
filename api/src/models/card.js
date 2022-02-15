import { createModel } from '@/models'

export default createModel({
    name: 'Card',

    fields: {
        dateOfIssue: 'date_of_issue',
        expiryDate: 'expiry_date',
        studentId: 'id'
    },

    depends: [
        'Student'
    ],

    rows: [
        { dateOfIssue: '2019-10-1', expiryDate: '2023-9-30', studentId: 1 },
        { dateOfIssue: '2019-10-1', expiryDate: '2023-9-30', studentId: 2 },
        { dateOfIssue: '2019-10-1', expiryDate: '2023-9-30', studentId: 3 }
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE Card(
                id INT PRIMARY KEY,
                date_of_issue DATE NOT NULL,
                expiry_date DATE NOT NULL,
                FOREIGN KEY(id) REFERENCES Student(id) ON DELETE CASCADE
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Card`)
    }
})
