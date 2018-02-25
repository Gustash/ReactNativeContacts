import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationScene } from 'react-navigation';

import { Toolbar } from 'react-native-material-ui';

class Navbar extends Component {
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

Navbar.propTypes = {
    isRootRoute: PropTypes.bool.isRequired,
    navigateBack: PropTypes.func.isRequired,
    getScreenDetails: PropTypes.func.isRequired,
    scene: PropTypes.shape({
        type: PropTypes.instanceOf(NavigationScene),
    }).isRequired,
};

// const searchSettings = {
//     autoFocus: true,
//     placeholder: 'Search',
// };

export default Navbar;