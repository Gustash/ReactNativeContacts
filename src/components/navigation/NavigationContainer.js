import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import ContactList from '../contact/ContactList';
import Navbar from '../Navbar';
import ContactDetails from '../contact/ContactDetails';
import EditContact from '../contact/EditContact';
import NavDrawer from '../NavDrawer';
import CalendarDemo from '../calendar/CalendarDemo';

const stackNavigatorOptions = {
    navigationOptions: ({ navigation }) => {
        const routesWithoutBack = ['Home'];
        const isRootRoute = routesWithoutBack.includes(navigation.state.routeName);

        return {
            header: (props) => <Navbar 
                getScreenDetails={props.getScreenDetails}
                scene={props.scene}
                isRootRoute={isRootRoute} 
                navigateBack={navigation.goBack}
                openDrawer={() => navigation.navigate('DrawerOpen')}
            />,
        };
    }
};

const NavigationContainer = DrawerNavigator({
    Main: StackNavigator({
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
    }, stackNavigatorOptions),
    Calendar: StackNavigator({
        Home: {
            screen: CalendarDemo,
            navigationOptions: () => ({
                title: 'Calendar',
            })
        }
    }, stackNavigatorOptions)
},
{
    contentComponent: NavDrawer,
});

export default NavigationContainer;