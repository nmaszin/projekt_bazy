import { createForm } from '@/forms'

/*
    address: 'address'
*/

export default createForm({
    constraints: {
        pesel: {
            chain: [
                { presence: true },
                { length: { is: 11 } },
                {
                    format: {
                        pattern: /[0-9]{11}/,
                        message: 'have to consist of digits'
                    }
                }
            ]
        },

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
