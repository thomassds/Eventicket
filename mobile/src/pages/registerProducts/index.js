import React, { useState } from 'react';
import styles from './styles';
import { View, TouchableOpacity, Image, TextInput, Text} from 'react-native';
import logoImg from '../../assets/logo.png';
import menuImg from '../../assets/menu.png';
import { useRoute } from '@react-navigation/native';
import api from '../../services/api';
function registerProducts({ navigation }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [value, setValue] = useState('');
    const [ data, setData ] = useState({});
    const route = useRoute();
    const event = route.params.event;

    function navigateTomanageEvent() {
        navigation.navigate('Gerenciar');
    }

    async function register(event_id){
        setData({ description, amount, value})
        try{
        const response = await api.post(`events/${event_id}/products`, data)        
        navigateTomanageEvent();
        }
        catch{
            alert('Erro, porfavor tente novamente.')
        }
        
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
                <View style={styles.infoDescription}>
                    <Text style={styles.info}>Descrição</Text>
                    <TextInput placeholder={'Descrição'} style={styles.description} onChangeText={text => setDescription(text)}/>
                </View>
                <View style={styles.two}>

                    <View style={styles.infoValue}>
                        <Text style={styles.info}>Quantidade</Text>
                        <TextInput placeholder={'Quantidade'} style={styles.amount} onChangeText={text => setAmount(text)}/>
                    </View>
                    <View style={styles.infoValue}>
                        <Text style={styles.info}>Valor</Text>
                        <TextInput placeholder={'Valor'} style={styles.amount} onChangeText={text => setValue((text))}/>
                    </View>
                </View>
                <TouchableOpacity>
                        <View style={styles.menuButton} >
                            <Text style={[styles.buttonCadastrar, { marginTop: 0}]} onPress={ () => register(event.id)}>Cadastrar</Text>
                        </View>
                    </TouchableOpacity> 
            </View>
        </View>
        
  )
}

export default registerProducts;