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
form:{
    marginTop: 0,
    padding: 24,    
    borderRadius: 8,
    marginBottom: 16,
},
info:{
    marginTop: 10,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color:'#FFFFFF',
},
infoValue:{
    marginBottom:15
},
description:{
    marginTop: 5,
    justifyContent:'center',
    width: 317,
    height: 32, 
    backgroundColor: '#FFF',
    fontWeight: 'bold',
    color: '#737380', 
    borderRadius: 10
},
phone:{
    marginTop: 5,
    width: 120,
    height: 32, 
    backgroundColor: '#FFF',
    fontWeight: 'bold',
    color: '#737380', 
    borderRadius: 10
},
final:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'

},
menuButton: {
    alignItems: 'center',
    justifyContent:'center',
    padding: 15,
    width: 250,
    borderRadius: 10,
    backgroundColor: '#F4A528',
    marginTop: 50,
    marginBottom: 15,
    marginHorizontal:30
},


buttonCadastrar: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#FFFFFF',
},
})