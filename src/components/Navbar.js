import React, { Component } from 'react';

import { Toolbar } from 'react-native-material-ui';

export default class Navbar extends Component {
    onLeftElementPressed() {
        const { isRootRoute, navigateBack } = this.props;

        if (!isRootRoute) {
            navigateBack();
        }
    }

    render() {
        const { isRootRoute } = this.props;
        const leftElementIcon = (isRootRoute) ? 'menu' : 'arrow-back';

        return(
            <Toolbar
                leftElement={leftElementIcon}
                onLeftElementPress={() => this.onLeftElementPressed()}
                centerElement='Contacts'
                /* searchable={searchSettings} */
            />
        );
    }
}

const searchSettings = {
    autoFocus: true,
    placeholder: 'Search',
}