import React, { useEffect, useState } from 'react';
import styles from './styles';
import { View, TouchableOpacity, Image, TextInput, Text, CheckBox} from 'react-native';
import logoImg from '../../assets/logo.png';
import menuImg from '../../assets/menu.png';
import api from '../../services/api';


function RegisterUser({ navigation }) {
    const [name, seetName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [ phone, setPhone ] = useState({});
    const [type, setType] = useState(false)
    const [data, setData] = useState({});

    function navigateToLogin() {
        navigation.navigate('Login');

    }

    async function register(){
        if(!email | !password | !confPassword | !phone | !type){
            return alert('Digite todos os campos.')
        }
        const response = await api.get(`user/${email}`)
        if(response){
            return alert('Email ja cadastrado.')
        }
        if(password !== confPassword){
            return alert('As senhas precisam ser iguais.');
        }
        setData({ name, email, password, phone, type})
        try{
        const response = await api.post('users', data)
        alert('Cadastrado com sucesso. Porfavor, faça login para acessar')
        navigateToLogin()
        
        }catch{
            alert('Erro ao se cadastrar. Porfavor tente novamente mais tarde!')
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
                    <View style={styles.infoValue}>
                        <Text style={styles.info}>Nome</Text>
                        <TextInput placeholder={'Nome'} style={styles.description} onChangeText={text => seetName(text)}/>
                    </View>

                    <View style={styles.infoValue}>
                        <Text style={styles.info}>Email</Text>
                        <TextInput placeholder={'Email'} style={styles.description} onChangeText={text => setEmail(text)}/>
                    </View>

                    <View style={styles.infoValue}>
                        <Text style={styles.info}>Senha</Text>
                        <TextInput placeholder={'Senha'} style={styles.description} onChangeText={text => setPassword(text)}/>
                    </View>

                    <View style={styles.infoValue}>
                        <Text style={styles.info}>Confirmação de Senha</Text>
                        <TextInput placeholder={'Confirmação'} style={styles.description} onChangeText={text => setConfPassword(text)}/>
                    </View>
                    
                    <View style={styles.final}>
                        <View style={styles.infoValue}>
                            <Text style={styles.info}>Telefone</Text>
                            <TextInput placeholder={'Telefone'} style={styles.phone} onChangeText={text => setPhone((text))}/>
                        </View>

                        <View style={styles.infoValue}>
                            <Text style={styles.info}>Produtor de Eventos</Text>
                            <CheckBox style={styles.chebox} value={type} onValueChange={setType}/>
                        </View>
                    </View>
                    
                    <TouchableOpacity onPress={ () => register()}>
                        <View style={styles.menuButton} >
                            <Text style={[styles.buttonCadastrar, { marginTop: 0}]} >Cadastrar</Text>
                        </View>
                    </TouchableOpacity> 
            </View>
        </View>
        
  )
}

export default RegisterUser;