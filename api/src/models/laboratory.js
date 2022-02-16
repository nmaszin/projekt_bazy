import { createModel } from '@/models'

export default createModel({
    name: 'Laboratory',

    fields: {
        name: 'name',
        facultyId: 'faculty_id',
        managerId: 'manager_id'
    },

    depends: [
        'Faculty'
    ],

    rows: [
        { name: 'Zakład Algorytmów i Struktur Danych', facultyId: 1, managerId: 4 },
        { name: 'Zakład o piwo', facultyId: 2, managerId: 5 },
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE Laboratory(
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                faculty_id INT,
                manager_id INT,
                FOREIGN KEY(faculty_id) REFERENCES Faculty(id) ON DELETE SET NULL,
                FOREIGN KEY(manager_id) REFERENCES Employee(id) ON DELETE SET NULL,
                UNIQUE(name)
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Laboratory`)
    }
})
