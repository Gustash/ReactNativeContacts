import {
    FETCHING_CONTACTS, 
    FETCHING_CONTACTS_SUCCESS, 
    FETCHING_CONTACTS_FAILURE,
    UPLOADING_CONTACT,
    UPLOADING_CONTACT_SUCCESS,
    UPLOADING_CONTACT_FAILURE,
} from './constants';

import axios from 'axios';

import { 
    // URI to the firebase database endpoint json
    contactsEndpoint,
    // URI path to the firebase database endpoint
    contactsPath
} from './firebaseConfig';

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

export function updateContact(contact, goBack) {
    return async (dispatch, getState) => {
        dispatch(addContact());

        const { id, ...contactDetails } = contact;
        const contacts = getState().contacts.contacts;

        const contactExists = contacts.find(
            ({ id }) => contact.id === id
        );

        if (contactExists) {
            console.log('I found a contact!');
        } else {
            try {
                let createdContactId = await axios.post(contactsEndpoint, {
                    ...contactDetails
                });
                createdContactId = createdContactId.data.name;
                let createdContact = await axios.get(
                    contactsPath + createdContactId + '.json'
                );
                createdContact = createdContact.data;
                dispatch(addContactSuccess(createdContact));
                
                goBack();
            } catch (err) {
                dispatch(addContactFailure(err.toString()));
            }
        }
    }
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

function addContact() {
    return {
        type: UPLOADING_CONTACT
    };
}

function addContactSuccess(contact) {
    return {
        type: UPLOADING_CONTACT_SUCCESS,
        payload: contact
    };
}

function addContactFailure(err) {
    return {
        type: UPLOADING_CONTACT_FAILURE,
        payload: err
    };
}