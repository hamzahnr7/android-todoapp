import { View, Text, Button } from 'react-native'
import React from 'react'

export default function HelpScreen({route, navigation}) {
  return (
    <View style={{margin: 15}}>
        <View>
            <Text style={{fontSize: 28, textAlign: 'center', marginBottom: 15}}>Tata Cara Pembuatan Task</Text>
            <View style={{borderWidth: 2, marginBottom: 15}}>
                <Text style={{fontSize: 18, textAlign: 'center'}}>
                    Klik Tombol Create Task pada halaman Dashboar, lalu ketikkan Judul, Deskripsi, setelah itu pilih status Task.
                    Status Todo untuk pertama kali dibuat, Status Ongoing untuk task yang sedang dikerjakan, dan Status Done untuk Task yang telah dikerjakan.
                    lalu pilih tanggal akhir atau deadline dari task tersebut dengan menekan tombol ikon kalender pada kolom input deadline. 
                    lalu setelah itu klik tombol Create Task. 
                </Text>
            </View>
            <View style={{borderWidth: 2, marginBottom: 15}}>
                <Text style={{fontSize: 18, textAlign: 'center'}}>
                    Jika ingin mengubah atau mengedit task, maka klik Task yang ingin diubah lalu lakukan pengubahan seperti cara membuat Task.
                </Text>
            </View>
        </View>
        <View>
            <Button title='Saya Mengerti' onPress={() => navigation.navigate('Dashboard', {token: route.params.token})}/>
        </View>
    </View>
  )
}