import Book from '../../../../../assets/images/book.png';
import Envelope from '../../../../../assets/images/envelope.png';
import { ROUTE_ADD_NETWORK_MEMBERS_CONTACTS, ROUTE_ADD_NETWORK_MEMBERS_EMAIL } from '../../../../navigators/RouteNames';

export default [{
    label: 'Contacts',
    detail: 'Invite from your contacts',
    target: ROUTE_ADD_NETWORK_MEMBERS_CONTACTS,
    icon: Book,
},{
    label: 'Email',
    detail: 'Send email invitations',
    target: ROUTE_ADD_NETWORK_MEMBERS_EMAIL,
    icon: Envelope,
}]