/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import EntryPoint from './src/entry-point';

AppRegistry.registerComponent(appName, () => EntryPoint);
