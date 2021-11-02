import database from '@/database'

export function genericMapRow(row, mapping) {
    const { id } = row
    const data = Object.fromEntries(
        Object.entries(mapping)
            .map(([modelKey, dbKey]) => [modelKey, row[dbKey]])
            .filter(([_, value]) => value !== undefined)
    )

    return { id, data }
}

export function injectDb(method) {
    return async (...params) => {
        const db = await database.connect()
        return await method(db, ...params)
    }
}

export function createModel(object) {
    const checkIfAlreadyExists = method => {
        if (method !== undefined) {
            throw new Error(`Method ${method} already exists in model`)
        }
    }

    const model = {
        initialize: async (...params) => injectDb(object.initialize)(...params),
        deinitialize: async (...params) => injectDb(object.deinitialize)(...params)
    }

    if (object.select !== undefined) {
        if (object.select.single !== undefined) {
            for (const [name, fn] of Object.entries(object.select.single)) {
                checkIfAlreadyExists(model[name])
                model[name] = async (...params) => {
                    const [rows, _] = await injectDb(fn)(...params)
                    return rows.map(row => genericMapRow(row, object.fields))[0]
                }
            }
        }

        if (object.select.many !== undefined) {
            for (const [name, fn] of Object.entries(object.select.many)) {
                checkIfAlreadyExists(model[name])
                model[name] = async (...params) => {
                    const [rows, _] = await injectDb(fn)(...params)
                    return rows.map(row => genericMapRow(row, object.fields))
                }
            }
        }
    }

    if (object.insert !== undefined) {
        for (const [name, fn] of Object.entries(object.insert)) {
            checkIfAlreadyExists(model[name])
            model[name] = async (...params) => await injectDb(fn)(...params)
        }
    }

    if (object.delete !== undefined) {
        for (const [name, fn] of Object.entries(object.delete)) {
            checkIfAlreadyExists(model[name])
            model[name] = async (...params) => await injectDb(fn)(...params)
        }
    }

    if (object.update !== undefined) {
        for (const [name, fn] of Object.entries(object.update)) {
            checkIfAlreadyExists(model[name])
            model[name] = async (...params) => await injectDb(fn)(...params)
        }
    }

    return model
}
