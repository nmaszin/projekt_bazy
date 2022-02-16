import { createModel } from '@/models'

export default createModel({
    name: 'EmployeeView',

    fields: {
        pesel: 'pesel',
        firstName: 'first_name',
        lastName: 'last_name',
        address: 'address',
        degree: 'degree'
    },

    depends: [
        'Employee',
        'Person',
    ],

    async initialize(db) {
        await db.query(`
            CREATE VIEW EmployeeView AS
            SELECT
                Employee.id AS id,
                pesel,
                first_name,
                last_name,
                Person.address AS address,
                degree
            FROM Employee
            INNER JOIN Person ON Person.id = Employee.id
            ORDER by Employee.id;
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP VIEW EmployeeView`)
    },
})
