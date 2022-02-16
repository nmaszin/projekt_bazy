import { createModel } from '@/models'

export default createModel({
    name: 'StudentView',

    fields: {
        pesel: 'pesel',
        firstName: 'first_name',
        lastName: 'last_name',
        address: 'address',
        identifier: 'identifier',
        degree: 'degree',
        groupName: 'group_name',
        semesterNumber: 'semester_number',
        semesterYear: 'semester_year',
        subjectName: 'subject_name',
        facultyName: 'faculty_name',
        groupId: 'group_id',
        semesterId: 'semester_id',
        subjectId: 'subject_id',
        facultyId: 'faculty_id'
    },

    depends: [
        'Student',
        'Person',
        'GGroup',
        'Semester',
        'Subject',
        'Faculty'
    ],

    async initialize(db) {
        await db.query(`
            CREATE VIEW StudentView AS
            SELECT
                Student.id AS id,
                pesel,
                first_name,
                last_name,
                Person.address AS address,
                identifier,
                degree,
                GGroup.name AS group_name,
                Semester.number AS semester_number,
                Semester.year AS semester_year,
                Subject.name AS subject_name,
                Faculty.name AS faculty_name,
                group_id,
                semester_id,
                subject_id,
                faculty_id
            FROM Student
            INNER JOIN Person ON Person.id = Student.id
            INNER JOIN GGroup ON GGroup.id = Student.group_id
            INNER JOIN Semester ON Semester.id = GGroup.semester_id
            INNER JOIN Subject ON Subject.id = Semester.subject_id
            INNER JOIN Faculty ON Faculty.id = Subject.faculty_id
            ORDER by Student.id;
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP VIEW StudentView`)
    },
})
