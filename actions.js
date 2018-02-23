import { 
    ADD_CONTACT, 
    REMOVE_CONTACT, 
    FETCHING_CONTACTS, 
    FETCHING_CONTACTS_SUCCESS, 
    FETCHING_CONTACTS_FAILURE
} from './constants';

import axios from 'axios';

// URI to the firebase database endpoint
import { contactsEndpoint } from './firebaseConfig';

// export function createContact(contact) {
//     return (dispatch) => {
//         dispatch(addContact(contact));
//     };
// }

// export function deleteContact(id) {
//     return (dispatch) => {
//         dispatch(removeContact(id));
//     };
// }

export function fetchContacts() {
    return async (dispatch) => {
        dispatch(getContacts());

        try {
            let contacts = await axios.get(contactsEndpoint);
            contacts = contacts.data;

            // The Firebase REST API returns an object with objects
            // so we need to convert it to an array

            contacts = Object.keys(contacts).map(
                (key) => ({
                    id: key,
                    ...contacts[key]
                })
            );

            dispatch(getContactsSuccess(contacts));
        } catch (err) {
            dispatch(getContactsFailure(err.toString()));
        }
    };
}

function addContact(contact) {
    return {
        type: ADD_CONTACT,
        payload: contact
    };
}

function removeContact(id) {
    return {
        type: REMOVE_CONTACT,
        payload: id
    };
}

function getContacts() {
    return {
        type: FETCHING_CONTACTS
    };
}

function getContactsSuccess(contacts) {
    return {
        type: FETCHING_CONTACTS_SUCCESS,
        payload: contacts
    };
}

function getContactsFailure(err) {
    return {
        type: FETCHING_CONTACTS_FAILURE,
        payload: err
    };
}