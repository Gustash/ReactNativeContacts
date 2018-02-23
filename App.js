import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Font, AppLoading } from 'expo';
import NavigationContainer from './src/components/navigation/NavigationContainer';
import { SafeAreaView } from 'react-navigation';

import { ThemeProvider } from 'react-native-material-ui';
import uiTheme from './src/theme/uiTheme';

import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();

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
      <Provider store={store}>
        <ThemeProvider uiTheme={uiTheme}>
          <SafeAreaView style={styles.safeAreaView} forceInset={{ top: 'always', bottom: 'never' }}>
            <NavigationContainer />
          </SafeAreaView>
        </ThemeProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  }
});