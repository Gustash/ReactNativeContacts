import React, { Component } from 'react';
import { List, FlatList } from 'react-native';

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
            <FlatList
                data={this.state.contacts}
                renderItem={({ item }) => <ContactListItem name={item.name} picture={item.picture.thumbnail}/>}
                keyExtractor={(item, index) => index}
            />
        );
    }
}