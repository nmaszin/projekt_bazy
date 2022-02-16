import { createModel } from '@/models'

export default createModel({
    name: 'DormitoryView',

    fields: {
        name: 'name',
        address: 'address'
    },

    depends: [
        'Dormitory'
    ],

    async initialize(db) {
        await db.query(`
            CREATE VIEW DormitoryView AS
            SELECT
                Dormitory.id AS id,
                name,
                address
            FROM Dormitory
            ORDER by Dormitory.id;
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP VIEW DormitoryView`)
    },
})
