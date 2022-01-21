import { createForm } from '@/forms'
import Student from '@/models/student'

export default createForm({
    constraints: {
        dateOfIssue: {
            chain: [
                { presence: true },
            ],
        },
        expiryDate: {
            chain: [
                { presence: true },
            ],
        },
        studentId: {
            chain: [
                { presence: true },
                { type: 'integer' },
                { validIdentifier: true },
                { foreignKey: Student }
            ]
        }
    },
})
