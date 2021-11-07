import database from '@/services/database'

export function genericMapRow(row, mapping) {
    const { id } = row
    const data = Object.fromEntries(
        Object.entries(mapping)
            .map(([modelKey, dbKey]) => [modelKey, row[dbKey]])
            .filter(([_, value]) => value !== undefined)
    )

    return { id, data }
}

export function flattenSelect(row) {
    return {
        id: row.id,
        ...row.data
    }
}

export function injectDb(callback) {
    return async (...params) => {
        const db = await database.connect()
        return callback(db, ...params)
    }
}

export function createModel(object) {
    const checkIfAlreadyExists = method => {
        if (method !== undefined) {
            throw new Error(`Method ${method} already exists in model`)
        }
    }

    const model = {
        name: object.name,
        depends: object.depends === undefined ? [] : object.depends,

        initialize: injectDb(object.initialize),
        deinitialize: injectDb(object.deinitialize)
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
            model[name] = async (...params) => {
                const [rows, _] = await injectDb(fn)(...params)
                return rows.insertId
            }
        }
    }


    [object.update, object.delete].forEach(entry => {
        if (entry !== undefined) {
            for (const [name, fn] of Object.entries(entry)) {
                checkIfAlreadyExists(model[name])
                model[name] = async (...params) => {
                    const [fields, _] = await injectDb(fn)(...params)
                    return fields.affectedRows > 0
                }
            }
        }
    })

    return model
}
