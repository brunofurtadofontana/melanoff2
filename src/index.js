import React, { useEffect, useState, Component} from 'react';
import { StatusBar, Text, View, Alert, StyleSheet} from 'react-native';
import {NavigationContainer, NavigationHelpersContext} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity } from 'react-native-gesture-handler';

import Home from './Home';
import Sobre from './Sobre';
import Question from './Question';
import Camera from './Camera';
import Result from './Result'

Icon.loadFont();
const Drawer = createDrawerNavigator();
const Route = 0;
export default function App(){
    return (
        <NavigationContainer>
          <View >
              
          </View>
        <Drawer.Navigator initialRouteName="Home" drawerType="back" overlayColor="transparent" >
        <Drawer.Screen name="Home" component={Home}
          options={{
            title: 'Home',
            justifyContent: 'center',
            // header: () => (
            //   <Button
            //     onPress={() => {navigation.openDrawer()}}
            //     title="Info"
            //     color="#00cc00"
            //   />
            // ),
            drawerIcon: config =>
              <Icon name='home' size={20} color="#c0272c"></Icon>,
            headerStyle: {
              // backgroundColor: '#c0272c',
            },           
            headerTintColor:'#fff'
          }}
        />
        <Drawer.Screen name="Question" component={Question} 
        options={{
          title: 'Fazer Teste',
          drawerIcon: config =>
          <Icon name='fire' size={20} color="#c0272c"></Icon>
        }}
        />
        <Drawer.Screen name="Camera" component={Camera} 
        options={{
          title: 'Camera',
          drawerIcon: config =>
          <Icon name='camera' size={20} color="#c0272c"></Icon>
        }}
        />
        <Drawer.Screen name="Result" component={Result} 
        options={{
          title: 'Resultado',
          drawerIcon: config =>
          <Icon name='exclamation-triangle' size={20} color="#c0272c"></Icon>
        }}
        />   
        <Drawer.Screen name="Sobre" component={Sobre} 
        options={{
          title: 'Sobre',
          drawerIcon: config =>
          <Icon name='info-circle' size={20} color="#c0272c"></Icon>
        }}
        />
        
        </Drawer.Navigator>
        
        </NavigationContainer>
         
    );
}
