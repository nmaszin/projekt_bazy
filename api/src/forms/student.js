import { createForm } from '@/forms'
import Person from '@/models/person'
import Group from '@/models/group'

export default createForm({
    constraints: {
        identifier: {
            chain: [
                { presence: true },
                { length: { minimum: 5, maximum: 10 } },
                {
                    format: {
                        pattern: /[0-9]{5,10}/,
                        message: 'have to consist of digits'
                    }
                }
            ],
        },
        degree: {
            chain: [
                { type: 'string' },
                { length: { minimum: 1, maximum: 30 } },
                {
                    format: {
                        pattern: /[\p{L}\p{P} ]*/u,
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
        },
        groupId: {
            chain: [
                { presence: true },
                { type: 'integer' },
                { validIdentifier: true },
                { foreignKey: Group }
            ]
        }
    },
})
