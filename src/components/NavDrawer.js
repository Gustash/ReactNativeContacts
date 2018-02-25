import React, { Component } from 'react';
import { Drawer, Avatar } from 'react-native-material-ui';
import { View, StyleSheet, Alert } from 'react-native';

class NavDrawer extends Component {
    showAlert(title, msg) {
        Alert.alert(
            title,
            msg,
            [
                { text: 'Cool!', onPress: () => {}, style: 'cancel' }
            ]
        );
    }

    render() {
        console.log(this.props);
        const { activeItemKey, navigation } = this.props;

        return (
            <View style={styles.container}>
                <Drawer>
                    <Drawer.Header>
                        <Drawer.Header.Account
                            avatar={<Avatar text="A" />}
                            accounts={[
                                { avatar: <Avatar text="B" />, key: 'B'  },
                                { avatar: <Avatar text="C"/>, key: 'C' },
                            ]}
                            footer={{
                                dense: true,
                                centerElement: {
                                    primaryText: 'Reservio',
                                    secondaryText: 'business@email.com',
                                },
                                rightElement: 'arrow-drop-down',
                            }}
                        />
                    </Drawer.Header>
                    <Drawer.Section
                        divider
                        items={[
                            { 
                                icon: 'people', 
                                value: 'Contacts', 
                                active: (activeItemKey === 'Main'), 
                                onPress: () => navigation.navigate('Main')
                            },
                            { 
                                icon: 'today', 
                                value: 'Calendar',
                                active: (activeItemKey === 'Calendar'),
                                onPress: () => navigation.navigate('Calendar')
                            },
                        ]}
                    />
                    <Drawer.Section
                        title="Personal"
                        items={[
                            { 
                                icon: 'info', 
                                value: 'Info',
                                onPress: () => 
                                    this.showAlert(
                                        'Navigate to Personal', 
                                        'This would navigate you to an info screen'
                                    ) 
                            },
                            { 
                                icon: 'settings', 
                                value: 'Settings',
                                onPress: () => 
                                    this.showAlert(
                                        'Navigate to Settings', 
                                        'This would navigate you to a Settings screen'
                                    ) 
                            },
                        ]}
                    />
                </Drawer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default NavDrawer;