import React, { Component } from 'react';
import { Image, Text } from 'react-native';

import { ListItem } from 'react-native-material-ui';

export default class ContactListItem extends Component {
    render() {
        const { first, last } = this.props.name;
        const { picture } = this.props;

        return(
            <ListItem
                divider
                leftElement={<Image source={{ uri: picture }} style={styles.avatar} />}
                centerElement={{
                    primaryText: `${last}, ${first}`
                }}
                onPress={() => {}}
            />
        );
    }
}

const styles = {
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 45 / 2
    }
}