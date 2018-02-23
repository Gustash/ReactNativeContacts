import { 
    ADD_CONTACT, 
    REMOVE_CONTACT, 
    FETCHING_CONTACTS, 
    FETCHING_CONTACTS_SUCCESS, 
    FETCHING_CONTACTS_FAILURE
} from '../../constants';

const initialState = {
    contacts: [],
    isFetching: false,
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
    default:
        return state;

    }
}