import Faculty from '@/models/faculty'
import FacultyForm from '@/forms/faculty'
import { generateEndpoint } from '@/endpoints'

export default generateEndpoint('/faculties', Faculty, FacultyForm)
