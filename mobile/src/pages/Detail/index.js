import React, { useState, useEffect} from 'react';
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



export default function Detail ( { navigation } ) {
    const [tickets, setTickets] = useState([]);
    const [products, setProducts] = useState([]);
    const [ total, setTotal ] = useState(0);
    const route = useRoute();
    const event = route.params.event;

    function navigateToDetail() {
        navigation.navigate('Eventos');
    }

    async function loadTickets() {
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
                 setTotal(total -1)
            } 
            return { ...t }
        })

        setTickets(newTickets);
    }

    async function checkout(){
        const newTickets = tickets.map((t) => {
            console.log(products)
            for(var i = 0; i < t.amount_buy; i++){
                products.push(t.id)
            }
        })
        

        
    }
    


    useEffect(() => {
        loadTickets();
    }, []);

    useEffect(() => {

    }, [ tickets ])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={( ) => navigation.openDrawer()}>
                    <Image style={styles.menu} source={menuImg}/>
                </TouchableOpacity>
                <Image style={styles.logo} source={logoImg}/>
                <TouchableOpacity onPress={( ) => navigateToDetail()}>
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
                            <Text style={ styles.infos}>{event.date}</Text>
                        </View>

                        <View style={ styles.details}>
                            <Image style={styles.icon} source={clockImg}/>
                            <Text style={ styles.infos }>{event.start_time}</Text>
                        </View>
                    </View>
                    <View style={ styles.column}>
                        <View style={ styles.details}>
                            <Image style={styles.icon} source={peoplesImg}/>
                            <Text style={ styles.infos}>{event.amount_sales}/{event.amount}</Text>
                        </View>

                        <View style={ styles.details}>
                            <Image style={styles.icon} source={clockImg}/>
                            <Text style={ styles.infos}>{event.finisht_time}</Text>
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
                            <Text style={styles.amount}>{ticket.amount_buy}</Text>

                            
                                <TouchableOpacity onPress={() =>  moreTickets(ticket.id)}>
                                    <Image style={styles.menu} source={maisImg}/>
                                </TouchableOpacity>       
                                <TouchableOpacity onPress={() => {setProducts(products => [...products, ticket.id]); lessTickets(ticket.id)}}>
                                    <Image style={styles.menu} source={menosImg}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            <View style={styles.total}>
                <Text style={styles.descriptionTicket}> Total</Text> 
                    <Text style={styles.amountTotal}>{total}</Text> 
            </View>   
            <TouchableOpacity onPress={() => {setProducts([]); checkout(); }}>
                <View style={styles.menuButton} >
                    <Text style={[styles.buttonEntrar, { marginTop: 0}]} >Comprar</Text>
                </View>
            </TouchableOpacity> 
            
        </View>
        
    );
}