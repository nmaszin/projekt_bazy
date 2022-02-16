import { createModel } from '@/models'

export default createModel({
    name: 'LuckyStudent',

    fields: {
        date: 'date',
        groupId: 'group_id',
        studentId: 'student_id'
    },

    depends: [
        'GGroup',
        'Student'
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE LuckyStudent(
                id INT PRIMARY KEY AUTO_INCREMENT,
                date DATE NOT NULL,
                group_id INT NOT NULL,
                student_id INT NOT NULL,
                FOREIGN KEY(group_id) REFERENCES GGroup(id) ON DELETE CASCADE,
                FOREIGN KEY(student_id) REFERENCES Student(id) ON DELETE CASCADE
            );
        `)

        await db.query(`
            CREATE FUNCTION getRandomStudentFromGroup(p_group_id INT) RETURNS INT
            BEGIN
                DECLARE result INT;

                SELECT id INTO result
                FROM Student
                WHERE group_id = p_group_id
                ORDER BY RAND()
                LIMIT 1;

                RETURN result;
            END
        `)

        await db.query(`
            CREATE PROCEDURE randomizeLuckyStudentForGroup(p_group_id INT, p_date DATE)
            BEGIN
                DECLARE v_student_id INT;

                SELECT getRandomStudentFromGroup(p_group_id)
                INTO v_student_id;

                INSERT INTO LuckyStudent(date, group_id, student_id)
                VALUES(p_date, p_group_id, v_student_id);
            END
        `)

        await db.query(`
            CREATE PROCEDURE randomizeLuckyStudentsForAllGroups(p_date DATE)
            BEGIN
                DECLARE done INT DEFAULT FALSE;
                DECLARE gid INT;
                DECLARE cur CURSOR FOR SELECT DISTINCT group_id FROM Student;
                DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

                OPEN cur;
                l: LOOP
                    FETCH cur INTO gid;
                    IF done = TRUE THEN
                        LEAVE l;
                    END IF;
                    CALL randomizeLuckyStudentForGroup(gid, p_date);
                END LOOP;
                CLOSE cur;
            END
        `)

        await db.query(`
            CREATE EVENT lucky_student_event
            ON SCHEDULE EVERY 1 DAY
            STARTS CURRENT_TIMESTAMP
            DO
            BEGIN
                CALL randomizeLuckyStudentsForAllGroups(CURRENT_DATE);
            END
        `)

        await db.query(`
            CREATE FUNCTION getCurrentLuckyStudentId(p_group_id INT) RETURNS INT
            BEGIN
                DECLARE result INT;

                SELECT student_id INTO result
                FROM LuckyStudent
                WHERE group_id = p_group_id
                ORDER BY date
                LIMIT 1;

                RETURN result;
            END
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP FUNCTION getCurrentLuckyStudentId`)
        await db.query(`DROP EVENT lucky_student_event`)
        await db.query(`DROP PROCEDURE IF EXISTS randomizeLuckyStudentsForAllGroups`)
        await db.query(`DROP PROCEDURE IF EXISTS randomizeLuckyStudentForGroup`)
        await db.query(`DROP FUNCTION IF EXISTS getRandomStudentFromGroup`)
        await db.query(`DROP TABLE LuckyStudent`)
    },

    select: {
        single: {
            async selectByGroupId(db, groupId) {
                await db.query(`
                    SELECT * FROM LuckyStudent
                    WHERE group_id = ?
                    ORDER BY date
                    LIMIT 1
                `)
            }
        }
    }
})
