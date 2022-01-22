import { createForm } from '@/forms'
import Employee from '@/models/employee'

export default createForm({
    constraints: {
        baseSalary: {
            chain: [
                { presence: true },
                { 
                    numericality: {
                        noStrings: true,
                        greaterThan: 0
                    }
                }
            ]
        },
        yearBonus: {
            chain: [
                { presence: true },
                { 
                    numericality: {
                        noStrings: true,
                        greaterThan: 0
                    }
                }
            ]
        },
        employeeId: {
            chain: [
                { presence: true },
                { type: 'integer' },
                { validIdentifier: true },
                { foreignKey: Employee }
            ]
        }
    },
})
