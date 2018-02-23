import React, { Component } from 'react';
import { Text } from 'react-native';

import { connect } from 'react-redux';

class ContactDetails extends Component {
    componentWillMount() {
        const { state } = this.props.navigation;
        const contactId = state.params ? state.params.id : undefined;

        if (!contactId)
            this.props.navigation.goBack();

        this.contactDetails = this.getContactDetails(contactId);
    }

    getContactDetails(contactId) {
        const { contacts } = this.props.contacts;
        return contacts.find(
            (contact) => contact.id === contactId
        );
    }

    render() {
        if (this.contactDetails) {
            const { first, last } = this.contactDetails.name;

            return <Text>Hello {first} {last}!</Text>;
        } else {
            return <Text>There was an error getting the details of this contact...</Text>;
        }
    }
}

function mapStateToProps(state) {
    const { contacts } = state;
    return {
        contacts
    };
}

export default connect(mapStateToProps)(ContactDetails);