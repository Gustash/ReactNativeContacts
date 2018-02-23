import React, { Component } from 'react';
import { Text } from 'react-native';

import { connect } from 'react-redux';

class ContactDetails extends Component {
    render() {
        return(
            <Text>I am a person!</Text>
        );
    }
}

function mapStateToProps(state) {
    
}

export default connect(mapStateToProps)(ContactDetails);