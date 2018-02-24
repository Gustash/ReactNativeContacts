import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

import { ActionButton } from 'react-native-material-ui';

import ContactListItem from './ContactListItem';

import { connect } from 'react-redux';

import { fetchContacts } from '../../../actions';

class ContactList extends Component {
    componentDidMount() {
        this.props.getContacts();
    }

    render() {
        const { contacts } = this.props.contacts;

        //console.log(contacts);

        return(
            <View style={styles.container}>
                <FlatList
                    data={contacts}
                    renderItem={({ item }) => {
                        return <ContactListItem 
                            id={item.id}
                            name={item.name} 
                            //picture={item.picture.thumbnail}
                            navigation={this.props.navigation}
                        />;
                    }}
                    keyExtractor={(item, index) => index}
                />
                <ActionButton onPress={() => this.props.navigation.navigate('Edit')} />
                {/* {this.props.contacts.errors.map(
                    (err, i) => <Text key={i}>{err}</Text>
                )} */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

function mapStateToProps(state) {
    const { contacts } = state;
    return {
        contacts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getContacts: () => dispatch(fetchContacts())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);