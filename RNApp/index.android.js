import React, {
  AppRegistry,
  Component
} from 'react-native';

import App from './app';

class RNApp extends Component {
  render() {
    return <App />;
  }
}
AppRegistry.registerComponent('RNApp', () => RNApp);
