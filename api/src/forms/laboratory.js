import { createForm } from '@/forms'
import Faculty from '@/models/faculty'

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
        facultyId: {
            chain: [
                { presence: true },
                { type: 'integer' },
                { validIdentifier: true },
                { foreignKey: Faculty }
            ]
        }
    },
})
