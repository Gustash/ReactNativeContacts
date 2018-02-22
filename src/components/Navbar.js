import React, { Component } from 'react';

import { Toolbar } from 'react-native-material-ui';

export default class Navbar extends Component {
    render() {
        return(
            <Toolbar
                leftElement="menu"
                centerElement="Contacts"
                /* searchable={searchSettings} */
            />
        );
    }
}

const searchSettings = {
    autoFocus: true,
    placeholder: 'Search',
}