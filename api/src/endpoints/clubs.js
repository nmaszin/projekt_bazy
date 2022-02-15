import Club from '@/models/club'
import ClubForm from '@/forms/club'
import { generateEndpoint } from '@/endpoints'

export default generateEndpoint('/clubs', Club, ClubForm)
