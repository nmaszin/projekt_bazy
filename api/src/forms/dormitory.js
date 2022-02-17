import { createForm } from '@/forms'

// TODO: checing types
export default createForm({
    constraints: {
        name: {
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
        }
    },
})
