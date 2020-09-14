import React, { useEffect, useState } from 'react';
import styles from './styles';
import { View, TouchableOpacity, Image, TextInput, Text, CheckBox} from 'react-native';
import logoImg from '../../assets/logo.png';
import menuImg from '../../assets/menu.png';
import api from '../../services/api';


function registerEvent({ navigation }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [start_time, setStartTime] = useState('');
    const [amount, setAmount] = useState('');
    const [ finish_time, setFinishTime ] = useState({});
    const [type, setType] = useState(false)
    const [event, setEvent] = useState({});
    
    function navigateToLogin() {
        navigation.navigate('Login');

    }

    async function next(){
        if(!name | !description | !date | !start_time | !finish_time ){
            return alert('Preencha todos os campos porfavor!')
        }
        setEvent({name, description, date, start_time, finish_time, amount})
        console.log(event)
        if( type === false ){
            navigation.navigate('Address', { event })
        }
        navigation.navigate('Address');
    }


  return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={( ) => navigation.openDrawer()}>
                    <Image style={styles.menu} source={menuImg}/>
                </TouchableOpacity>
                <Image style={styles.logo} source={logoImg}/>
            </View>

            <View style={styles.form}>
                    <View style={styles.infoValue}>
                        <Text style={styles.info}>Nome</Text>
                        <TextInput placeholder={'Nome'} style={styles.description} onChangeText={text => setName(text)}/>
                    </View>

                    <View style={styles.infoValue}>
                        <Text style={styles.info}>Descrição</Text>
                        <TextInput placeholder={'Descrição'} style={styles.description} onChangeText={text => setDescription(text)}/>
                    </View>

                    <View style={styles.infoValue}>
                        <Text style={styles.info}>Data</Text>
                        <TextInput placeholder={'Data'} style={styles.description} onChangeText={text => setDate(text)}/>
                    </View>

                    <View style={styles.infoValue}>
                        <Text style={styles.info}>Hora de Inicio</Text>
                        <TextInput placeholder={'24/10/2020 16:00'} style={styles.description} onChangeText={text => setStartTime(text)}/>
                    </View>
                    <View style={styles.infoValue}>
                        <Text style={styles.info}>Hora de Fim</Text>
                        <TextInput placeholder={'26/10/2020 22:00'} style={styles.description} onChangeText={text => setFinishTime(text)}/>
                    </View>
                    <View style={styles.final}>
                    <View style={styles.infoValue}>
                            <Text style={styles.info}>Lotação</Text>
                            <TextInput placeholder={'Lotação'} style={styles.phone} onChangeText={text => setAmount(text)}/>
                        </View>
                    <View style={styles.final}>
                        <View style={styles.infoValue}>
                            <Text style={styles.info}>Evento Online</Text>
                            <CheckBox style={styles.chebox} value={type} onValueChange={setType}/>
                        </View>
                    </View>
                    </View>
                    <TouchableOpacity onPress={ () => next()}>
                        <View style={styles.menuButton} >
                            <Text style={[styles.buttonCadastrar, { marginTop: 0}]} >Proximo</Text>
                        </View>
                    </TouchableOpacity> 
            </View>
        </View>
        
  )
}

export default registerEvent;