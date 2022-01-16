import Card from '@/models/card'
import CardForm from '@/forms/card'
import { generateEndpoint } from '@/endpoints'

export default generateEndpoint('/cards', Card, CardForm)
