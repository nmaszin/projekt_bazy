import Dormitory from '@/models/dormitory'
import DormitoryForm from '@/forms/dormitory'
import { generateEndpoint } from '@/endpoints'

export default generateEndpoint('/dormitories', Dormitory, DormitoryForm)
