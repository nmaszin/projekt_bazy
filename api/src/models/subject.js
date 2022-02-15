import { createModel } from '@/models'

export default createModel({
    name: 'Subject',

    fields: {
        name: 'name',
        facultyId: 'faculty_id'
    },

    depends: [
        'Faculty'
    ],

    rows: [
        { name: 'Informatyka', facultyId: 1 },
        { name: 'Sztuczna inteligencja', facultyId: 1 },
        { name: 'Elektrotechnika', facultyId: 2 }
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE Subject(
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                faculty_id INT,
                FOREIGN KEY(faculty_id) REFERENCES Faculty(id) ON DELETE SET NULL
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Subject`)
    }
})
