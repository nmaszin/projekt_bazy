import { createModel } from '@/models'

export default createModel({
    name: 'Dormitory',

    fields: {
        name: 'name',
        address: 'address'
    },

    async initialize(db) {
        await db.query(`
            CREATE TABLE Dormitory(
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                address VARCHAR(100) NOT NULL
            );
        `)

        const dormitories = [
            { name: 'DS1', address: 'ul. Kórnicka 1, 12-345 Poznań' },
            { name: 'DS2', address: 'ul. Kórnicka 2, 12-345 Poznań' },
            { name: 'DS3', address: 'ul. Kórnicka 3, 12-345 Poznań' },
        ]

        for (const dormitory of dormitories) {
            await db.query(`
                INSERT INTO Dormitory (name, address)
                VALUES (?, ?);
            `, [dormitory.name, dormitory.address])
        }
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Dormitory`)
    }
})
