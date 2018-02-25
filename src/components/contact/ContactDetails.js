import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    View, 
    Text, 
    ScrollView, 
    Alert, 
    StyleSheet } from 'react-native';
import { Divider, ActionButton } from 'react-native-material-ui';

import { connect } from 'react-redux';

import ContactDetailsItem from './ContactDetailsItem';

import { deleteContact } from '../../store/actions';

import LoadingIndicator from '../LoadingIndicator';

class ContactDetails extends Component {
    resolveAction(actionName) {
        const { navigate, state, goBack } = this.props.navigation;
        const { id } = state.params;

        switch (actionName) {
        case 'edit':
            navigate('Edit', {
                id,
            });
            break;
        case 'delete':
            Alert.alert(
                'Delete Contact',
                'Are you sure you want to delete?',
                [
                    { // Confirmation button
                        text: 'OK', 
                        onPress: () => this.props.deleteContact(id, goBack) 
                    },
                    { // Cancel button
                        text: 'Cancel',
                        onPress: () => console.log('Canceling'),
                        style: 'cancel',
                    }
                ]
            );
            break;
        }
    }

    render() {
        const { contactDetails, isDeleting } = this.props;

        if (isDeleting) 
            return <LoadingIndicator />;

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
        goBack: PropTypes.func.isRequired,
    }).isRequired,
    // Contact details is not required only because
    // React Native doesn't like it when I dispatch the
    // remove action and go back.
    // Even if I go back before I dispatch, it still warns me
    // that contactDetails is undefined
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
    }),
    deleteContact: PropTypes.func.isRequired,
    isDeleting: PropTypes.bool.isRequired,
};

ContactDetails.contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    indicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

function mapStateToProps(state, props) {
    const { contacts, isUploading } = state.contacts;
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
        isDeleting: isUploading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteContact: (id, goBack) => dispatch(deleteContact(id, goBack))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails);