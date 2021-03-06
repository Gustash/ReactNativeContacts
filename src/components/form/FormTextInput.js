import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet } from 'react-native';

class FormTextInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isValid: (!props.required || this.isValidInput(props.text)),
        };
    }

    // Check if the form is valid
    // i.e. if the text is not undefined or null
    // and if it is not empty or just blankspace
    isValidInput(text) {
        if (!text || text.length === 0 || !text.trim()) {
            return false;
        }

        return true;
    }

    checkInputValidity(text) {
        const { required } = this.props;
        if (!required)
            return;

        this.setState({
            isValid: this.isValidInput(text),
        });
    }

    render() {
        const { text, label, onChangeText } = this.props;

        return(
            <View style={styles.inputContainer}>
                <Text style={styles.label}>{label}</Text>
                <TextInput 
                    style={styles.input} 
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => {
                        this.checkInputValidity(text);
                        onChangeText(text); 
                    }}
                    value={text}
                />
                {!this.state.isValid && <Text style={styles.required}>This field is required.</Text>}
            </View>
        );
    }
}

FormTextInput.defaultProps = {
    required: false,
    text: ''
};

FormTextInput.propTypes = {
    required: PropTypes.bool,
    text: PropTypes.string,
    label: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 0,
    },
    inputContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    label: {
        fontSize: 16
    },
    required: {
        color: 'red',
    }
});

export default FormTextInput;