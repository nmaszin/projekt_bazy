import validator from '@/validator'

export function createForm(object) {
    return {
        validate: async data => validator(data, object.constraints)
    }
}
