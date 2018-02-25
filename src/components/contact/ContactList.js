import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, StyleSheet } from 'react-native';

import { ActionButton } from 'react-native-material-ui';

import ContactListItem from './ContactListItem';

import { connect } from 'react-redux';

import { fetchContacts } from '../../store/actions';

import LoadingIndicator from '../LoadingIndicator';

class ContactList extends Component {
    componentDidMount() {
        this.props.getContacts();
    }

    render() {
        const { contacts, isFetching } = this.props;

        if (isFetching)
            return <LoadingIndicator />;

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

ContactList.propTypes = {
    getContacts: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.shape({
            first: PropTypes.string.isRequired,
            last: PropTypes.string.isRequired,
        }).isRequired,
        phone: PropTypes.string.isRequired,
        email: PropTypes.string,
    })).isRequired,
    isFetching: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

ContactList.contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

function mapStateToProps(state) {
    const { contacts, isFetching } = state.contacts;
    return {
        contacts,
        isFetching,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getContacts: () => dispatch(fetchContacts())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);