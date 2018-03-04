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
import { 
    getContacts, 
    getContactsSuccess, 
    getContactsFailure, 
    changeContact, 
    addContactSuccess, 
    addContactFailure, 
    updateContactSuccess, 
    updateContactFailure, 
    removeContactSuccess, 
    removeContactFailure, 
    fetchContacts,
    updateContact,
    deleteContact
} from './actions';
import { initialState as contactsInitialState } from '../reducers/contactsReducer';
import { contactsEndpoint, contactsPath } from '../../firebaseConfig';

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

const initialState = {
    contacts: {
        ...contactsInitialState
    }
}

describe('Action Creators', () => {
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

describe('Async Actions', () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('should fetch contacts successfully', async () => {
        fetchMock.getOnce(contactsEndpoint, {
            body: {
                '1': {
                    'name': {
                        'first': 'John',
                        'last': 'Doe'
                    },
                    'phone': '123456789',
                    'email': 'john.doe@gmail.com'
                },
                '2': {
                    'name': {
                        'first': 'Jane',
                        'last': 'Maurie'
                    },
                    'phone': '987654321'
                }
            },
            headers: {
                'content-type': 'application/json'
            }
        });

        const expectedActions = [
            { type: FETCHING_CONTACTS },
            { 
                type: FETCHING_CONTACTS_SUCCESS,
                payload: [
                    {
                        id: '1',
                        name: {
                            first: 'John',
                            last: 'Doe'
                        },
                        phone: '123456789',
                        email: 'john.doe@gmail.com'
                    },
                    {
                        id: '2',
                        name: {
                            first: 'Jane',
                            last: 'Maurie'
                        },
                        phone: '987654321'
                    }
                ]
            }
        ];

        const store = mockStore(undefined);

        await store.dispatch(fetchContacts());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should fail to fetch contacts', async () => {
        fetchMock.getOnce(contactsEndpoint, {
            throws: 'Unknown server error'
        });

        const expectedActions = [
            { type: FETCHING_CONTACTS },
            {
                type: FETCHING_CONTACTS_FAILURE,
                payload: 'Unknown server error'
            }
        ];

        const store = mockStore(undefined);

        await store.dispatch(fetchContacts());
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should create a new contact successfully', async () => {
        fetchMock.postOnce(contactsEndpoint, {
            body: {
                'name': '1'
            },
            headers: {
                'content-type': 'application/json'
            }
        });

        fetchMock.getOnce(contactsPath + '1.json', {
            body: {
                'name': {
                    'first': 'Jane',
                    'last': 'Doe'
                },
                'phone': '123456789'
            },
            headers: {
                'content-type': 'application/json'
            }
        });

        const expectedActions = [
            { type: UPLOADING_CONTACT },
            { 
                type: UPLOADING_NEW_CONTACT_SUCCESS,
                payload: {
                    id: '1',
                    name: {
                        first: 'Jane',
                        last: 'Doe'
                    },
                    phone: '123456789'
                }
            }
        ];

        const store = mockStore(initialState);

        await store.dispatch(updateContact({
            name: {
                first: 'Jane',
                last: 'Doe'
            },
            phone: '123456789'
        }, () => {}));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should fail to create a new contact', async () => {
        fetchMock.postOnce(contactsEndpoint, {
            throws: 'Unknown server error'
        });

        const expectedActions = [
            { type: UPLOADING_CONTACT },
            { 
                type: UPLOADING_NEW_CONTACT_FAILURE,
                payload: 'Unknown server error'
            }
        ];

        const store = mockStore(initialState);

        await store.dispatch(updateContact({
            name: {
                first: 'Jane',
                last: 'Doe'
            },
            phone: '123456789'
        }, () => {}));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should successfully update a contact', async () => {
        const preloadedState = {
            contacts: {
                ...initialState.contacts,
                contacts: [
                    {
                        id: '1',
                        name: {
                            first: 'Jane',
                            last: 'Doe'
                        },
                        phone: '123456789'
                    }
                ]
            }
        };

        fetchMock.patchOnce(contactsPath + '1.json', {
            status: 200
        });

        const expectedActions = [
            { type: UPLOADING_CONTACT },
            {
                type: UPLOADING_UPDATED_CONTACT_SUCCESS,
                payload: {
                    id: '1',
                    name: {
                        first: 'Janet',
                        last: 'Duet'
                    },
                    phone: '987654321'
                }
            }
        ];

        const store = mockStore(preloadedState);

        await store.dispatch(updateContact({
            id: '1',
            name: {
                first: 'Janet',
                last: 'Duet'
            },
            phone: '987654321'
        }, () => {}));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should fail to update a contact', async () => {
        const preloadedState = {
            contacts: {
                ...initialState.contacts,
                contacts: [
                    {
                        id: '1',
                        name: {
                            first: 'Jane',
                            last: 'Doe'
                        },
                        phone: '123456789'
                    }
                ]
            }
        };

        fetchMock.patchOnce(contactsPath + '1.json', {
            throws: 'Unknown server error'
        });

        const expectedActions = [
            { type: UPLOADING_CONTACT },
            { 
                type: UPLOADING_UPDATED_CONTACT_FAILURE,
                payload: 'Unknown server error'
            }
        ];

        const store = mockStore(preloadedState);

        await store.dispatch(updateContact({
            id: '1',
            name: {
                first: 'Jane',
                last: 'Doe'
            },
            phone: '123456789'
        }, () => {}));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should successfully delete a contact', async () => {
        const preloadedState = {
            contacts: {
                ...initialState.contacts,
                contacts: [
                    {
                        id: '1',
                        name: {
                            first: 'Jane',
                            last: 'Doe'
                        },
                        phone: '123456789'
                    }
                ]
            }
        };

        fetchMock.deleteOnce(contactsPath + '1.json', {
            status: 200
        });

        const expectedActions = [
            { type: UPLOADING_CONTACT },
            {
                type: DELETING_CONTACT_SUCCESS,
                payload: '1'
            }
        ];

        const store = mockStore(preloadedState);

        await store.dispatch(deleteContact('1', () => {}));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should fail to delete a non-existing contact', async () => {
        const expectedActions = [
            { type: UPLOADING_CONTACT },
            {
                type: DELETING_CONTACT_FAILURE,
                payload: 'The contact you tried to delete does not exist.'
            }
        ];

        const store = mockStore(initialState);

        await store.dispatch(deleteContact('1', () => {}));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should fail to delete an existing contact', async () => {
        const preloadedState = {
            contacts: {
                ...initialState.contacts,
                contacts: [
                    {
                        id: '1',
                        name: {
                            first: 'Jane',
                            last: 'Doe'
                        },
                        phone: '123456789'
                    }
                ]
            }
        };
        
        fetchMock.deleteOnce(contactsPath + '1.json', {
            throws: 'Unknown server error'
        });

        const expectedActions = [
            { type: UPLOADING_CONTACT },
            { 
                type: DELETING_CONTACT_FAILURE,
                payload: 'Unknown server error'
            }
        ];

        const store = mockStore(preloadedState);

        await store.dispatch(deleteContact('1', () => {}));
        expect(store.getActions()).toEqual(expectedActions);
    });
});