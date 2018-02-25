import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet } from 'react-native';

import { ListItem, Avatar } from 'react-native-material-ui';

const imageSize = 45;

class ContactListItem extends Component {
    render() {
        const { id, name, avatarUri } = this.props;
        const { first, last } = name;

        const image = (avatarUri) ? 
            <Image source={{ uri: avatarUri }} style={styles.avatar} /> :
            <Avatar icon='person' size={imageSize} />;

        return(
            <ListItem
                divider
                leftElement={image}
                centerElement={{
                    primaryText: `${last}, ${first}`
                }}
                onPress={() => this.props.navigation.navigate(
                    'Details', 
                    { 
                        id,
                    }
                )}
            />
        );
    }
}

ContactListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.shape({
        first: PropTypes.string.isRequired,
        last: PropTypes.string.isRequired,
    }).isRequired,
    avatarUri: PropTypes.string,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

const styles = StyleSheet.create({
    avatar: {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2
    }
});

export default ContactListItem;