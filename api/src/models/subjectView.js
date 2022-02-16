import { createModel } from '@/models'

export default createModel({
    name: 'SubjectView',

    fields: {
        subjectName: 'subject_name',
        facultyName: 'faculty_name',
        facultyId: 'faculty_id'
    },

    depends: [
        'Subject',
        'Faculty'
    ],

    async initialize(db) {
        await db.query(`
            CREATE VIEW SubjectView AS
            SELECT
                Subject.id AS id,
                Subject.name AS subject_name,
                Faculty.name AS faculty_name,
                faculty_id
            FROM Subject
            INNER JOIN Faculty ON Faculty.id = Subject.faculty_id
            ORDER by Subject.id;
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP VIEW SubjectView`)
    },
})
