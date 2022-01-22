import Employee from '@/models/employee'
import EmployeeForm from '@/forms/employee'
import { generateEndpoint } from '@/endpoints'

export default generateEndpoint('/employees', Employee, EmployeeForm)
