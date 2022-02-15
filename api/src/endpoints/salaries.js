import Salary from '@/models/salary'
import SalaryForm from '@/forms/salary'
import { generateEndpoint } from '@/endpoints'

export default generateEndpoint('/salaries', Salary, SalaryForm)
