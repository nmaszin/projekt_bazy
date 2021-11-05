export function modelValidator(model) {
    return async (req, res, next) => {
        const validationErrors = await model.validate(req.body)

        if (validationErrors !== undefined) {
            return res.status(400).send({
                message: 'Validation error',
                errors: validationErrors
            })
        }

        next()
    }
}
