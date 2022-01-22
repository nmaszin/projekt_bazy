import { createModel } from '@/models'

export default createModel({
    name: 'Person',

    fields: {
        pesel: 'pesel',
        firstName: 'first_name',
        lastName: 'last_name',
        address: 'address'
    },

    rows: [
        { pesel: '11111111111', firstName: 'Eryk', lastName: 'Andrzejewski', address: 'ul. Piotrowo 1' },
        { pesel: '33333333333', firstName: 'Konrad', lastName: 'Bankiewicz', address: 'ul. Piotrowo 2' },
        { pesel: '44444444444', firstName: 'Paweł', lastName: 'Błoch', address: 'ul. Piotrowo 3' },
        { pesel: '99700000112', firstName: 'Zbigniew', lastName: 'Walczak', address: '740WE' },
        { pesel: '00000000000', firstName: 'Jan', lastName: 'Badura', address: 'HackerRank' }
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE Person(
                id INT PRIMARY KEY AUTO_INCREMENT,
                pesel CHAR(11) NOT NULL,
                first_name VARCHAR(30) NOT NULL,
                last_name VARCHAR(30) NOT NULL,
                address VARCHAR(100) NOT NULL,
                UNIQUE(pesel)
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Person`)
    }
})
