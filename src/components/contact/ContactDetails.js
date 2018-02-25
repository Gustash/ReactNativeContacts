import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Divider, ActionButton } from 'react-native-material-ui';

import { connect } from 'react-redux';

import ContactDetailsItem from './ContactDetailsItem';

class ContactDetails extends Component {
    resolveAction(actionName) {
        const { navigate, state } = this.props.navigation;
        const { id } = state.params;

        switch (actionName) {
        case 'edit':
            navigate('Edit', {
                id,
            });
            break;
        case 'delete':
            console.log('Deleting contact with id ' + 
            id);
            break;
        }
    }

    render() {
        const { contactDetails } = this.props;

        if (contactDetails) {
            const { name, phone, email } = contactDetails;
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
                        {email && <ContactDetailsItem 
                            label='Email'
                            text={email}
                        />}
                        {email && <Divider />}
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

ContactDetails.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        state: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.string,
            }),
        }).isRequired,
    }).isRequired,
    contactDetails: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.shape({
            first: PropTypes.string.isRequired,
            last: PropTypes.string.isRequired,
        }).isRequired,
        // Phone is a string as enforcing types isn't
        // in the scope of this example application
        phone: PropTypes.string.isRequired,
        email: PropTypes.string,
    }).isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

function mapStateToProps(state, props) {
    const { contacts } = state.contacts;
    const contactId = props.navigation.state.params ? 
        props.navigation.state.params.id : 
        undefined;

    if (!contactId)
        props.navigation.goBack();

    const contact = contacts.find(
        (contact) => contact.id === contactId
    );

    return {
        contactDetails: contact,
    };
}

export default connect(mapStateToProps)(ContactDetails);