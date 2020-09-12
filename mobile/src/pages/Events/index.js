import React, { useEffect, useState } from 'react';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import menuImg from '../../assets/menu.png';
import calendar from '../../assets/calendar.png';
import peoples from '../../assets/peoples.png';
import money from '../../assets/money.png';
import api from '../../services/api';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList} from 'react-native';



export default function Login ( { navigation } ) {
    const [events, setEvents] = useState([]);

    function navigateToDetail(event) {
        navigation.navigate('Detalhes', { event });
    }

    async function loadEvents() {
        const response = await api.get('events');
        setEvents(response.data);
    }

    useEffect(() => {
        loadEvents();
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
                <TextInput  style={styles.search} placeholder={'Procurar Evento'}/>

                
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
                                <Text style={ styles.infos}></Text>
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