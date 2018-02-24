import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ContactDetailsItem extends Component {
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8
    },
    label: {
        fontSize: 16,
    }
});