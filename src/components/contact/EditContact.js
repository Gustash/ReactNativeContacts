import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

import { Divider, Button } from 'react-native-material-ui';

import FormTextInput from '../form/FormTextInput';

import { updateContact } from '../../../actions';
import { connect } from 'react-redux';

class EditContact extends Component {
    constructor(props) {
        super(props);

        const { params } = props.navigation.state;
        const { id, name, phone, email } = this.prefillData(params);

        this.state = {
            contact: {
                id: (id || -1),
                name: (name || {
                    first: '',
                    last: ''
                }),
                phone: (phone || ''),
                email: (email || '')
            },
        };
    }

    prefillData(params) {
        if (params) {
            return {
                ...params
            };
        } else {
            return {
                id: -1,
                name: {
                    first: '',
                    last: ''
                },
                phone: '',
                email: '',
            };
        }
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
        this.setState({
            contact: {
                ...this.state.contact,
                email
            }
        });
    }

    isFormValid() {
        const { name, phone } = this.state.contact;
        const { first, last } = name;

        return (first !== '' && last !== '' && phone !== '');
    }

    render() {
        const { saveContact } = this.props;
        const { goBack } = this.props.navigation;

        const { name, phone, email } = this.state.contact;
        const { first, last } = name;

        return(
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
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
                    disabled={!this.isFormValid()}
                    text='Save'
                    onPress={() => saveContact(this.state.contact, goBack)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flex: 1,
    },
});

function mapDispatchToProps(dispatch) {
    return {
        saveContact: (contact, goBack) => dispatch(updateContact(contact, goBack))
    };
}

export default connect(null, mapDispatchToProps)(EditContact);