import { createModel } from '@/models'

export default createModel({
    name: 'ClubView',

    fields: {
        clubName: 'club_name',
        clubAddress: 'club_address',
        leaderDegree: 'leader_degree',
        leaderFirstName: 'leader_first_name',
        leaderLastName: 'leader_last_name',
    },

    depends: [
        'Club',
        'Person',
        'Employee'
    ],

    async initialize(db) {
        await db.query(`
            CREATE VIEW ClubView AS
            SELECT
                Club.id AS id,
                Club.name AS club_name,
                Club.address AS club_address,
                Employee.degree AS leader_degree,
                Person.first_name AS leader_first_name,
                Person.last_name AS leader_last_name
            FROM Club
            INNER JOIN Employee ON Employee.id = Club.leader_id
            INNER JOIN Person ON Person.id = Employee.id
            ORDER BY Club.id
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP VIEW ClubView`)
    },
})
