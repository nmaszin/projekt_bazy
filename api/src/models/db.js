import { createModel } from '@/models'
import Student from '@/models/student'
import Faculty from '@/models/faculty'
import Laboratory from '@/models/laboratory'

export default createModel({    
    async initialize() {
        await Promise.all([Student, Faculty, Laboratory].map(x => x.initialize()))
            .catch(err => console.log(err))
    },

    async deinitialize() {
        await Promise.all([Student, Faculty, Laboratory].map(x => x.deinitialize()))
            .catch(err => console.log(err))
    }
})
