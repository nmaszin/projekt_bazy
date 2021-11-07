import Subject from '@/models/subject'
import SubjectForm from '@/forms/subject'
import { generateEndpoint } from '@/endpoints'

export default generateEndpoint('/subjects', Subject, SubjectForm)
