import { createModel } from '@/models'

export default createModel({
    name: 'PersonView',

    fields: {
        pesel: 'pesel',
        firstName: 'first_name',
        lastName: 'last_name',
        address: 'address'
    },

    depends: [
        'Person'
    ],

    async initialize(db) {
        await db.query(`
            CREATE VIEW PersonView AS
            SELECT id, pesel, first_name, last_name, address FROM Person
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP VIEW PersonView`)
    },
})
