import fs from 'fs'
import path from 'path'
import { Router } from 'express'
import { loadDirectoryModules } from '@/utils/directoryLoader';

// The following function load all endpoints routers and bind them into a new one
// I assume that all files in current directory (except current file) are endpoints files
export async function loadAllEndpoints() {
    const router = Router()
    const routers = await loadDirectoryModules(__dirname, ['index.js'])
    routers.forEach(r => router.use(r))
    return router
}
