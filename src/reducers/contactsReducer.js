import { 
    FETCHING_CONTACTS, 
    FETCHING_CONTACTS_SUCCESS, 
    FETCHING_CONTACTS_FAILURE,
    UPLOADING_CONTACT,
    UPLOADING_NEW_CONTACT_SUCCESS,
    UPLOADING_NEW_CONTACT_FAILURE,
    UPLOADING_UPDATED_CONTACT_SUCCESS,
    UPLOADING_UPDATED_CONTACT_FAILURE,
} from '../store/constants';

const initialState = {
    contacts: [],
    isFetching: false,
    isUploading: false,
    errors: []
};

function compareNames(a, b) {
    const lastNameOfA = a.name.last.toLowerCase();
    const lastNameOfB = b.name.last.toLowerCase();

    if (lastNameOfA < lastNameOfB) {
        return -1;
    }
    if (lastNameOfA > lastNameOfB) {
        return 1;
    }

    return 0;
}

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
            contacts: action.payload.sort(compareNames),
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
            ].sort(compareNames)
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
        ].sort(compareNames);
        
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