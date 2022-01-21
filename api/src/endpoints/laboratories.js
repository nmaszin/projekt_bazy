import Laboratory from '@/models/laboratory'
import LaboratoryForm from '@/forms/laboratory'
import { generateEndpoint } from '@/endpoints'

export default generateEndpoint('/laboratories', Laboratory, LaboratoryForm)
