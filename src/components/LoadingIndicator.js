import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingIndicator = (props, context) => {
    const { primaryColor } = context.uiTheme.palette;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }
    });

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={primaryColor} />
        </View>
    );
};

LoadingIndicator.contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

export default LoadingIndicator;