import React, { useEffect, useState} from 'react';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import menuImg from '../../assets/menu.png';
import calendar from '../../assets/calendar.png';
import ticketsAmount from '../../assets/ticketsAmount.png';
import { View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import api from '../../services/api';
import { AsyncStorage } from 'react-native';
import { format, parseISO } from 'date-fns';


    

export default function Tickets ( { navigation } ) {
    const [products, setProducts] = useState([])
    async function loadTickets(){
        var data =[]
        try{
            const user_id = await AsyncStorage.getItem('user_id');
            const response = await api.get(`users/${user_id}/buys`)
            for(var i = 0; i < response.data.length;i++){
                
                for(var x = 0; x < response.data[i].products.length; x++){
                    data.push(response.data[i].products[x])
                } 
            }
        }catch{   
        }
        setProducts(data)
    }


    useEffect(() => {
        loadTickets();
        
    }, [])
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={( ) => navigation.openDrawer()}>
                    <Image style={styles.menu} source={menuImg}/>
                </TouchableOpacity>
                <Image style={styles.logo} source={logoImg}/>
            </View>

            <View style={styles.events}>
                <FlatList
                    data={products}
                    style={styles.eventList}
                    keyExtractor={product => String(product.id)}
                    showsVerticalScrollIndicator={ false }
                    renderItem={({ item: product }) => (
                        <View style={ styles.event}>
                            <View style={ styles.title}>
                            <Text style={ styles.name}>{product.description}</Text>
                                <Text style={ styles.description}>{product.event_name}</Text> 
                            </View>

                            <View style={ styles.info}>
                                <View style={ styles.details}>
                                    <Image style={styles.icon} source={calendar}/>
                                    <Text style={ styles.infos}>{format(parseISO(product.event_date),'dd/MM/yyyy')}</Text>
                                </View>
                                <View style={ styles.details}>
                                    <Image style={styles.icon} source={ticketsAmount}/>
                                    <Text style={ styles.infos}>{Intl.NumberFormat('pt-BR', {
                                    style: 'currency', currency: 'BRL'
                                    }).format(product.value)}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />      
            </View>
        </View>
    )
}