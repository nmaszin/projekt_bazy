import Floor from '@/models/floor'
import FloorForm from '@/forms/floor'
import { generateEndpoint } from '@/endpoints'

export default generateEndpoint('/floors', Floor, FloorForm)
