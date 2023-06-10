import axios from 'axios';
import {useState} from 'react';
import {Text, View, TextInput, Button, Image} from 'react-native';
import {domain} from '../Env'

export default function LoginScreen({navigation}) {
  const [user, userText] = useState('');
  const [pass, passText] = useState('');

  const loginUser = async () => {
    await axios.post(`${domain}/auth/loginUser`,
    {username: user, password: pass})
    .then(function (res) {
      console.log(res.data);
      if (res.data.access_token) {
        navigation.navigate('Dashboard', {token: res.data.access_token});
      }
    })
  } 

  return (
    <>
      <View style={{padding: 30}}>
        <Text style={{fontSize: 32, textAlign: 'center'}}>ToDo App</Text>
        <Image style={{alignSelf: 'center', width: 240, height: 240,}} source={require('../assets/background.png')}/>
        <View style={{marginBottom: 12}}>
          <Text>Username</Text>
          <TextInput
            style={{borderColor: 'black', borderBottomWidth: 2}}
            value={user}
            placeholder={'Masukkan Username'}
            onChangeText={text => userText(text)}
            />
        </View>
        <View style={{marginBottom: 12}}>
          <Text>Password</Text>
          <TextInput
            style={{borderColor: 'black', borderBottomWidth: 2}}
            secureTextEntry={true}
            value={pass}
            placeholder={'Masukkan Password'}
            onChangeText={text => passText(text)}
            />
        </View>
        <Button onPress={() => loginUser(user, pass)} title='Login'/> 
      </View>
    </>
  );
}
