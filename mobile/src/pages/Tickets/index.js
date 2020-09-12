import React from 'react';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import menuImg from '../../assets/menu.png';
import calendar from '../../assets/calendar.png';
import ticketsAmount from '../../assets/ticketsAmount.png';
import { View, Text, Image, TouchableOpacity, FlatList} from 'react-native';


export default function Tickets ( { navigation } ) {

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
                    data={[1,2]}
                    style={styles.eventList}
                    keyExtractor={event => String(event)}
                    showsVerticalScrollIndicator={ false }
                    renderItem={( ) => (
                        <View style={ styles.event}>
                            <View style={ styles.title}>
                                <Text style={ styles.name}>LollaPalooza</Text>
                                <Text style={ styles.description}>Festival de Musica</Text>
                            </View>

                            <View style={ styles.info}>
                                <View style={ styles.details}>
                                    <Image style={styles.icon} source={calendar}/>
                                    <Text style={ styles.infos}>20/10/2020</Text>
                                </View>
                                <View style={ styles.details}>
                                    <Image style={styles.icon} source={ticketsAmount}/>
                                    <Text style={ styles.infos}>5</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />      
            </View>
        </View>
    )
}