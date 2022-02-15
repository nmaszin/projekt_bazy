import { createForm } from '@/forms'
import Employee from '@/models/employee'

export default createForm({
    constraints: {
        name: {
            chain: [
                { presence: true },
                { type: 'string' },
                { length: { minimum: 1, maximum: 100 } },
                {
                    format: {
                        pattern: /[ \p{L}]*/u,
                        message: 'have to consist of a letters and spaces'
                    }
                }
            ]
        },
        address: {
            chain: [
                { presence: true },
                { type: 'string' },
                { length: { minimum: 1, maximum: 100 } },
                {
                    format: {
                        pattern: /[ \p{L}\p{N}\p{P}]*/u,
                        message: 'have to consist of a letters, spaces, numbers and punctuation'
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
    }
})
