import { createForm } from '@/forms'
import Floor from '@/models/floor'

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
                        greaterThan: 0
                    }
                }
            ]
        },
        capacity: {
            chain: [
                { presence: true },
                { type: 'integer' },
                { 
                    numericality: {
                        onlyInteger: true,
                        noStrings: true,
                        greaterThan: 0
                    }
                }
            ]
        },
        cost: {
            chain: [
                { presence: true },
                { 
                    numericality: {
                        noStrings: true,
                        greaterThan: 0
                    }
                }
            ]
        },
        floorId: {
            chain: [
                { presence: true },
                { type: 'integer' },
                { validIdentifier: true },
                { foreignKey: Floor }
            ]
        }
    },
})
