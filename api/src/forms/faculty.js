import { createForm } from '@/forms'

export default createForm({
    constraints: {
        name: {
            presence: true,
            length: { minimum: 1, maximum: 100 }
        },
        address: {
            presence: true,
            length: { minimum: 1, maximum: 100 }
        }
    },
})
