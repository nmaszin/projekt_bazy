import { createModel } from '@/models'

export default createModel({
    name: 'GroupView',

    fields: {
        name: 'name',
        semesterId: 'semester_id',
        luckyStudentId: 'lucky_student_id'
    },

    depends: [
        'GGroup',
        'LuckyStudent'
    ],

    async initialize(db) {
        await db.query(`
            CREATE VIEW GroupView AS
            SELECT id, name, semester_id, (SELECT student_id FROM LuckyStudent WHERE group_id = GGroup.id ORDER BY date LIMIT 1) as lucky_student_id
            FROM GGroup
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP VIEW GroupView`)
    },
})
