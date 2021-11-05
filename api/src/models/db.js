import { createModel } from '@/models'
import Student from '@/models/student'

export default createModel({    
    async initialize(db) {
        await Student.initialize()
    },

    async deinitialize(db) {
        await Student.deinitialize()
    }
})
