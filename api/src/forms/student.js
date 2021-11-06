import { createForm } from '@/forms'

export default createForm({
    constraints: {
        firstName: {
            chain: [
                { presence: true },
                { type: 'string' },
                { length: { minimum: 1, maximum: 30 } },
                {
                    format: {
                        pattern: /\p{L}*/u,
                        message: 'have to consist of letters'
                    }
                }
            ],
        },
        lastName: {
            chain: [
                { presence: true },
                { type: 'string' },
                { length: { minimum: 1, maximum: 30 } },
                {
                    format: {
                        pattern: /\p{L}*/u,
                        message: 'have to consist of letters'
                    }
                }
            ],
        }
    },
})
