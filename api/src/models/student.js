import { createModel } from '@/models'

export default createModel({
    name: 'Student',

    fields: {
        firstName: 'first_name',
        lastName: 'last_name'
    },

    rows: [
        { firstName: 'Eryk', lastName: 'Andrzejewski' },
        { firstName: 'Konrad', lastName: 'Bankiewicz' },
        { firstName: 'Paweł', lastName: 'Błoch' }
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE Student(
                id INT PRIMARY KEY AUTO_INCREMENT,
                first_name VARCHAR(30) NOT NULL,
                last_name VARCHAR(30) NOT NULL
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Student`)
    }
})
