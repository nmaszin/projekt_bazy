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

export function flattenSelect(row) {
    return {
        id: row.id,
        ...row.data
    }
}


export function injectDb(model) {
    return Object.fromEntries(
        Object.entries(model)
            .map(([name, callback]) => [name, async (...params) => {
                const db = await database.connect()
                return await callback(db, ...params)
            }])
    )
}

export function createModel(object) {
    const checkIfAlreadyExists = method => {
        if (method !== undefined) {
            throw new Error(`Method ${method} already exists in model`)
        }
    }

    const model = {
        initialize: object.initialize,
        deinitialize: object.deinitialize
    }

    if (object.select !== undefined) {
        if (object.select.single !== undefined) {
            for (const [name, fn] of Object.entries(object.select.single)) {
                checkIfAlreadyExists(model[name])
                model[name] = async (...params) => {
                    const [rows, _] = await fn(...params)
                    return rows.map(row => genericMapRow(row, object.fields))[0]
                }
            }
        }

        if (object.select.many !== undefined) {
            for (const [name, fn] of Object.entries(object.select.many)) {
                checkIfAlreadyExists(model[name])
                model[name] = async (...params) => {
                    const [rows, _] = await fn(...params)
                    return rows.map(row => genericMapRow(row, object.fields))
                }
            }
        }
    }

    if (object.insert !== undefined) {
        for (const [name, fn] of Object.entries(object.insert)) {
            checkIfAlreadyExists(model[name])
            model[name] = fn
        }
    }


    [object.update, object.delete].forEach(entry => {
        if (entry !== undefined) {
            for (const [name, { checkBefore, fn }] of Object.entries(entry)) {
                checkIfAlreadyExists(model[name])
                model[name] = async (...params) => {
                    if ((await model[checkBefore](...params)) === undefined) {
                        return false
                    }
    
                    await fn(...params)
                    return true
                }
            }
        }
    })

    return injectDb(model)
}
