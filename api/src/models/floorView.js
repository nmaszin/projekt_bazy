import { createModel } from '@/models'

export default createModel({
    name: 'FloorView',

    fields: {
        floorNumber: 'floor_number',
        dormitoryName: 'dormitory_name',
        dormitoryAddress: 'dormitory_address',
        dormitoryId: 'dormitory_id',
    },

    depends: [
        'Dormitory',
        'Floor'
    ],

    async initialize(db) {
        await db.query(`
            CREATE VIEW FloorView AS
            SELECT
                Floor.id AS id,
                number AS floor_number,
                Dormitory.name AS dormitory_name,
                Dormitory.address AS dormitory_address,
                dormitory_id
            FROM Floor
            INNER JOIN Dormitory ON Dormitory.id = Floor.dormitory_id
            ORDER by Floor.id;
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP VIEW FloorView`)
    },
})
