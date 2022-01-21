import Semester from '@/models/semester'
import SemesterForm from '@/forms/semester'
import { generateEndpoint } from '@/endpoints'

export default generateEndpoint('/semesters', Semester, SemesterForm)
