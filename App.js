import React, { Component } from 'react';
import { Font, AppLoading } from 'expo';
import Container from './src/components/Container';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import SafeAreaView from 'react-native-safe-area-view';

const uiTheme = {
    palette: {
        primaryColor: COLOR.blue500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
    }
  }

  async componentDidMount() {
    await this.loadFonts();
  }

  async loadFonts() {
    await Font.loadAsync({
      'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    });

    this.setState({
      isLoading: false,
    })
  }

  render() {
    return (
      (this.state.isLoading) ?
      <AppLoading /> :
      <ThemeProvider uiTheme={uiTheme}>
        <SafeAreaView style={styles.safeAreaView} forceInset={{ top: 'always', bottom: 'never' }}>
          <Container />
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}

const styles = {
  safeAreaView: {
    backgroundColor: uiTheme.palette.primaryColor,
    flex: 1
  }
}