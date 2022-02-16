import { createModel } from '@/models'

export default createModel({
    name: 'SemesterView',

    fields: {
        semesterNumber: 'semester_number',
        semesterYear: 'semester_year',
        subjectName: 'subject_name',
        facultyName: 'faculty_name',
        facultyAddress: 'faculty_address',
        subjectId: 'subject_id',
        facultyId: 'faculty_id'
    },

    depends: [
        'Semester',
        'Subject',
        'Faculty'
    ],

    async initialize(db) {
        await db.query(`
            CREATE VIEW SemesterView AS
            SELECT
                Semester.id AS id,
                number AS semester_number,
                year AS semester_year,
                Subject.name AS subject_name,
                Faculty.name AS faculty_name,
                Faculty.address AS faculty_address,
                subject_id,
                faculty_id
            FROM Semester
            INNER JOIN Subject ON Subject.id = Semester.subject_id
            INNER JOIN Faculty ON Faculty.id = Subject.faculty_id
            ORDER by Semester.id;
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP VIEW SemesterView`)
    },
})
