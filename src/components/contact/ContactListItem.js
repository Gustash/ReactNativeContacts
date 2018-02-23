import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';

import { ListItem } from 'react-native-material-ui';

export default class ContactListItem extends Component {
    render() {
        const { first, last } = this.props.name;
        const { id } = this.props;
        //const { picture } = this.props;

        return(
            <ListItem
                //leftElement={<Image source={{ uri: picture }} style={styles.avatar} />}
                centerElement={{
                    primaryText: `${last}, ${first}`
                }}
                onPress={() => this.props.navigation.navigate(
                    'Details', 
                    { id }
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 45 / 2
    }
});