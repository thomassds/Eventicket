import { StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 10,
        backgroundColor: '#008CED',
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        height: 45,
        width:335,
        left: 20,
    },
    event:{
        marginTop: 32,
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
        
    },
    title:{
        alignItems: 'center',
    },
    name:{
        fontSize: 24,
        color: '#000000',
        fontWeight: 'bold',
    },
    description:{
        color: '#41414d',
        fontWeight: "normal"
    },
    details:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    info:{
        
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        
        marginTop: 30,  
    },
    infos:{
        color: '#41414d',
        fontWeight: 'bold',
        fontSize:16,
        marginLeft: 10,
        
    },
    icon:{
        height:25,
        width: 25
    },
    menuButton: {
        alignItems: 'center',
        padding: 15,
        width: 250,
        borderRadius: 10,
        backgroundColor: '#F4A528',
        marginTop: 50,
        marginBottom: 15,
        marginHorizontal: 40
    },


    buttonEntrar: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        color: '#FFFFFF',
    },
    ticketList:{
        marginTop: 20,
    },
    ticket:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    descriptionTicket:{
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color:'#FFFFFF'
    },
    amount:{
        fontSize: 16,
        fontWeight: 'bold',
        color:'#FFFFFF'
    },
    total:{
        flexDirection: 'row',
    },
    amountTotal:{
        fontSize: 16,
        fontWeight: 'bold',
        color:'#FFFFFF',
        marginLeft: 152    
    },
    valueTicket:{
        fontSize: 16,
        fontWeight: 'bold',
        color:'#FFFFFF',  
    },
    buttons:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        width: 217
    },
});