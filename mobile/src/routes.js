import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './pages/Login';
import registerUser from './pages/registerUser';
import Events from './pages/Events';
import Tickets from './pages/Tickets';
import Detail from './pages/Detail';

import myEvents from './pages/myEvents';
import manageEvent from './pages/manageEvent';
import registerProducts from './pages/registerProducts';
import registerEvent from './pages/registerEvent';
import registerAddress from './pages/registerAddress';
import editEvent from './pages/editEvent';
import editAddress from './pages/editAddress';
const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Client(){
    return(
        <Drawer.Navigator >
            <AppStack.Screen name="Eventos" component={Events}  />
            <AppStack.Screen name="Meus  Ingressos" component={Tickets}  />
            
        </Drawer.Navigator>
    );
}

function Productor(){
    return(
        <Drawer.Navigator >
            <AppStack.Screen name="Meus Eventos" component={myEvents}/>
            <AppStack.Screen name="Novo Evento" component={registerEvent}/>
        </Drawer.Navigator>
    );
}

export default function App() {
  return (
    <NavigationContainer>
        <AppStack.Navigator screenOptions= {{ headerShown: false}}>
            <AppStack.Screen name="Login" component={Login}  />
            <AppStack.Screen name="RegisterUser" component={registerUser} />
            <AppStack.Screen name="Client" component={Client}  />
            <AppStack.Screen name="Productor" component={Productor}  />
            <AppStack.Screen name="Address" component={registerAddress}/>
            <AppStack.Screen name="RegisterProducts" component={registerProducts}/>
            <AppStack.Screen name="Novo Evento" component={registerEvent}/>
            <AppStack.Screen name="Gerenciar" component={manageEvent}/>
            <AppStack.Screen name="Detalhes" component={Detail}/>
            <AppStack.Screen name="editEvent" component={editEvent}/>
            <AppStack.Screen name="editAddress" component={editAddress}/>
        </AppStack.Navigator>
    </NavigationContainer>
  );
}