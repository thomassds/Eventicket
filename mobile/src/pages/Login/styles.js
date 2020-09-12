import { StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: '#008CED',
    },
    header:{
        position: 'absolute',
        width: 260,
        height: 241,
        left: 79,
        top: 34,
    },
    image:{
        position: 'absolute',
        width: 145,
        height: 133,
        left: 52,
        top: 0,
    },
    
    welcome:{
        position: 'absolute',
        width: 170,
        height: 28,
        left: 41,
        top: 140,
        fontSize: 24,
        color: '#FFFF',
        fontWeight: 'bold',
        textAlign:'center'
    },

    title: {
        fontSize: 30,
        marginTop: 10,
        color: '#da552f',
        fontWeight: 'bold',
        textAlign:'center'
    },

    aut: {
        marginTop: 200,
        marginBottom: 50,
        height: 400,
        borderRadius: 8,
        backgroundColor: '#008CED',
    },

    infoEmail:{
        marginTop: 0,
        marginLeft: 30,
        fontSize: 14,
        fontWeight: 'bold',
        color:'#FFFFFF',
        
    },
    infoPassword:{
        marginTop: 30,
        marginLeft: 30,
        fontSize: 14,
        fontWeight: 'bold',
        color:'#FFFFFF',
        
    },

    inputDescription:{
        marginRight:10,
        marginTop: 5,
        marginLeft: 30,
        width: 300,
        height: 32, 
        backgroundColor: '#FFF',
        fontWeight: 'bold',
        color: '#737380',  
           
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

    buttonReset:{
        color: '#FFFFFF',  
        marginHorizontal: 100,
        marginBottom: 75,
    },

    buttonNew:{
        color: '#FFFFFF',  
        marginHorizontal: 50,

    }

});