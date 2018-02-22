import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Navbar from './Navbar';
import ContactList from './ContactList';

export default class Container extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Navbar />
                <ContactList />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
