import { createModel } from '@/models'

export default createModel({
    name: 'SalaryView',

    fields: {
        pesel: 'pesel',
        firstName: 'first_name',
        lastName: 'last_name',
        address: 'address',
        degree: 'degree',
        baseSalary: 'base_salary',
        yearBonus: 'year_bonus'
    },

    depends: [
        'Salary',
        'Employee',
        'Person',
    ],

    async initialize(db) {
        await db.query(`
            CREATE VIEW SalaryView AS
            SELECT
                Employee.id AS id,
                pesel,
                first_name,
                last_name,
                Person.address AS address,
                degree,
                base_salary,
                year_bonus
            FROM Salary
            INNER JOIN Employee ON Employee.id = Salary.id
            INNER JOIN Person ON Person.id = Employee.id
            ORDER by Salary.id;
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP VIEW SalaryView`)
    },
})
