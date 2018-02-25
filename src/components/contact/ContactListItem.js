import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet } from 'react-native';

import { ListItem } from 'react-native-material-ui';

class ContactListItem extends Component {
    render() {
        const { id, name } = this.props;
        const { first, last } = name;
        //const { picture } = this.props;

        return(
            <ListItem
                divider
                //leftElement={<Image source={{ uri: picture }} style={styles.avatar} />}
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
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

// const styles = StyleSheet.create({
//     avatar: {
//         width: 45,
//         height: 45,
//         borderRadius: 45 / 2
//     }
// });

export default ContactListItem;