import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class CalendarDemo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>This would be a calendar!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CalendarDemo;