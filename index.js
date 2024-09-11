/**
 * @format
 */

import { AppRegistry, NativeModules, Platform } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import { registerRootComponent } from 'expo';


AppRegistry.registerComponent(appName, () => App)
