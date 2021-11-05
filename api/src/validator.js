import validatejs from 'validate.js'

validatejs.validators.validIdentifier = value => {
    const requirement = Number.isInteger(value) && value >= 1
    if (!requirement) {
        return "is not valid identifier"
    }
}

validatejs.validators.foreignKey = async (id, model) => {
    const record = await model.selectById(id)
    if (record === undefined) {
        return "refers to non existing record"
    }
}

export default validatejs
