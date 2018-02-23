import React, { Component } from 'react';

import { Toolbar } from 'react-native-material-ui';

export default class Navbar extends Component {
    onLeftElementPressed() {
        const { isRootRoute, navigateBack } = this.props;

        if (!isRootRoute) {
            navigateBack();
        }
    }

    // Get the title of the navbar since React Navigation
    // doesn't make this easy
    getTitle() {
        const { getScreenDetails, scene } = this.props;
        const details = getScreenDetails(scene);
        return details.options.title;
    }

    render() {
        const { isRootRoute } = this.props;
        const leftElementIcon = (isRootRoute) ? 'menu' : 'arrow-back';

        return(
            <Toolbar
                leftElement={leftElementIcon}
                onLeftElementPress={() => this.onLeftElementPressed()}
                centerElement={this.getTitle()}
                /* searchable={searchSettings} */
            />
        );
    }
}

const searchSettings = {
    autoFocus: true,
    placeholder: 'Search',
}