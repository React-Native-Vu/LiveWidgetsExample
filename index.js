import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { LiveActivity } from 'react-native-live-widgets';

LiveActivity.registerBackgroundActionHandler();

AppRegistry.registerComponent(appName, () => App);

