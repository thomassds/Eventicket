import React, { useState, useEffect, useDebugValue} from 'react';
import { View, TouchableOpacity, Image, Text,TextInput, FlatList} from 'react-native';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import menuImg from '../../assets/menu.png';
import backImg from '../../assets/back.png';
import clockImg from '../../assets/relogio.png';
import calendarImg from '../../assets/calendar.png';
import peoplesImg from '../../assets/peoples.png';
import editImg from '../../assets/editar.png';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import { format, parseISO } from 'date-fns';



export default function Detail ( { navigation } ) {
    const [tickets, setTickets] = useState();
    const [ value, setValue ] = useState(0);
    const route = useRoute();
    const event = route.params.event;

    function navigateTomyEvents() {
        navigation.navigate('Meus Eventos');
    }

    async function loadTickets() {
        var v = 0
        const response = await api.get(`events/${event.id}/products`);
        setTickets(response.data.hasProducts)
	    
		    const newTickets = response.data.hasProducts.map((t) => {
                v = v + ( t.amount_sales * t.value )
			    return { v}
            })
        setValue(v)
    }


    function newTicket(  ){
        navigation.navigate('Novo Evento');
    }

    function navigateToEditEvent(event){
        navigation.navigate('editEvent', { event });
    }
    
    useFocusEffect(
        React.useCallback(() => {
            loadTickets(); 
        }, [event])
    );

    useEffect(() => {
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={( ) => navigation.openDrawer()}>
                    <Image style={styles.menu} source={menuImg}/>
                </TouchableOpacity>
                <Image style={styles.logo} source={logoImg}/>
                <TouchableOpacity onPress={( ) => navigateTomyEvents( event )}>
                    <Image style={styles.back} source={backImg}/>
                </TouchableOpacity>
            </View>

            <View style={ styles.event}>
                    <TouchableOpacity onPress={ () => navigateToEditEvent(event)}>
                        <Image style={styles.edit} source={editImg}/>
                    </TouchableOpacity>
                <View style={ styles.title}>
                    <Text style={ styles.name}>{event.name}</Text>
                    <Text style={ styles.description}>{event.description}</Text>
                </View>
                <View style={ styles.info}>
                    <View style={ styles.column}>
                        <View style={ styles.details}>
                            <Image style={styles.icon} source={calendarImg}/>
                            <Text style={ styles.infos}>{format(parseISO(event.date),'dd/MM/yyyy')}</Text>
                        </View>

                        <View style={ styles.details}>
                            <Image style={styles.icon} source={clockImg}/>
                            <Text style={ styles.infos }>{format(parseISO(event.date),'hh:mm')}</Text>
                        </View>
                    </View>
                    <View style={ styles.column}>
                        <View style={ styles.details}>
                            <Image style={styles.icon} source={peoplesImg}/>
                            <Text style={ styles.infos}>{event.amount_sales}/{event.amount}</Text>
                        </View>

                        <View style={ styles.details}>
                            <Image style={styles.icon} source={clockImg}/>
                            <Text style={ styles.infos}>{format(parseISO(event.finish_time),'dd/MM hh:mm')}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <FlatList
                    data={tickets}
                    style={styles.ticketList}
                    keyExtractor={ticket => String(ticket.id)}
                    showsVerticalScrollIndicator={ false }
                    renderItem={({ item: ticket }) =>  (
                        <View style={styles.ticket}>
                                <Text style={styles.descriptionTicket}>{ticket.description}</Text> 
                                
                            <View style={styles.buttons}>
                                <Text style={styles.valueTicket}>{ticket.amount_sales}</Text> 
                                <Text style={styles.amount}>{Intl.NumberFormat('pt-BR', {
                                    style: 'currency', currency: 'BRL'
                                    }).format(ticket.value * ticket.amount_sales)}</Text>

                                  
                                <TouchableOpacity >
                                    <Image style={styles.menu} source={editImg}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            <View style={styles.total}>
                <Text style={styles.descriptionTicket}> Total</Text> 
                    <Text style={styles.amountTotal}>{Intl.NumberFormat('pt-BR', {
                        style: 'currency', currency: 'BRL'
                        }).format(value)}</Text> 
            </View>   
            <TouchableOpacity onPress={() => newTicket(event)}>
                <View style={styles.menuButton} >
                    <Text style={[styles.buttonEntrar, { marginTop: 0}]} >Novo Ticket</Text>
                </View>
            </TouchableOpacity> 
            
        </View>
        
    );
}