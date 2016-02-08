import React, {
  View,
  Text,
  TextInput,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import Button from './button';
import ddpClient from './ddp';

export default React.createClass({
  getInitialState() {
    return {
      email: '',
      password: ''
    }
  },

  componentDidMount() {
    // Grab the token from AsyncStorage - if it exists then attempt to login with it.
    AsyncStorage.getItem('loginToken')
      .then((res) => {
        if (res) {
          ddpClient.loginWithToken(res, (err, res) => {
            if (res) {
              this.props.changedSignedIn(true);
            } else {
              this.props.changedSignedIn(false);
            }
          });
        }
      });
  },

  handleSignIn() {
    let { email, password } = this.state;
    ddpClient.loginWithEmail(email, password, (err, res) => {
      ddpClient.onAuthResponse(err, res);
      if (res) {
        this.props.changedSignedIn(true);
      } else {
        this.props.changedSignedIn(false);
      }
    });

    // Clear the input values on submit
    this.refs.email.setNativeProps({text: ''});
    this.refs.password.setNativeProps({text: ''});
  },


  handleSignUp() {
    let { email, password } = this.state;
    ddpClient.signUpWithEmail(email, password, (err, res) => {
      ddpClient.onAuthResponse(err, res);
      if (res) {
        this.props.changedSignedIn(true);
      } else {
        this.props.changedSignedIn(false);
      }
    });

    // Clear the input values on submit
    this.refs.email.setNativeProps({text: ''});
    this.refs.password.setNativeProps({text: ''});
  },

  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          ref="email"
          onChangeText={(email) => this.setState({email: email})}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          ref="password"
          onChangeText={(password) => this.setState({password: password})}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          secureTextEntry={true}
        />

        <Button text="Sign In" onPress={this.handleSignIn} />
        <Button text="Sign Up" onPress={this.handleSignUp} />
      </View>
    )
  }
});

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 350,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1
  }
});
