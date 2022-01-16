import { createForm } from '@/forms'

export default createForm({
    constraints: {
        username: {
            chain: [
                { presence: true },
                { type: 'string' },
                { length: { minimum: 1, maximum: 30 } },
                {
                    format: {
                        pattern: /[A-Za-z0-9_-]*/u,
                        message: 'have to consist of small/capital letters, digits, _ or - character'
                    }
                }
            ],
        },
        password: {
            chain: [
                { presence: true },
                { type: 'string' },
                { length: { minimum: 8 } },
            ],
        }
    },
})
