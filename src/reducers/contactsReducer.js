import { 
    FETCHING_CONTACTS, 
    FETCHING_CONTACTS_SUCCESS, 
    FETCHING_CONTACTS_FAILURE,
    UPLOADING_CONTACT,
    UPLOADING_NEW_CONTACT_SUCCESS,
    UPLOADING_NEW_CONTACT_FAILURE,
    UPLOADING_UPDATED_CONTACT_SUCCESS,
    UPLOADING_UPDATED_CONTACT_FAILURE,
} from '../../constants';

const initialState = {
    contacts: [],
    isFetching: false,
    isUploading: false,
    errors: []
};

export default function contactsReducer(state = initialState, action) {
    switch (action.type) {

    case FETCHING_CONTACTS:
        return {
            ...state,
            contacts: [],
            isFetching: true
        };
    case FETCHING_CONTACTS_SUCCESS:
        return {
            ...state,
            contacts: action.payload,
            isFetching: false
        };
    case FETCHING_CONTACTS_FAILURE:
        return {
            ...state,
            isFetching: false,
            errors: [
                ...state.errors,
                action.payload
            ]
        };
    case UPLOADING_CONTACT:
        return {
            ...state,
            isUploading: true,
        };
    case UPLOADING_NEW_CONTACT_SUCCESS:
        return {
            ...state,
            isUploading: false,
            contacts: [
                ...state.contacts,
                action.payload
            ]
        };
    case UPLOADING_NEW_CONTACT_FAILURE:
        return {
            ...state,
            isUploading: false,
            errors: [
                ...state.errors,
                action.payload
            ]
        };
    case UPLOADING_UPDATED_CONTACT_SUCCESS: {
        let newContacts = state.contacts.filter(
            ({ id }) => id !== action.payload.id
        );
        newContacts = [
            ...newContacts,
            action.payload
        ];
        
        return {
            ...state,
            isUploading: false,
            contacts: newContacts
        };
    }
    default:
        return state;

    }
}