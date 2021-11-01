export function notFoundRoute (req, res) {
    res.status(404).send({
        message: 'Unknown route'
    })
}

export function catchErrors(controller) {
    return async (req, res, next) => {
        try {
            await controller(req, res, next)
        } catch (err) {
            res.status(err.status || 500).send({
                message: err.message
            })
        }
    }
}
