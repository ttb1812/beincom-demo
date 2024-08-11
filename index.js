/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import EntryPoint from './src/entry-point';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () =>
    gestureHandlerRootHOC(EntryPoint, { flex: 1 }),
);
