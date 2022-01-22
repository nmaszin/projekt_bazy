import { createForm } from '@/forms'
import Person from '@/models/person'

export default createForm({
    constraints: {
        degree: {
            chain: [
                { presence: true },
                { type: 'string' },
                { length: { minimum: 1, maximum: 30 } },
                {
                    format: {
                        pattern: /[\p{L}\p{P}]*/u,
                        message: 'have to consist of letters or punctuation'
                    }
                }
            ],
        },
        personId: {
            chain: [
                { presence: true },
                { type: 'integer' },
                { validIdentifier: true },
                { foreignKey: Person }
            ]
        }
    },
})
