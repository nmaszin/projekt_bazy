import { createModel } from '@/models'

export default createModel({
    name: 'Club',

    fields: {
        name: 'name',
        address: 'address',
        leaderId: 'leader_id'
    },

    depends: [
        'Employee'
    ],

    rows: [
        { name: 'AKAI', address: 'ul. Piotrowo 112', leaderId: 4 },
        { name: 'KN Edu Art', address: 'ul. Piotrowo 997', leaderId: 4 }
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE Club(
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                address VARCHAR(100) NOT NULL,
                leader_id INT,
                FOREIGN KEY(leader_id) REFERENCES Employee(id) ON DELETE SET NULL
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Club`)
    }
})
