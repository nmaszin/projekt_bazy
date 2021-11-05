import { createForm } from '@/forms'

export default createForm({
    constraints: {
        firstName: {
            presence: true,
            length: { minimum: 1, maximum: 30 }
        },
        lastName: {
            presence: true,
            length: { minimum: 1, maximum: 30 }
        }
    },
})
