import { createModel } from '@/models'

export default createModel({
    name: 'EmployeeCourse',

    fields: {
        employeeId: 'employee_id',
        courseId: 'course_id'
    },

    depends: [
        'Employee',
        'Course',
    ],

    rows: [
        { employeeId: 4, courseId: 1 },
        { employeeId: 5, courseId: 4 }
    ],

    async initialize(db) {
        await db.query(`
            CREATE TABLE EmployeeCourse(
                id INT PRIMARY KEY AUTO_INCREMENT,
                employee_id INT NOT NULL,
                course_id INT NOT NULL,
                FOREIGN KEY(employee_id) REFERENCES Employee(id) ON DELETE CASCADE,
                FOREIGN KEY(course_id) REFERENCES Course(id) ON DELETE CASCADE
            );
        `)
    },

    async deinitialize(db) {
        await db.query(`DROP TABLE EmployeeCourse`)
    }
})
