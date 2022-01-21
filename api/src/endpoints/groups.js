import Group from '@/models/group'
import GroupForm from '@/forms/group'
import { generateEndpoint } from '@/endpoints'

export default generateEndpoint('/groups', Group, GroupForm)
