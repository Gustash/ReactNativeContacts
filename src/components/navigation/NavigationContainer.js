import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import ContactList from '../contact/ContactList';
import Navbar from '../Navbar';
import ContactDetails from '../contact/ContactDetails';

export default StackNavigator({
    Home: {
        screen: ContactList,
    },
    Details: {
        screen: ContactDetails,
    }
},
{
    navigationOptions: ({ navigation }) => {
        const routesWithoutBack = ['Home'];
        const isRootRoute = routesWithoutBack.includes(navigation.state.routeName);

        return {
            header: <Navbar 
                isRootRoute={isRootRoute} 
                navigateBack={navigation.goBack}
            />,
        };
    },
});