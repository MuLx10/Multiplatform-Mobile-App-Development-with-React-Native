import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import { ConfigureStore } from './redux/configureStore';
import Main from './components/MainComponent';
import { Loading } from './components/LoadingComponent';

export default class App extends React.Component {
  render() {
    const { persistor, store } = ConfigureStore();

    return (
      <Provider store={store}>
        <PersistGate
          loading={<Loading />}
          persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
