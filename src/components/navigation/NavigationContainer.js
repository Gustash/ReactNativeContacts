import React from 'react';
import { StackNavigator } from 'react-navigation';

import ContactList from '../contact/ContactList';
import Navbar from '../Navbar';
import ContactDetails from '../contact/ContactDetails';
import EditContact from '../contact/EditContact';

const NavigationContainer = StackNavigator({
    Home: {
        screen: ContactList,
        navigationOptions: () => ({
            title: 'Contacts',
        })
    },
    Details: {
        screen: ContactDetails,
        navigationOptions: () => ({
            title: 'Contact Details',
        })
    },
    Edit: {
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

export default NavigationContainer;