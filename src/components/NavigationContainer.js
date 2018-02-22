import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import ContactList from './ContactList';
import Navbar from './Navbar';
import ContactDetails from './ContactDetails';

export default NavigationContainer = StackNavigator({
        Home: {
            screen: ContactList,
        },
        Details: {
            screen: ContactDetails,
        }
    },
    {
        navigationOptions: ({ navigation }) => ({
            header: <Navbar />,
        }),
    }
);