import { Router } from 'express'
import { flattenSelect } from '@/models'
import { controller } from '@/middlewares/controller'
import { jwtAuth } from '@/middlewares/auth'
import { atLeastReader } from '@/middlewares/roles'

import PersonView from '@/models/personView'
import StudentView from '@/models/studentView'
import EmployeeView from '@/models/employeeView'
import FacultyView from '@/models/facultyView'
import LaboratoryView from '@/models/laboratoryView'
import SalaryView from '@/models/salaryView'
import SubjectView from '@/models/subjectView'
import CourseView from '@/models/courseView'
import DormitoryView from '@/models/dormitoryView'
import FloorView from '@/models/floorView'
import RoomView from '@/models/roomView'
import GroupView from '@/models/groupView'
import CardView from '@/models/cardView'
import ClubView from '@/models/clubView'
import SemesterView from '@/models/semesterView'

const views = {
    people: PersonView,
    students: StudentView,
    employees: EmployeeView,
    faculties: FacultyView,
    laboratories: LaboratoryView,
    salaries: SalaryView,
    subjects: SubjectView,
    courses: CourseView,
    dormitories: DormitoryView,
    floors: FloorView,
    rooms: RoomView,
    groups: GroupView,
    cards: CardView,
    clubs: ClubView,
    semesters: SemesterView
}


const router = Router()

Object.entries(views)
    .forEach(([path, model]) => {
        router.get(`/views/${path}`,
            jwtAuth,
            atLeastReader,
            controller(async (req, res) => {
                const data = await model.selectAll()
                res.status(200).send({
                    data: data.map(flattenSelect)
                })
            })
        )
    })

export default router
