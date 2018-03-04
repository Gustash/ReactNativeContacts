import reducer, { initialState } from './contactsReducer';
import { FETCHING_CONTACTS, FETCHING_CONTACTS_SUCCESS, FETCHING_CONTACTS_FAILURE, UPLOADING_CONTACT, UPLOADING_NEW_CONTACT_SUCCESS, UPLOADING_NEW_CONTACT_FAILURE, UPLOADING_UPDATED_CONTACT_SUCCESS, UPLOADING_UPDATED_CONTACT_FAILURE, DELETING_CONTACT_SUCCESS, DELETING_CONTACT_FAILURE } from '../store/constants';

describe('Contacts Reducer', () => {
    it('should default to the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should start fetching contacts and empty existing ones', () => {
        const preloadedState = {
            ...initialState,
            isFetching: false,
            contacts: [
                {
                    id: 1,
                    name: {
                        first: 'John',
                        last: 'Doe'
                    },
                    phone: '123456789'
                },
                {
                    id: 2,
                    name: {
                        first: 'Jane',
                        last: 'Mark'
                    },
                    phone: '987654321',
                    email: 'jane.mark@test.com'
                }
            ]
        };

        const expectedState = {
            ...initialState,
            isFetching: true,
            contacts: []
        };

        const action = {
            type: FETCHING_CONTACTS
        };

        expect(reducer(preloadedState, action)).toEqual(expectedState);
    });

    it('should successfully fetch contacts', () => {
        const expectedState = {
            ...initialState,
            isFetching: false,
            contacts: [
                {
                    id: 2,
                    name: {
                        first: 'John',
                        last: 'Doe'
                    },
                    phone: '123456789'
                },
                {
                    id: 1,
                    name: {
                        first: 'Jane',
                        last: 'Mark'
                    },
                    phone: '987654321',
                    email: 'jane.mark@test.com'
                }
            ]
        };

        const preloadedState = {
            ...initialState,
            isFetching: true
        };

        const action = {
            type: FETCHING_CONTACTS_SUCCESS,
            payload: [
                {
                    id: 1,
                    name: {
                        first: 'Jane',
                        last: 'Mark'
                    },
                    phone: '987654321',
                    email: 'jane.mark@test.com'
                },
                {
                    id: 2,
                    name: {
                        first: 'John',
                        last: 'Doe'
                    },
                    phone: '123456789'
                },
            ]
        };

        expect(reducer(preloadedState, action)).toEqual(expectedState);
    });

    it('should handle fetching of a single object', () => {
        const preloadedState = {
            ...initialState,
            isFetching: true,
            contacts: []
        };

        const expectedState = {
            ...initialState,
            isFetching: false,
            contacts: [
                {
                    id: 1,
                    name: {
                        first: 'Jane',
                        last: 'Mark'
                    },
                    phone: '987654321',
                    email: 'jane.mark@test.com'
                }
            ]
        };

        const action = {
            type: FETCHING_CONTACTS_SUCCESS,
            payload: {
                id: 1,
                name: {
                    first: 'Jane',
                    last: 'Mark'
                },
                phone: '987654321',
                email: 'jane.mark@test.com'
            }
        };

        expect(reducer(preloadedState, action)).toEqual(expectedState);
    });

    it('should fail to fetch contacts and log error', () => {
        const preloadedState = {
            ...initialState,
            isFetching: true
        };

        let expectedState = {
            ...initialState,
            isFetching: false,
            errors: ['Unknown server error']
        };

        let action = {
            type: FETCHING_CONTACTS_FAILURE,
            payload: 'Unknown server error'
        };

        expect(reducer(preloadedState, action)).toEqual(expectedState);

        const carriedState = { ...expectedState };

        expectedState = {
            ...expectedState,
            errors: ['Unknown server error', 'Device is offline']
        };

        action = {
            type: FETCHING_CONTACTS_FAILURE,
            payload: 'Device is offline'
        };

        expect(reducer(carriedState, action)).toEqual(expectedState);
    });

    it('should start uploading a contact', () => {
        const expectedState = {
            ...initialState,
            isUploading: true
        };

        const action = {
            type: UPLOADING_CONTACT
        };

        expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should successfully upload and add new contact', () => {
        const preloadedState = {
            ...initialState,
            isUploading: true,
            contacts: [
                {
                    id: 2,
                    name: {
                        first: 'John',
                        last: 'Doe'
                    },
                    phone: '123456789'
                },
                {
                    id: 1,
                    name: {
                        first: 'Jane',
                        last: 'Mark'
                    },
                    phone: '987654321',
                    email: 'jane.mark@test.com'
                }
            ]
        };

        const expectedState = {
            ...initialState,
            isUploading: false,
            contacts: [
                {
                    id: 2,
                    name: {
                        first: 'John',
                        last: 'Doe'
                    },
                    phone: '123456789'
                },
                {
                    id: 3,
                    name: {
                        first: 'Gene',
                        last: 'Fritz'
                    },
                    phone: '135792468'
                },
                {
                    id: 1,
                    name: {
                        first: 'Jane',
                        last: 'Mark'
                    },
                    phone: '987654321',
                    email: 'jane.mark@test.com'
                }
            ]
        };

        const action = {
            type: UPLOADING_NEW_CONTACT_SUCCESS,
            payload: {
                id: 3,
                name: {
                    first: 'Gene',
                    last: 'Fritz'
                },
                phone: '135792468'
            }
        };

        expect(reducer(preloadedState, action)).toEqual(expectedState);
    });

    it('should fail to upload a new contact and log an error', () => {
        const preloadedState = {
            ...initialState,
            isUploading: true,
            errors: ['Unknown server error']
        };

        const expectedState = {
            ...initialState,
            isUploading: false,
            errors: ['Unknown server error', 'Device is offline']
        };

        const action = {
            type: UPLOADING_NEW_CONTACT_FAILURE,
            payload: 'Device is offline'
        };

        expect(reducer(preloadedState, action)).toEqual(expectedState);
    });

    it('should successfully update contact', () => {
        const preloadedState = {
            ...initialState,
            isUploading: true,
            contacts: [
                {
                    id: 2,
                    name: {
                        first: 'John',
                        last: 'Doe'
                    },
                    phone: '123456789'
                },
                {
                    id: 1,
                    name: {
                        first: 'Jane',
                        last: 'Mark'
                    },
                    phone: '987654321',
                    email: 'jane.mark@test.com'
                }
            ]
        };

        const expectedState = {
            ...initialState,
            isUploading: false,
            contacts: [
                {
                    id: 1,
                    name: {
                        first: 'Jane',
                        last: 'April'
                    },
                    phone: '987654321',
                },
                {
                    id: 2,
                    name: {
                        first: 'John',
                        last: 'Doe'
                    },
                    phone: '123456789'
                },
            ]
        };

        const action = {
            type: UPLOADING_UPDATED_CONTACT_SUCCESS,
            payload: 
            {
                id: 1,
                name: {
                    first: 'Jane',
                    last: 'April'
                },
                phone: '987654321',
            }
        };

        expect(reducer(preloadedState, action)).toEqual(expectedState);
    });

    it('should fail to update contact and log error', () => {
        const preloadedState = {
            ...initialState,
            isUploading: true,
            errors: ['Unknown server error']
        };

        const expectedState = {
            ...initialState,
            isUploading: false,
            errors: ['Unknown server error', 'Device is offline']
        };

        const action = {
            type: UPLOADING_UPDATED_CONTACT_FAILURE,
            payload: 'Device is offline'
        };

        expect(reducer(preloadedState, action)).toEqual(expectedState);
    });

    it('should successfully delete contact', () => {
        const preloadedState = {
            ...initialState,
            isUploading: true,
            contacts: [
                {
                    id: 2,
                    name: {
                        first: 'John',
                        last: 'Doe'
                    },
                    phone: '123456789'
                },
                {
                    id: 1,
                    name: {
                        first: 'Jane',
                        last: 'Mark'
                    },
                    phone: '987654321',
                    email: 'jane.mark@test.com'
                }
            ]
        };

        const expectedState = {
            ...initialState,
            isUploading: false,
            contacts: [
                {
                    id: 1,
                    name: {
                        first: 'Jane',
                        last: 'Mark'
                    },
                    phone: '987654321',
                    email: 'jane.mark@test.com'
                }
            ]
        };

        const action = {
            type: DELETING_CONTACT_SUCCESS,
            payload: 2
        };

        expect(reducer(preloadedState, action)).toEqual(expectedState);
    });

    it('should fail to delete a contact and log an error', () => {
        const preloadedState = {
            ...initialState,
            isUploading: true,
            errors: ['Unknown server error']
        };

        const expectedState = {
            ...initialState,
            isUploading: false,
            errors: ['Unknown server error', 'Device is offline']
        };

        const action = {
            type: DELETING_CONTACT_FAILURE,
            payload: 'Device is offline'
        };

        expect(reducer(preloadedState, action)).toEqual(expectedState);
    });
});