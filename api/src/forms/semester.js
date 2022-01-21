import { createForm } from '@/forms'
import Subject from '@/models/subject'

export default createForm({
    constraints: {
        number: {
            presence: true,
            numericality: {
                onlyInteger: true,
                noStrings: true,
                greaterThan: 0
            }
        },
        year: {
            presence: true,
            numericality: {
                onlyInteger: true,
                noStrings: true,
                greaterThan: 0
            }
        },
        subjectId: {
            chain: [
                { presence: true },
                { type: 'integer' },
                { validIdentifier: true },
                { foreignKey: Subject }
            ]
        }
    },
})
