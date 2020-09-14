import React, { useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import menuImg from '../../assets/menu.png';
import calendar from '../../assets/calendar.png';
import peoples from '../../assets/peoples.png';
import mais from '../../assets/mais.png';
import api from '../../services/api';
import { View, Text, Image, TouchableOpacity, FlatList, AsyncStorage} from 'react-native';
import { format, parseISO } from 'date-fns';

export default function Events ( { navigation } ) {
    const [events, setEvents] = useState([]);

    
    function navigateToRegisterEvent(){
        navigation.navigate('Novo Evento')
    }

    function navigateToDetail(event) {
        navigation.navigate('Gerenciar', { event });
    }

    async function loadEvents() {
        const user_id = await AsyncStorage.getItem('user_id');
        const response = await api.get(`users/${user_id}/events`);
        setEvents(response.data.events);
    }

    useFocusEffect(
        React.useCallback(() => {
            loadEvents();
        }, [])
      );
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={( ) => navigation.openDrawer()}>
                    <Image style={styles.menu} source={menuImg}/>
                </TouchableOpacity>
                <Image style={styles.logo} source={logoImg}/>
                <TouchableOpacity onPress={( ) => navigateToRegisterEvent()}>
                    <Image style={styles.menu} source={mais}/>
                </TouchableOpacity>
            </View>

            <View style={styles.events}>
                    
                <FlatList
                    data={events}
                    style={styles.eventList}
                    keyExtractor={event => String(event.id)}
                    showsVerticalScrollIndicator={ false }
                    renderItem={({ item: event }) => (
                        <TouchableOpacity onPress={( ) => navigateToDetail(event)}>
                        <View style={ styles.event}>
                            <View style={ styles.title}>
                                <Text style={ styles.name}>{event.name}</Text>
                                <Text style={ styles.description}>{event.description}</Text>
                            </View>

                            <View style={ styles.info}>
                                <View style={ styles.details}>
                                    <Image style={styles.icon} source={calendar}/>
                                <Text style={ styles.infos}>{format(parseISO(event.date),'dd/MM/yyyy')}</Text>
                                </View>
                                <View style={ styles.details}>
                                    <Image style={styles.icon} source={peoples}/>
                                    <Text style={ styles.infos}>{event.amount_sales}/{event.amount}</Text>
                                </View>
                            </View>
                        </View>
                        </TouchableOpacity>   
                    )}
                />   
                
            </View>
        </View>
    )
}