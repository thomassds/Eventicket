import React, {useState} from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import logoImg from '../../assets/login.png';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';


export default function Login () {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [user, setUser] = useState();
    const navigation = useNavigation();

    function navigateToEvents() {
        navigation.navigate('Root');
    }

    async function authentication() {
        const data = {email, password}
        try{
            const response = await api.post(`signin`, data);
            navigateToEvents();
        }
            catch{
        alert('Usuario ou senha invalidos')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image} source={logoImg}/>
                <Text style={styles.welcome}>Bem-Vindo</Text>
            </View>
    
            <View style={styles.aut}>
                <Text style={styles.infoEmail}>E-mail</Text>
                <TextInput style={styles.inputDescription} placeholder={" Digite seu e-mail"} onChangeText={text => setEmail(text)} defaultValue={email}></TextInput>

                <Text style={styles.infoPassword}>Senha</Text>
                <TextInput style={styles.inputDescription}placeholder=" Digite sua senha"  secureTextEntry={true} onChangeText={text => setPassword(text)}></TextInput>

                <TouchableOpacity onPress={async () => authentication()}>
                    <View style={styles.menuButton} >
                        <Text style={[styles.buttonEntrar, { marginTop: 0}]} >Entrar</Text>
                    </View>
                </TouchableOpacity> 

                <TouchableOpacity>  
                    <Text style={[styles.buttonReset, { marginTop: 0}]}>Esqueci minha senha?</Text>
                </TouchableOpacity> 

                <TouchableOpacity>  
                    <Text style={[styles.buttonNew, { marginTop: 0}]}>Ainda não possui cadastro?  Clique aqui!</Text>
                </TouchableOpacity> 
            </View>
        </View>
    );
}