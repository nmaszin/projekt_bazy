import { createModel } from '@/models'

export default createModel({
    name: 'Salary',

    fields: {
        baseSalary: 'base_salary',
        yearBonus: 'year_bonus',
        employeeId: 'id'
    },

    depends: [
        'Employee'
    ],

    rows: [
        { baseSalary: 997997, yearBonus: 112112, employeeId: 4 },
        { baseSalary: 100050, yearBonus: 314, employeeId: 5 },
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE Salary(
                id INT PRIMARY KEY,
                base_salary INT NOT NULL,
                year_bonus INT NOT NULL,
                FOREIGN KEY(id) REFERENCES Employee(id)
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE Salary`)
    }
})
