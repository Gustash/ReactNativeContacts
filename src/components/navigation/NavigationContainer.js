import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import ContactList from '../contact/ContactList';
import Navbar from '../Navbar';
import ContactDetails from '../contact/ContactDetails';
import EditContact from '../contact/EditContact';

export default StackNavigator({
    Home: {
        screen: ContactList,
        navigationOptions: () => ({
            title: 'Contacts',
        })
    },
    Details: {
        screen: ContactDetails,
        navigationOptions: ({ navigation }) => ({
            title: navigation.state.params.firstName + '\'s Details'
        })
    },
    Create: {
        screen: EditContact,
        navigationOptions: () => ({
            title: 'Edit Contact',
        })
    }
},
{
    navigationOptions: ({ navigation }) => {
        const routesWithoutBack = ['Home'];
        const isRootRoute = routesWithoutBack.includes(navigation.state.routeName);

        return {
            header: (props) => <Navbar 
                getScreenDetails={props.getScreenDetails}
                scene={props.scene}
                isRootRoute={isRootRoute} 
                navigateBack={navigation.goBack}
            />,
        };
    },
});