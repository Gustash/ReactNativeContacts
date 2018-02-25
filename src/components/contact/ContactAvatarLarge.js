import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Avatar } from 'react-native-material-ui';
import { ImagePicker } from 'expo';

const imageSize = 100;

class ContactAvatarLarge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: null,
        }
    }

    async displayImagePicker() {
        try {
            const image = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
                base64: true
            });
            const imageExtension = image.uri.split('.').pop();

            this.setState({
                image
            });

            const avatarUri = `data:image/${imageExtension};base64,${image.base64}`;

            this.props.onChangeAvatar(avatarUri);
        } catch (err) {
            console.log(err);
        }
    }

    getImageElement() {
        const { pictureUri } = this.props;
        const { image } = this.state;

        if (pictureUri) {
            return <Image
                source={{uri: pictureUri}} 
                style={styles.image}
            />;
        } else if (image) {
            return <Image
                source={{uri: image.uri}} 
                style={styles.image}
            />;
        } else {
            return <Avatar 
                icon='person'
                size={imageSize} 
                iconSize={imageSize / 2}
            />;
        }
    }

    render() {
        const { onChangeAvatar } = this.props;

        const imageElement = this.getImageElement();

        return (
            <View style={styles.container}>
                <TouchableHighlight 
                    onPress={() => {
                        if (onChangeAvatar)
                            this.displayImagePicker();
                    }}
                    underlayColor='transparent'
                >
                    {/* Need this view here because TouchableOpacity has some weird kinks */}
                    <View>
                        {imageElement}
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

ContactAvatarLarge.propTypes = {
    icon: PropTypes.string,
    size: PropTypes.number,
    onChangeAvatar: PropTypes.func,
    pictureUri: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    image: {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
    }
});

export default ContactAvatarLarge;