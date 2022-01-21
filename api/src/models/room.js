import { createModel } from '@/models'

export default createModel({
    name: 'Room',

    fields: {
        number: 'number',
        capacity: 'capacity',
        cost: 'cost',
        floorId: 'floor_id'
    },

    depends: [
        'Floor'
    ],

    rows: [
        { number: 11, capacity: 3, cost: 400, floorId: 1 },
        { number: 12, capacity: 2, cost: 600, floorId: 1 },
        { number: 13, capacity: 3, cost: 400, floorId: 1 },
        { number: 68, capacity: 4, cost: 300, floorId: 2 },
        { number: 69, capacity: 4, cost: 300, floorId: 2 }
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE Room(
                id INT PRIMARY KEY AUTO_INCREMENT,
                number INT NOT NULL,
                capacity INT NOT NULL,
                cost INT NOT NULL,
                floor_id INT NOT NULL,
                FOREIGN KEY(floor_id) REFERENCES Floor(id),
                UNIQUE(number, floor_id)
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Room`)
    }
})
