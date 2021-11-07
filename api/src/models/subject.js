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

    async initialize(db) {
        await db.query(`
            CREATE TABLE Subject(
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                faculty_id INT NOT NULL,
                FOREIGN KEY(faculty_id) REFERENCES Faculty(id)
            );
        `)

        const subjects = [
            { name: 'Informatyka', facultyId: 1 },
            { name: 'Sztuczna inteligencja', facultyId: 1 },
            { name: 'Elektrotechnika', facultyId: 2 }
        ]

        for (const subject of subjects) {
            await db.query(`
                INSERT INTO Subject (name, faculty_id)
                VALUES (?, ?);
            `, [subject.name, subject.facultyId])
        }
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Subject`)
    }
})
