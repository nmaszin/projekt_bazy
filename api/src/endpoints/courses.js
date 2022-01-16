import Course from '@/models/course'
import CourseForm from '@/forms/course'
import { generateEndpoint } from '@/endpoints'

export default generateEndpoint('/courses', Course, CourseForm)
