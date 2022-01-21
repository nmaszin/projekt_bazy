import { createModel } from '@/models'

export default createModel({
    name: 'Floor',

    fields: {
        number: 'number',
        dormitoryId: 'dormitory_id'
    },

    depends: [
        'Dormitory'
    ],

    rows: [
        { number: 0, dormitoryId: 1 },
        { number: 1, dormitoryId: 1 },
        { number: 2, dormitoryId: 1 },
        { number: 3, dormitoryId: 1 },
        { number: 0, dormitoryId: 2 },
        { number: 1, dormitoryId: 2 },
        { number: 2, dormitoryId: 2 }
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE Floor(
                id INT PRIMARY KEY AUTO_INCREMENT,
                number INT NOT NULL,
                dormitory_id INT NOT NULL,
                FOREIGN KEY(dormitory_id) REFERENCES Dormitory(id),
                UNIQUE(number, dormitory_id)
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Floor`)
    }
})
