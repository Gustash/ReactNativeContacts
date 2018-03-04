import { FETCHING_CONTACTS, FETCHING_CONTACTS_SUCCESS, FETCHING_CONTACTS_FAILURE, UPLOADING_CONTACT, UPLOADING_NEW_CONTACT_SUCCESS, UPLOADING_NEW_CONTACT_FAILURE, UPLOADING_UPDATED_CONTACT_SUCCESS, UPLOADING_UPDATED_CONTACT_FAILURE, DELETING_CONTACT_SUCCESS, DELETING_CONTACT_FAILURE } from './constants';
import { getContacts, getContactsSuccess, getContactsFailure, changeContact, addContactSuccess, addContactFailure, updateContactSuccess, updateContactFailure, removeContactSuccess, removeContactFailure } from './actions';


describe('Actions', () => {
    it('should create a fetching contacts action', () => {
        const expectedAction = {
            type: FETCHING_CONTACTS
        };

        expect(getContacts()).toEqual(expectedAction);
    });

    it('should create a fetching contacts success action', () => {
        const expectedAction = {
            type: FETCHING_CONTACTS_SUCCESS,
            payload: [
                {
                    id: 1,
                    name: {
                        first: 'John',
                        last: 'Doe'
                    },
                    phone: '123456789',
                    email: 'john.doe@gmail.com'
                }
            ]
        };

        expect(getContactsSuccess([
            {
                id: 1,
                name: {
                    first: 'John',
                    last: 'Doe'
                },
                phone: '123456789',
                email: 'john.doe@gmail.com'
            }
        ])).toEqual(expectedAction);
    });

    it('should create a fetching contacts failure action', () => {
        const expectedAction = {
            type: FETCHING_CONTACTS_FAILURE,
            payload: 'Unknown server error'
        };

        expect(getContactsFailure('Unknown server error')).toEqual(expectedAction);
    });

    it('should create an updating contacts action', () => {
        const expectedAction = {
            type: UPLOADING_CONTACT
        };

        expect(changeContact()).toEqual(expectedAction);
    });

    it('should create an add contact success action', () => {
        const expectedAction = {
            type: UPLOADING_NEW_CONTACT_SUCCESS,
            payload: {
                id: 1,
                name: {
                    first: 'John',
                    last: 'Doe'
                },
                phone: '123456789',
                email: 'john.doe@gmail.com'
            }
        };

        expect(addContactSuccess({
            id: 1,
            name: {
                first: 'John',
                last: 'Doe'
            },
            phone: '123456789',
            email: 'john.doe@gmail.com'
        })).toEqual(expectedAction);
    });

    it('should create an add contact failure action', () => {
        const expectedAction = {
            type: UPLOADING_NEW_CONTACT_FAILURE,
            payload: 'Device is offline'
        };

        expect(addContactFailure('Device is offline')).toEqual(expectedAction);
    });

    it('should create an update contact success action', () => {
        const expectedAction = {
            type: UPLOADING_UPDATED_CONTACT_SUCCESS,
            payload: {
                id: 1,
                name: {
                    first: 'John',
                    last: 'Doe'
                },
                phone: '123456789',
                email: 'john.doe@gmail.com'
            }
        };

        expect(updateContactSuccess({
            id: 1,
            name: {
                first: 'John',
                last: 'Doe'
            },
            phone: '123456789',
            email: 'john.doe@gmail.com'
        })).toEqual(expectedAction);
    });

    it('should create an update contact failure action', () => {
        const expectedAction = {
            type: UPLOADING_UPDATED_CONTACT_FAILURE,
            payload: 'Unknown server error'
        };

        expect(updateContactFailure('Unknown server error')).toEqual(expectedAction);
    });

    it('should create a remove contact success action', () => {
        const expectedAction = {
            type: DELETING_CONTACT_SUCCESS,
            payload: 1
        };

        expect(removeContactSuccess(1)).toEqual(expectedAction);
    });

    it('should create a remove contact failure action', () => {
        const expectedAction = {
            type: DELETING_CONTACT_FAILURE,
            payload: 'Device is offline'
        };

        expect(removeContactFailure('Device is offline')).toEqual(expectedAction);
    });
});