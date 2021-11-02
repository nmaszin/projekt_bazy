export function modelValidator(model) {
    return (req, res, next) => {
        const validationErrors = model.validate(req.body)
        if (validationErrors !== undefined) {
            return res.status(400).send({
                message: 'Validation error',
                errors: validationErrors
            })
        }

        next()
    }
}
