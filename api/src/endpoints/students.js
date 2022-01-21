import Student from '@/models/student'
import StudentForm from '@/forms/student'
import { generateEndpoint } from '@/endpoints'

export default generateEndpoint('/students', Student, StudentForm)
