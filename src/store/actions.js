import {
    FETCHING_CONTACTS, 
    FETCHING_CONTACTS_SUCCESS, 
    FETCHING_CONTACTS_FAILURE,
    UPLOADING_CONTACT,
    UPLOADING_NEW_CONTACT_SUCCESS,
    UPLOADING_NEW_CONTACT_FAILURE,
    UPLOADING_UPDATED_CONTACT_SUCCESS,
    UPLOADING_UPDATED_CONTACT_FAILURE,
    DELETING_CONTACT_SUCCESS,
    DELETING_CONTACT_FAILURE
} from './constants';

//import axios from 'axios';

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
            //let contacts = await axios.get(contactsEndpoint);
            let contacts = await fetch(contactsEndpoint);
            contacts = await contacts.json();

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

export function deleteContact(id, goBack) {
    return async (dispatch, getState) => {
        dispatch(changeContact());

        const contacts = getState().contacts.contacts;

        const contactExists = contacts.find((contact) => id === contact.id);

        if (!contactExists) {
            dispatch(removeContactFailure('The contact you tried to delete does not exist.'));
            return;
        }

        try {
            await fetch(contactsPath + id + '.json', { method: 'DELETE' });
            //await axios.delete(contactsPath + id + '.json');
            dispatch(removeContactSuccess(id));

            goBack();
        } catch (err) {
            dispatch(removeContactFailure(err.toString()));
        }
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
            //await axios.patch(contactsPath + id + '.json', changedFields);
            await fetch(contactsPath + id + '.json', {
                method: 'PATCH',
                body: JSON.stringify(changedFields),
                headers: {
                    'content-type': 'application/json'
                }
            });
            dispatch(updateContactSuccess(contact));
        } catch (err) {
            dispatch(updateContactFailure(err.toString()));
        }
    }
}

async function _createContact(dispatch, contactDetails) {
    try {
        // let createdContactId = await axios.post(contactsEndpoint, {
        //     ...contactDetails
        // });
        let createdContactId = await fetch(contactsEndpoint, {
            method: 'POST',
            body: JSON.stringify({ ...contactDetails }),
            headers: {
                'content-type': 'application/json'
            }
        });
        createdContactId = await createdContactId.json();
        createdContactId = createdContactId.name;
        // let createdContact = await axios.get(
        //     contactsPath + createdContactId + '.json'
        // );
        let createdContact = await fetch(contactsPath + createdContactId + '.json');
        createdContact = await createdContact.json();
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

export function getContacts() {
    return {
        type: FETCHING_CONTACTS
    };
}

export function getContactsSuccess(contacts) {
    return {
        type: FETCHING_CONTACTS_SUCCESS,
        payload: contacts
    };
}

export function getContactsFailure(err) {
    return {
        type: FETCHING_CONTACTS_FAILURE,
        payload: err
    };
}

export function changeContact() {
    return {
        type: UPLOADING_CONTACT
    };
}

export function addContactSuccess(contact) {
    return {
        type: UPLOADING_NEW_CONTACT_SUCCESS,
        payload: contact
    };
}

export function addContactFailure(err) {
    return {
        type: UPLOADING_NEW_CONTACT_FAILURE,
        payload: err
    };
}

export function updateContactSuccess(contact) {
    return {
        type: UPLOADING_UPDATED_CONTACT_SUCCESS,
        payload: contact
    }
}

export function updateContactFailure(err) {
    return {
        type: UPLOADING_UPDATED_CONTACT_FAILURE,
        payload: err
    }
}

export function removeContactSuccess(id) {
    return {
        type: DELETING_CONTACT_SUCCESS,
        payload: id
    }
}

export function removeContactFailure(err) {
    return {
        type: DELETING_CONTACT_FAILURE,
        payload: err
    }
}