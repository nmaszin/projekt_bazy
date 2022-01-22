import Person from '@/models/person'
import PersonForm from '@/forms/person'
import { generateEndpoint } from '@/endpoints'

export default generateEndpoint('/people', Person, PersonForm)
