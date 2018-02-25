import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

class ContactDetailsItem extends Component {
    render() {
        const { label, text } = this.props;

        return(
            <View style={styles.container}>
                <Text style={styles.label}>{label}</Text>
                <Text>{text}</Text>
            </View>
        );
    }
}

ContactDetailsItem.propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    label: {
        fontSize: 16,
    }
});

export default ContactDetailsItem;