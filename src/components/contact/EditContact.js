import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

import { Divider, Button } from 'react-native-material-ui';

import FormTextInput from '../form/FormTextInput';

import { updateContact } from '../../../actions';
import { connect } from 'react-redux';

class EditContact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contact: {
                id: -1,
                name: {},
                phone: null,
                email: null
            },
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
        this.setState({
            contact: {
                ...this.state.contact,
                email
            }
        });
    }

    render() {
        const { saveContact } = this.props;
        const { goBack } = this.props.navigation;

        return(
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <FormTextInput
                        label='First Name'
                        required
                        onChangeText={(text) => this._onChangeFirstName(text)}
                    />
                    <Divider />
                    <FormTextInput 
                        label='Last Name'
                        required
                        onChangeText={(text) => this._onChangeLastName(text)}
                    />
                    <Divider />
                    <FormTextInput 
                        label='Phone Number'
                        required
                        onChangeText={(text) => this._onChangePhone(text)}
                    />
                    <Divider />
                    <FormTextInput 
                        label='Email'
                        onChangeText={(text) => this._onChangeEmail(text)}
                    />
                    <Divider />
                </ScrollView>
                <Button 
                    raised 
                    primary 
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