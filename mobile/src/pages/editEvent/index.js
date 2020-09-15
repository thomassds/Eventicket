import React, { useEffect, useState } from 'react';
import styles from './styles';
import { View, TouchableOpacity, Image, TextInput, Text, CheckBox} from 'react-native';
import logoImg from '../../assets/logo.png';
import menuImg from '../../assets/menu.png';
import { useRoute } from '@react-navigation/native';
import { format, parse, parseISO } from 'date-fns';
import api from '../../services/api';



function registerEvent({ navigation }) {
    const route = useRoute();
    const event = route.params.event;

    async function update(){

        event.date = format(parse(event.date, `dd/MM/yyyy HH:mm`, new Date()), `yyyy-MM-dd'T'hh:mm:ss`)
    
      
        event.finish_time = format(parse(event.finish_time , `dd/MM/yyyy HH:mm`, new Date()), `yyyy-MM-dd'T'hh:mm:ss`)
        

        if (!event.name | !event.description | !event.date | !event.finish_time | !event.amount) {
            alert("Preencha todos os campos porfavor!");
            return;
          }
          
        console.log(event)
        const response = await api.put(`event/${event.id}`, event)
        navigation.navigate('Meus Eventos');
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
                        <TextInput placeholder={'Nome'} style={styles.description} onChangeText={text => event.name=text}>{event.name}</TextInput>
                    </View>

                    <View style={styles.infoValue}>
                        <Text style={styles.info}>Descrição</Text>
                        <TextInput placeholder={'Descrição'} style={styles.description} onChangeText={text => event.description=text}>{event.description}</TextInput>
                    </View>

                    <View style={styles.infoValue}>
                        <Text style={styles.info}>Data e hora de Inicio</Text>
                        <TextInput placeholder={'26/10/2020 22:00'} style={styles.description} type={ date } onChangeText={date => event.date = date}>{event.date = format(parseISO(event.date),'dd/MM/yyyy hh:mm')}</TextInput>
                    </View>

                    <View style={styles.infoValue}>
                        <Text style={styles.info}>Data e hora de Fim</Text>
                        <TextInput placeholder={'26/10/2020 22:00'} type={ date }style={styles.description} onChangeText={date => event.finish_time = date}>{event.finish_time = format(parseISO(event.finish_time),'dd/MM/yyyy hh:mm')}</TextInput>
                    </View>
                    <View style={styles.final}>
                    <View style={styles.infoValue}>
                            <Text style={styles.info}>Lotação</Text>
                            <TextInput placeholder={'Lotação'} style={styles.phone} onChangeText={text => event.amount = text}>{event.amount}</TextInput>
                        </View>
                    <View style={styles.final}>
                        <View style={styles.infoValue}>
                            <Text style={styles.info}>Evento Online</Text>
                            <CheckBox style={styles.chebox} value={event.type} onValueChange={setType}/>
                        </View>
                    </View>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={ () => update()}>
                            <View style={styles.menuButton} >
                                <Text style={[styles.buttonCadastrar, { marginTop: 0}]} >Salvar</Text>
                            </View>
                        </TouchableOpacity> 
                    </View>
            </View>
        </View>
        
  )
}

export default registerEvent;