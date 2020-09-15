import React, { useState, useEffect, } from 'react';
import { View, TouchableOpacity, Image, Text,TextInput, FlatList} from 'react-native';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import menuImg from '../../assets/menu.png';
import backImg from '../../assets/back.png';
import clockImg from '../../assets/relogio.png';
import calendarImg from '../../assets/calendar.png';
import peoplesImg from '../../assets/peoples.png';
import maisImg from '../../assets/mais.png';
import menosImg from '../../assets/menos.png';
import { useRoute } from '@react-navigation/native';
import api from '../../services/api';
import { AsyncStorage } from 'react-native';
import { format, parseISO } from 'date-fns';


export default function Detail ( { navigation } ) {
    const [tickets, setTickets] = useState();
    const [ value, setValue ] = useState(0);
    const [ total, setTotal ] = useState(0);
    const route = useRoute();
    const event = route.params.event;
    

    function navigateToEvents() {
        navigation.navigate('Eventos');
    }

    async function loadTickets() {
        setValue(0)
        const response = await api.get(`events/${event.id}/products`);
	    if(response.data.hasProducts) {
		    const newTickets = response.data.hasProducts.map((t) => {
			    return { ...t, amount_buy: 0 }
            })
            setTickets(newTickets)
        }  
        
    }

    function moreTickets(id){
        const newTickets = tickets.map((t) => { 
            if(t.id === id) {
                 t.amount_buy = t.amount_buy + 1,
                 setValue(value + t.value)
                 setTotal(total + 1)
            } 
            return { ...t }
        })
        
        setTickets(newTickets);
    }  
    
    function lessTickets(id){
        const newTickets = tickets.map((t) => { 
            if(t.id === id) {
                if(t.amount_buy === 0){
                    return 
                }
                 t.amount_buy = t.amount_buy - 1,
                 setValue(value - t.value)
                 setTotal(total -1)
            } 
            return { ...t }
        })

        setTickets(newTickets);
    }

    async function checkout(){
        if( event.amount_buy == 0){
            return alert('Escola a quantidade de ingressos que deseja comprar')
        }
        console.log(total)
        if(event.amount_sales == event.amount){
            return alert('Ingressos Esgotados')
        }
        if((event.amount_sales + total) > event.amount){
            return alert(`Possuem apenas ${event.amount - event.amount_sales} para vender`)
        }
        const amount_value = value
    
        
        try{
            const user_id = await AsyncStorage.getItem('user_id');
            const response = await api.post(`/users/${user_id}/buys`, {data: {amount_sales: event.amount_sales, event_id : event.id , value,amount_value, tickets}});
            alert('Compra realizada com sucesso')
            navigateToEvents();
        }
        catch{
            alert('error')
        }
    }
    
    
    
    useEffect(() => {
        loadTickets() 
    }, [event]);

    useEffect(() => {

    }, [  tickets ])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={( ) => navigation.openDrawer()}>
                    <Image style={styles.menu} source={menuImg}/>
                </TouchableOpacity>
                <Image style={styles.logo} source={logoImg}/>
                <TouchableOpacity onPress={( ) => navigateToEvents()}>
                    <Image style={styles.back} source={backImg}/>
                </TouchableOpacity>
            </View>

            <View style={ styles.event}>
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

                    </View>
                    <View style={ styles.column}>
                        <View style={ styles.details}>
                            <Image style={styles.icon} source={peoplesImg}/>
                            <Text style={ styles.infos}>{event.amount_sales}/{event.amount}</Text>
                        </View>

                        <View style={ styles.details}>
                            <Image style={styles.icon} source={clockImg}/>
                            <Text style={ styles.infos}>{format(parseISO(event.finish_time),'dd/MM/yyyy')}</Text>
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
                                <Text style={styles.valueTicket}>{Intl.NumberFormat('pt-BR', {
                                    style: 'currency', currency: 'BRL'
                                    }).format(ticket.value)}</Text> 
                                <Text style={styles.amount}>{ticket.amount_buy}</Text>

                            
                                <TouchableOpacity onPress={() =>  moreTickets(ticket.id)}>
                                    <Image style={styles.menu} source={maisImg}/>
                                </TouchableOpacity>       
                                <TouchableOpacity onPress={() =>  lessTickets(ticket.id)}>
                                    <Image style={styles.menu} source={menosImg}/>
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
            <TouchableOpacity onPress={() => checkout()}>
                <View style={styles.menuButton} >
                    <Text style={[styles.buttonEntrar, { marginTop: 0}]} >Comprar</Text>
                </View>
            </TouchableOpacity> 
            
        </View>
        
    );
}