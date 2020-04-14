/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

if (window.document) {
    AppRegistry.runApplication("AwesomeProject", {
        initialProps: {},
        rootTag: document.getElementById("react-root")
    });
}
