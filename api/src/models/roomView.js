import { createModel } from '@/models'

export default createModel({
    name: 'RoomView',

    fields: {
        roomNumber: 'room_number',
        roomCapacity: 'room_capacity',
        roomCost: 'room_cost',
        floorNumber: 'floor_number',
        dormitoryName: 'dormitory_name',
        dormitoryAddress: 'dormitory_address',
        dormitoryId: 'dormitory_id',
        floorId: 'floor_id',
    },

    depends: [
        'Dormitory',
        'Floor',
        'Room'
    ],

    async initialize(db) {
        await db.query(`
            CREATE VIEW RoomView AS
            SELECT
                Room.id AS id,
                Room.number AS room_number,
                Room.capacity AS room_capacity,
                Room.cost AS room_cost,
                Floor.number AS floor_number,
                Dormitory.name AS dormitory_name,
                Dormitory.address AS dormitory_address,
                dormitory_id,
                floor_id
            FROM Room
            INNER JOIN Floor ON Floor.id = Room.floor_id
            INNER JOIN Dormitory ON Dormitory.id = Floor.dormitory_id
            ORDER by Room.id;
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP VIEW RoomView`)
    },
})
