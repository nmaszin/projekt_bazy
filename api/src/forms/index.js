import validator from '@/validator'

async function validatorWrapper(data, constraints) {
    const errors = await new Promise(resolve =>
        validator.async(data, constraints)
            .then(() => resolve())
            .catch(errors => resolve(errors))
    )

    const redundantFieldsErrors = {}
    for (const attribute of Object.keys(data)) {
        if (constraints[attribute] === undefined) {
            redundantFieldsErrors[attribute] = ['Redundant attribute']
        }
    }

    if (errors !== undefined) {
        return { ...errors, ...redundantFieldsErrors }
    } else if (Object.keys(redundantFieldsErrors).length > 0) {
        return redundantFieldsErrors
    } else {
        return undefined
    }
}

export function createForm(object) {
    return {
        validate: async data => validatorWrapper(data, object.constraints)
    }
}
