import { createModel } from '@/models'

export default createModel({
    name: 'FacultyView',

    fields: {
        name: 'name',
        address: 'address'
    },

    depends: [
        'Faculty'
    ],

    async initialize(db) {
        await db.query(`
            CREATE VIEW FacultyView AS
            SELECT
                id,
                name,
                address
            FROM Faculty
            ORDER by id;
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP VIEW FacultyView`)
    },
})
