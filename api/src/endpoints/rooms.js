import Room from '@/models/room'
import RoomForm from '@/forms/room'
import { generateEndpoint } from '@/endpoints'

export default generateEndpoint('/rooms', Room, RoomForm)
