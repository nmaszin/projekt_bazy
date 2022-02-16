import { createModel } from '@/models'

export default createModel({
    name: 'CourseView',

    fields: {
        courseName: 'course_name',
        semesterNumber: 'semester_number',
        semesterYear: 'semester_year',
        subjectName: 'subject_name',
        facultyName: 'faculty_name',
        semesterId: 'semester_id',
        subjectId: 'subject_id',
        facultyId: 'faculty_id'
    },

    depends: [
        'Course',
        'Semester',
        'Subject',
        'Faculty'
    ],

    async initialize(db) {
        await db.query(`
            CREATE VIEW CourseView AS
            SELECT
                Course.id AS id,
                Course.name AS course_name,
                Semester.number AS semester_number,
                Semester.year AS semester_year,
                Subject.name AS subject_name,
                Faculty.name AS faculty_name,
                semester_id,
                subject_id,
                faculty_id
            FROM Course
            INNER JOIN Semester ON Semester.id = Course.semester_id
            INNER JOIN Subject ON Subject.id = Semester.subject_id
            INNER JOIN Faculty ON Faculty.id = Subject.faculty_id
            ORDER by Course.id;
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP VIEW CourseView`)
    },
})
