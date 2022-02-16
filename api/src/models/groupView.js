import { createModel } from '@/models'

export default createModel({
    name: 'GroupView',

    fields: {
        groupName: 'group_name',
        luckyStudentId: 'lucky_student_id',
        semesterNumber: 'semester_number',
        semesterYear: 'semester_year',
        subjectName: 'subject_name',
        facultyName: 'faculty_name',
        facultyAddress: 'faculty_address',

        luckyStudentIdentifier: 'lucky_student_identifier',
        luckyStudentDegree: 'lucky_student_degree',
        luckyStudentFirstName: 'lucky_student_first_name',
        luckyStudentLastName: 'lucky_student_last_name',

        semesterId: 'semester_id',
        subjectId: 'subject_id',
        semesterId: 'semester_id'
    },

    depends: [
        'GGroup',
        'LuckyStudent',
        'Semester',
        'Student',
        'Person',
        'Subject',
        'Faculty'
    ],

    async initialize(db) {
        await db.query(`
            CREATE VIEW GroupView AS
            SELECT
                GGroup.id AS id,
                GGroup.name AS group_name,
                Semester.number AS semester_number,
                Semester.year AS semester_year,
                Subject.name AS subject_name,
                Faculty.name AS faculty_name,
                Faculty.address AS faculty_address,
                Student.degree AS lucky_student_degree,
                Student.identifier AS lucky_student_identifier,
                Person.first_name AS lucky_student_first_name,
                Person.last_name AS lucky_student_last_name,
                getCurrentLuckyStudentId(GGroup.id) AS lucky_student_id,
                semester_id,
                subject_id,
                faculty_id
            FROM GGroup
            LEFT OUTER JOIN Student ON Student.id = getCurrentLuckyStudentId(GGroup.id)
            LEFT OUTER JOIN Person ON Person.id = Student.id
            INNER JOIN Semester ON Semester.id = GGroup.semester_id
            INNER JOIN Subject ON Subject.id = Semester.subject_id
            INNER JOIN Faculty ON Faculty.id = Subject.faculty_id
            ORDER BY GGroup.id
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP VIEW GroupView`)
    },
})
