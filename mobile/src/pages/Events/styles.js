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
        height: 45,
        width:335,
        left: 20,
    },
    logo:{
        marginLeft: 100
    },
    search:{
        marginTop: 32,
    },
    eventList:{
        marginTop: 32,
    },
    event:{
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
        color: '#41414d',
        fontWeight: 'bold',
    },
    description:{
        color: '#41414d',
        fontWeight: "normal"
    },
    details:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    info:{
        flexDirection: 'row',
        justifyContent:'space-evenly',
        marginTop: 30,  
    },
    infos:{
        color: '#41414d',
        fontWeight: 'bold',
        marginLeft: 5
    },
    icon:{
        height:20,
        width: 20
    }
    




});