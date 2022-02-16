import { createModel } from '@/models'

export default createModel({
    name: 'CardView',

    fields: {
        dateOfIssue: 'date_of_issue',
        expiryDate: 'expiry_date',
        ownerIdentifier: 'owner_identifier',
        ownerDegree: 'owner_degree',
        ownerFirstName: 'owner_first_name',
        ownerLastName: 'owner_last_name'
    },

    depends: [
        'Card',
        'Person',
        'Student'
    ],

    async initialize(db) {
        await db.query(`
            CREATE VIEW CardView AS
            SELECT
                Card.id AS id,
                date_of_issue,
                expiry_date,
                Student.identifier AS owner_identifier,
                Student.degree AS owner_degree,
                Person.first_name AS owner_first_name,
                Person.last_name AS owner_last_name
            FROM Card
            INNER JOIN Student ON Student.id = Card.id
            INNER JOIN Person ON Person.id = Student.id
            ORDER BY Card.id
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP VIEW CardView`)
    },
})
