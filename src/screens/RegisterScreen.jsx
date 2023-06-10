import { View, Text, Image, TextInput, Button, ToastAndroid, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { domain } from '../Env';

export default function RegisterScreen({navigation}) {
    const [user, editUser] = useState('');
    const [pass, editPass] = useState('');
    const [confirmPass, editConfirmPass] = useState('');
    const [notelp, editNotelp] = useState('');

    const registerAkun = async () => {
        if (pass == confirmPass) {
            await axios.post(
                `${domain}/user`, 
                {
                    username: user, 
                    password: pass,
                    confirmPassword: confirmPass,
                    notelp: notelp
                }
                )
                .then(function (res) {
                    // console.log(res.data);
                    editUser('');
                    editPass('');
                    editConfirmPass('');
                    editNotelp('');
                    navigation.navigate('Login');
                })
        }
        else {
            ToastAndroid.showWithGravity(
                'Password Konfirmasi Tidak Sama',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
        }
    }

    return (
        <SafeAreaView>
            <View style={{padding: 30}}>
                <Text style={{fontSize: 32, textAlign: 'center', marginBottom: 20}}>Register Your Account</Text>
                {/* <Image style={{alignSelf: 'center', width: 240, height: 240,}} source={require('../assets/background.png')}/> */}
                <View style={{marginBottom: 12}}>
                <Text>Username</Text>
                <TextInput
                    style={{borderColor: 'black', borderBottomWidth: 2}}
                    value={user}
                    placeholder={'Masukkan Username'}
                    onChangeText={text => editUser(text)}
                    />
                </View>
                <View style={{marginBottom: 12}}>
                    <Text>Password</Text>
                    <TextInput
                        style={{borderColor: 'black', borderBottomWidth: 2}}
                        secureTextEntry={true}
                        value={pass}
                        placeholder={'Masukkan Password'}
                        onChangeText={text => editPass(text)}
                        />
                </View>
                <View style={{marginBottom: 12}}>
                    <Text>Confirm Password</Text>
                    <TextInput
                        style={{borderColor: 'black', borderBottomWidth: 2}}
                        secureTextEntry={true}
                        value={confirmPass}
                        placeholder={'Konfirmasi Password'}
                        onChangeText={text => editConfirmPass(text)}
                        />
                </View>
                <View style={{marginBottom: 12}}>
                    <Text>Nomor Telepon</Text>
                    <TextInput
                        style={{borderColor: 'black', borderBottomWidth: 2}}
                        value={notelp}
                        placeholder={'Masukkan Nomor Telepon'}
                        onChangeText={text => editNotelp(text)}
                        />
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <View style={{width: '50%'}}>
                        <Button onPress={() => navigation.navigate('Login')} title='Back'/>
                    </View>
                    <View style={{width: '50%'}}>
                        <Button onPress={() => registerAkun()} title='Sign Up'/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}