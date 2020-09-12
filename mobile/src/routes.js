import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './pages/Login';
import Events from './pages/Events';
import Tickets from './pages/Tickets';
import Detail from './pages/Detail';

const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Root(){
    return(
        <Drawer.Navigator >
            <AppStack.Screen name="Eventos" component={Events}  />
            <AppStack.Screen name="Meus  Ingressos" component={Tickets}  />
            <AppStack.Screen name="Detalhes" component={Detail}/>
        </Drawer.Navigator>
    
    );
}
export default function App() {
  return (
    <NavigationContainer>
        <AppStack.Navigator screenOptions= {{ headerShown: false}}>
            <AppStack.Screen name="Login" component={Login}  />
            <AppStack.Screen name="Root" component={Root}  />
            
        </AppStack.Navigator>
    </NavigationContainer>
  );
}