import { createModel } from '@/models'

export default createModel({
    name: 'LaboratoryView',

    fields: {
        laboratoryName: 'laboratory_name',
        facultyName: 'faculty_name',
        facultyAddress: 'faculty_address',
        managerDegree: 'manager_degree',
        managerFirstName: 'manager_first_name',
        managerLastName: 'manager_last_name',
        facultyId: 'faculty_id',
        managerId: 'manager_id',
    },

    depends: [
        'Laboratory',
        'Faculty',
        'Person',
        'Employee'
    ],

    async initialize(db) {
        await db.query(`
            CREATE VIEW LaboratoryView AS
            SELECT
                Laboratory.id as id,
                Laboratory.name AS laboratory_name,
                Faculty.name AS faculty_name,
                Faculty.address AS faculty_address,
                Employee.degree AS manager_degree,
                Person.first_name AS manager_first_name,
                Person.last_name AS manager_last_name,
                faculty_id,
                manager_id
            FROM Laboratory
            INNER JOIN Faculty ON Faculty.id = Laboratory.faculty_id
            INNER JOIN Employee ON Employee.id = Laboratory.manager_id
            INNER JOIN Person ON Person.id = Employee.id
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP VIEW LaboratoryView`)
    },
})
