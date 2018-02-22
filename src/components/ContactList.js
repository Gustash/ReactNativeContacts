import React, { Component } from 'react';
import { FlatList, View } from 'react-native';

import { ActionButton } from 'react-native-material-ui';

import ContactListItem from './ContactListItem';
import axios from 'axios';

export default class ContactList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: []
        }
    }

    async componentWillMount() {
        await this.loadContacts();
    }

    async loadContacts() {
        let contacts = await axios.get('https://randomuser.me/api/?results=25&inc=name,picture');
        contacts = contacts.data.results;

        this.setState({
            contacts
        });
    }

    render() {
        return(
            <View>
                <FlatList
                    data={this.state.contacts}
                    renderItem={({ item }) => (
                        <ContactListItem 
                            name={item.name} 
                            picture={item.picture.thumbnail}
                            navigation={this.props.navigation}
                        />
                    )}
                    keyExtractor={(item, index) => index}
                />
                <ActionButton />
            </View>
        );
    }
}