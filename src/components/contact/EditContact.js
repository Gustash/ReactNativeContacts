import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView } from 'react-native';

import { Divider, Button } from 'react-native-material-ui';

import FormTextInput from '../form/FormTextInput';
import ContactAvatarLarge from './ContactAvatarLarge';

import { updateContact } from '../../store/actions';
import { connect } from 'react-redux';

class EditContact extends Component {
    constructor(props) {
        super(props);

        const { contact } = props;

        this.state = {
            contact
        };
    }

    _onChangeFirstName(first) {
        this.setState({
            contact: {
                ...this.state.contact,
                name: {
                    ...this.state.contact.name,
                    first
                }
            }
        });
    }

    _onChangeLastName(last) {
        this.setState({
            contact: {
                ...this.state.contact,
                name: {
                    ...this.state.contact.name,
                    last
                }
            }
        });
    }

    _onChangePhone(phone) {
        this.setState({
            contact: {
                ...this.state.contact,
                phone
            }
        });
    }

    _onChangeEmail(email) {
        let { ...changedContact } = this.state.contact;

        if (email === '') {
            delete changedContact.email;
        } else {
            changedContact = {
                ...changedContact,
                email
            };
        }

        this.setState({
            contact: changedContact,
        });
    }

    _onChangeAvatar(avatarUri) {
        this.setState({
            contact: {
                ...this.state.contact,
                avatarUri
            }
        });

        console.log(this.state.contact);
    }

    isFormValid() {
        const { name, phone } = this.state.contact;
        const { first, last } = name;

        return (first !== '' && last !== '' && phone !== '');
    }

    render() {
        const { saveContact, isUploading } = this.props;
        const { goBack } = this.props.navigation;

        const { name, phone, email, avatarUri } = this.state.contact;
        const { first, last } = name;

        return(
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <ContactAvatarLarge 
                        onChangeAvatar={(uri) => this._onChangeAvatar(uri)} 
                        pictureUri={avatarUri}
                    />
                    <Divider />
                    <FormTextInput
                        label='First Name'
                        required
                        onChangeText={(text) => this._onChangeFirstName(text)}
                        text={first}
                    />
                    <Divider />
                    <FormTextInput 
                        label='Last Name'
                        required
                        onChangeText={(text) => this._onChangeLastName(text)}
                        text={last}
                    />
                    <Divider />
                    <FormTextInput 
                        label='Phone Number'
                        required
                        onChangeText={(text) => this._onChangePhone(text)}
                        text={phone}
                    />
                    <Divider />
                    <FormTextInput 
                        label='Email'
                        onChangeText={(text) => this._onChangeEmail(text)}
                        text={email}
                    />
                    <Divider />
                </ScrollView>
                <Button 
                    raised 
                    primary 
                    disabled={!this.isFormValid() || isUploading}
                    text={(!isUploading) ? 'Save' : 'Saving...'}
                    onPress={() => saveContact(this.state.contact, goBack)}
                />
            </View>
        );
    }
}

EditContact.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.shape({
            first: PropTypes.string.isRequired,
            last: PropTypes.string.isRequired,
        }).isRequired,
        phone: PropTypes.string.isRequired,
        email: PropTypes.string,
        avatarUri: PropTypes.string,
    }).isRequired,
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
    }).isRequired,
    saveContact: PropTypes.func.isRequired,
    isUploading: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flex: 1,
    },
});

function mapStateToProps(state, props) {
    const { params } = props.navigation.state;
    const { isUploading } = state.contacts;

    let contact;

    if (params) {
        const { contacts } = state.contacts; 
        contact = contacts.find(
            (contact) => contact.id === params.id
        );
    } else {
        contact = {
            id: '-1',
            name: {
                first: '',
                last: ''
            },
            phone: '',
        };
    }
    return {
        contact,
        isUploading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        saveContact: (contact, goBack) => dispatch(updateContact(contact, goBack))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);