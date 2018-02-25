import {
    FETCHING_CONTACTS, 
    FETCHING_CONTACTS_SUCCESS, 
    FETCHING_CONTACTS_FAILURE,
    UPLOADING_CONTACT,
    UPLOADING_NEW_CONTACT_SUCCESS,
    UPLOADING_NEW_CONTACT_FAILURE,
    UPLOADING_UPDATED_CONTACT_SUCCESS,
    UPLOADING_UPDATED_CONTACT_FAILURE,
} from './constants';

import axios from 'axios';

import { 
    // URI to the firebase database endpoint json
    contactsEndpoint,
    // URI path to the firebase database endpoint
    contactsPath
} from '../../firebaseConfig';

// THUNKS

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
        dispatch(changeContact());

        const { id, ...contactDetails } = contact;
        const contacts = getState().contacts.contacts;

        const existingContact = contacts.find(
            ({ id }) => contact.id === id
        );

        if (existingContact) {
            await _updateContact(dispatch, contact, existingContact);
        } else {
            await _createContact(dispatch, contactDetails);
        }

        goBack();
    }
}

// HELPERS
async function _updateContact(dispatch, contact, existingContact) {
    const { id, name, phone, email } = contact;
    const { first, last } = name;

    let contactWasUpdated = false;
    let changedFields = {
        name: {}
    };

    // Fill up changedFields, if anything changed
    if (existingContact.name.first !== first) {
        changedFields = {
            name: {
                first,
                last: existingContact.name.last,
            }
        }
        contactWasUpdated = true;
    }

    if (existingContact.name !== last) {
        changedFields = {
            name: {
                first: (changedFields.name.first || existingContact.name.first),
                last
            }
        }
        contactWasUpdated = true;
    }

    if (existingContact.phone !== phone) {
        changedFields = {
            ...changedFields,
            phone
        }
        contactWasUpdated = true;
    }

    if (existingContact.email !== email) {
        changedFields = {
            ...changedFields,
            email
        }
        contactWasUpdated = true;
    }

    // Send PATCH request if anything was changed
    if (contactWasUpdated) {
        try {
            await axios.patch(contactsPath + id + '.json', changedFields);
            dispatch(updateContactSuccess(contact));
        } catch (err) {
            dispatch(updateContactFailure(err.toString()));
        }
    }
}

async function _createContact(dispatch, contactDetails) {
    try {
        let createdContactId = await axios.post(contactsEndpoint, {
            ...contactDetails
        });
        createdContactId = createdContactId.data.name;
        let createdContact = await axios.get(
            contactsPath + createdContactId + '.json'
        );
        createdContact = createdContact.data;
        createdContact = {
            ...createdContact,
            id: createdContactId
        }
        dispatch(addContactSuccess(createdContact));
    } catch (err) {
        dispatch(addContactFailure(err.toString()));
    }
}

// ACTIONS

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

function changeContact() {
    return {
        type: UPLOADING_CONTACT
    };
}

function addContactSuccess(contact) {
    return {
        type: UPLOADING_NEW_CONTACT_SUCCESS,
        payload: contact
    };
}

function addContactFailure(err) {
    return {
        type: UPLOADING_NEW_CONTACT_FAILURE,
        payload: err
    };
}

function updateContactSuccess(contact) {
    return {
        type: UPLOADING_UPDATED_CONTACT_SUCCESS,
        payload: contact
    }
}

function updateContactFailure(err) {
    return {
        type: UPLOADING_UPDATED_CONTACT_FAILURE,
        payload: err
    }
}