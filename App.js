import React  from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './src/Home';
import Sobre from './src/Sobre';

const Drawer = createDrawerNavigator();
Icon.loadFont();    
export default function App(){
  return (
     <NavigationContainer>
       <Drawer.Navigator >
         <Drawer.Screen name="Home" component={Home} />
         <Drawer.Screen name="Sobre" component={Sobre} />
      </Drawer.Navigator>
    </NavigationContainer>

  );
};
