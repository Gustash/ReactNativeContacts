import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Divider } from 'react-native-material-ui';

export default class CreateContact extends Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput 
                        style={styles.input} 
                        underlineColorAndroid='transparent'
                    />
                </View>
                <Divider />
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput 
                        style={styles.input} 
                        underlineColorAndroid='transparent'
                    />
                </View>
                <Divider />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        height: 40,
        borderWidth: 0,
    },
    inputContainer: {
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8
    },
    label: {
        fontSize: 16
    }
});