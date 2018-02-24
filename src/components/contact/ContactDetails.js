import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Divider, ActionButton } from 'react-native-material-ui';

import { connect } from 'react-redux';

import ContactDetailsItem from './ContactDetailsItem';

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

    resolveAction(actionName) {
        const { navigate } = this.props.navigation;

        switch (actionName) {
        case 'edit':
            navigate('Edit', {
                ...this.contactDetails
            });
            break;
        case 'delete':
            console.log('Deleting contact with id ' + 
            this.props.contacts.contacts.id);
            break;
        }
    }

    render() {
        if (this.contactDetails) {
            const { name, phone, email } = this.contactDetails;
            const { first, last } = name;

            return (
                <View style={styles.container}>
                    <ScrollView>
                        <ContactDetailsItem 
                            label='Name'
                            text={`${first} ${last}`}
                        />
                        <Divider />
                        <ContactDetailsItem 
                            label='Phone'
                            text={phone}
                        />
                        <Divider />
                        <ContactDetailsItem 
                            label='Email'
                            text={email}
                        />
                        <Divider />
                    </ScrollView>
                    <ActionButton 
                        icon='more-vert' 
                        transition='speedDial'
                        actions={[
                            {
                                icon: 'delete-forever',
                                label: 'Delete',
                                name: 'delete'
                            },
                            {
                                icon: 'edit',
                                label: 'Edit',
                                name: 'edit'
                            }
                        ]}
                        onPress={(text) => this.resolveAction(text)}
                    />
                </View>
            );
        } else {
            return <Text>There was an error getting the details of this contact...</Text>;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

function mapStateToProps(state) {
    const { contacts } = state;
    return {
        contacts
    };
}

export default connect(mapStateToProps)(ContactDetails);