import { createModel } from '@/models'

export default createModel({
    name: 'GGroup',

    fields: {
        name: 'name',
        semesterId: 'semester_id'
    },

    depends: [
        'Semester'
    ],

    rows: [
        { name: 'I3.1', semesterId: 1 },
        { name: 'I3.2', semesterId: 1 },
        { name: 'I3.1', semesterId: 2 }
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE GGroup(
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                semester_id INT NOT NULL,
                FOREIGN KEY(semester_id) REFERENCES Semester(id),
                UNIQUE(name, semester_id)
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE GGroup`)
    },
})
