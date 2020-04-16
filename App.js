import React from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import Main from './components/MainComponent';

export default class App extends React.Component {
  render() {
    const store = ConfigureStore();

    return (
      <Provider store={store}>
         <Main />
      </Provider>
    );
  }
}
