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

export function injectDb(model) {
    return Object.fromEntries(
        Object.entries(model)
            .map(([name, callback]) => [name, async (...params) => {
                const db = await database.connect()
                return await callback(db, ...params)
            }])
    )
}
