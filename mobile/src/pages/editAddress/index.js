import React, { useEffect, useState } from 'react';
import styles from './styles';
import { View, TouchableOpacity, Image, TextInput, Text} from 'react-native';
import logoImg from '../../assets/logo.png';
import menuImg from '../../assets/menu.png';
import { useFocusEffect,useRoute } from '@react-navigation/native';
import api from '../../services/api';
import { AsyncStorage } from 'react-native';
import { format, parse } from 'date-fns';

function registerAddress({ navigation }) {
    const [zip_code, setZipCode] = useState('');
    const [state, setState] = useState('');
    const [city, setCity ] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [ street , setStreet ] = useState('');
    const [complement, setComplement] = useState('')
    const [number, setNumber] = useState();
    const route = useRoute();
    const event = route.params.event;


    function navigateToMyEvents() {
        navigation.navigate('Meus Eventos');

    }

    async function register(){
        
        if(!event | !zip_code | !state | !city | !neighborhood | !street | !complement | !number){
            return alert('Preencha todos os campos')
        }
        event.date = format(parse(event.date, `dd/MM/yyyy HH:mm`, new Date()), `yyyy-MM-dd'T'hh:mm:ss`)
        event.finish_time = format(parse(event.finish_time , `dd/MM/yyyy HH:mm`, new Date()), `yyyy-MM-dd'T'hh:mm:ss`)
        try{
            const user_id = await AsyncStorage.getItem('user_id');
            const response = await api.post(`users/${user_id}/events`, { event, zip_code, state, city, neighborhood, street, complement, number});
            alert('Evento cadastrado com sucesso!')
            navigateToMyEvents();
        }
        catch{
            return alert('Erro, porfavor tente novamente')
        }
        
    }

  
    useFocusEffect(
        React.useCallback(() => {
        }, [event])
    );

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
                        <Text style={styles.info}>Cidade</Text>
                        <TextInput placeholder={'Cidade'} style={styles.description} onChangeText={text => setCity(text)}/>
                    </View>

                    <View style={styles.infoValue}>
                        <Text style={styles.info}>Bairro</Text>
                        <TextInput placeholder={'Bairro'} style={styles.description} onChangeText={text => setNeighborhood(text)}/>
                    </View>

                    <View style={styles.infoValue}>
                        <Text style={styles.info}>Rua</Text>
                        <TextInput placeholder={'Rua'} style={styles.description} onChangeText={text => setStreet(text)}/>
                    </View>

                    <View style={styles.infoValue}>
                        <Text style={styles.info}>Complemento</Text>
                        <TextInput placeholder={'Complemento'} style={styles.description} onChangeText={text => setComplement(text)}/>
                    </View>
                    <View style={styles.final}>
                        <View style={styles.infoValue}>
                            <Text style={styles.info}>Numero</Text>
                            <TextInput placeholder={'Numero'} style={styles.phone} onChangeText={text => setNumber(`${text}`)}/>
                        </View>
                        <View style={styles.infoValueState}>
                            <Text style={styles.info}>Estado</Text>
                            <TextInput type={String} maxLength={2} placeholder={'Estado'} style={styles.phone} onChangeText={text => setState(text)}/>
                        </View>
                    </View>
                        <View style={styles.infoValue}>
                            <Text style={styles.info}>CEP</Text>
                            <TextInput placeholder={'CEP'} style={styles.phone} onChangeText={text => setZipCode(`${text}`)}/>
                        </View>
                    
                    
                    <TouchableOpacity onPress={ () => register()}>
                        <View style={styles.menuButton} >
                            <Text style={[styles.buttonCadastrar, { marginTop: 0}]} >Proximo</Text>
                        </View>
                    </TouchableOpacity> 
            </View>
        </View>
        
  )
}

export default registerAddress;