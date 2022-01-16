import { createForm } from '@/forms'
import Dormitory from '@/models/dormitory'

export default createForm({
    constraints: {
        number: {
            chain: [
                { presence: true },
                { type: 'integer' },
                { 
                    numericality: {
                        onlyInteger: true,
                        noStrings: true,
                        greaterThanOrEqualTo: 0
                    }
                }
            ]
        },
        dormitoryId: {
            chain: [
                { presence: true },
                { type: 'integer' },
                { validIdentifier: true },
                { foreignKey: Dormitory }
            ]
        }
    },
})
