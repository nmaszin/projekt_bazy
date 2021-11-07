import { createModel } from '@/models'

export default createModel({
    name: 'Laboratory',

    fields: {
        name: 'name',
        facultyId: 'faculty_id'
    },

    depends: [
        'Faculty'
    ],

    rows: [
        { name: 'Zakład Algorytmów i Struktur Danych', facultyId: 1 },
        { name: 'Zakład o piwo', facultyId: 2 },
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE Laboratory(
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                faculty_id INT NOT NULL,
                FOREIGN KEY(faculty_id) REFERENCES Faculty(id)
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Laboratory`)
    }
})
