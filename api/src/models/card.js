import { createModel } from '@/models'

export default createModel({
    name: 'Card',

    fields: {
        dateOfIssue: 'date_of_issue',
        expiryDate: 'expiry_date',
        studentId: 'student_id'
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
                id INT PRIMARY KEY AUTO_INCREMENT,
                date_of_issue DATE NOT NULL,
                expiry_date DATE NOT NULL,
                student_id INT NOT NULL,
                FOREIGN KEY(student_id) REFERENCES Student(id),
                UNIQUE(student_id)
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Card`)
    }
})
