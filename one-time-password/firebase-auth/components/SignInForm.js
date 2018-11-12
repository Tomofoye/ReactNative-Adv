import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-one-time-password-69f0c.cloudfunctions.net';

class SignInForm extends Component {

  //form inputs are strings so it makes sense to have phone as string
  state = { phone: '', code: '' };

  handleSubmit = async () => {
    try {
      let response = await axios.post(`${ROOT_URL}/verifyOTS`, { phone: this.state.phone, code: this.state.code })
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return(
      <View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter Code</FormLabel>
          <FormInput
            value={this.state.code}
            onChangeText={code => this.setState({ code })}
          />
        </View>


        <Button
          onPress={this.handleSubmit}
          title="Submit"
        />
      </View>
    )
  }
}

export default SignInForm;
