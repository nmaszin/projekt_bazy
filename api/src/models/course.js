import { createModel } from '@/models'

export default createModel({
    name: 'Course',

    fields: {
        name: 'name',
        semesterId: 'semester_id'
    },

    depends: [
        'Semester'
    ],

    rows: [
        { name: 'Analiza matematyczna', semesterId: 1 },
        { name: 'Logika obliczeniowa', semesterId: 1 },
        { name: 'Metody probablistyczne', semesterId: 2 }
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE Course(
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                semester_id INT NOT NULL,
                FOREIGN KEY(semester_id) REFERENCES Semester(id)
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Course`)
    }
})
