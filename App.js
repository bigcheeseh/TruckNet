import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import AppReducer from './src/reducers';
import AppWithNavigationState from './src/navigators/AppNavigator';
import { middleware } from './src/utils/redux';

import createSagaMiddleware from 'redux-saga'
import mySaga from './src/saga'

import { Root } from "native-base";

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  AppReducer,
  applyMiddleware(middleware),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(mySaga)

class TrackDemoApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <AppWithNavigationState />
        </Root>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('TrackDemoApp', () => TrackDemoApp);

export default TrackDemoApp;