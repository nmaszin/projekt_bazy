import fs from 'fs'
import path from 'path'
import { Router } from 'express'

// The following function load all endpoints routers and bind them into a new one
// I assume that all files in current directory (except current file) are endpoints files
export async function loadAllEndpoints() {
    const currentFile = path.basename(__filename);
    const endpointsDirectory = path.dirname(__filename)

    const endpointFiles = fs.readdirSync(endpointsDirectory)
        .filter(filename => filename != currentFile)

    const router = Router()
    for (const endpointFile of endpointFiles) {
        const endpointRouter = (await import(`./${endpointFile}`)).default
        router.use(endpointRouter)
    }

    return router
}
