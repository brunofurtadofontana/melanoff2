import React, { version } from 'react'
import {View, Text, StyleSheet,Alert, StatusBar, TouchableHighlight, Linking, Image, Animated} from 'react-native'
import Temp from '../Weather';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
// import CustonHeader from '../CustonHeader'
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Home({navigation}){
  let offset = 0;
  const translateY = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true },
  );
function onHandlerStateChange(event){
    if (event.nativeEvent.oldState === State.ACTIVE) {
        let opened = false;
        const { translationY } = event.nativeEvent;
  
        offset += translationY;
  
        if (translationY >= 100) {
          opened = true;
        } else {
          translateY.setValue(offset);
          translateY.setOffset(0);
          offset = 0;
        }
  
        Animated.timing(translateY, {
          toValue: opened ? 380 : 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          offset = opened ? 380 : 0;
          translateY.setOffset(offset);
          translateY.setValue(0);
        });
      }
}
    return(
          
          <View style={styles.container} >
            <View style={styles.menu}>
              <Icon
                name="bars"
                size={32}
                color="white"
                onPress={() => {navigation.openDrawer()}}
              />
            </View>
            <Temp translateY={translateY}  />
            <PanGestureHandler
                 onGestureEvent={animatedEvent}
                 onHandlerStateChange={onHandlerStateChange}
            >
            <Animated.View 
                style={[styles.av, {
                    transform:[{
                        translateY: translateY.interpolate({
                            inputRange:[-350, 0, 350],
                            outputRange:[-50, 0, 350],
                            extrapolate: 'clamp',
                        }),
                    }],
                }]}
            >
            <View style={styles.card}>
            <Image source = {require('./splash_screen.png')} 
                  style={styles.cardImage}
            />
            <Text style={styles.welcome}>Seja Bem vindo!</Text>
            <Text style={styles.intro}>
              O MELANOFF vai auxiliar na prevenção de câncer de pele causado pela
               exposição aos raios ultravioletas sem proteção.
            </Text>
            <Text 
            onPress={() => Linking.openURL('https://www.inca.gov.br/tipos-de-cancer/cancer-de-pele-melanoma')}
            style={styles.link}>Saiba mais sobre câncer de pele
            </Text>
            
            <TouchableHighlight
                style={styles.submit}
                onPress={() => navigation.navigate("Question")}
                underlayColor='#ccc'>
                <Text style={styles.submitText}>VAMOS COMEÇAR?</Text>
            </TouchableHighlight>
            </View>
            </Animated.View>
            </PanGestureHandler>
            
        </View>
       
    );
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: "#c0272c",
    },
    welcome:{
      fontSize:20,
      textAlign: "center",
      margin: 10,
      color:"#000",
      fontWeight: "bold"
    },
    intro:{
      fontSize:18,
      textAlign: "center",
      margin: 10,
      color:"#000",
      textAlign:'justify',
    },
    link:{
      fontSize: 16,
      color:'#0099cc',
      textAlign: "center",
    },
    card: {
        position:'relative', 
        top:0,
        marginLeft:10,
        marginRight:10,
        justifyContent: "center",
        alignContent: "center",
        alignItems: 'center',
        backgroundColor:'#fff',
        shadowColor:'#ccc',
        borderWidth:0,
        borderRadius:5,
        shadowOpacity:0.4,
        shadowRadius:10,
        elevation: 5,
        shadowOffset:{
          width:5,
          height:5
        }
    
      },
      av:{
          position:'absolute',
          top:170,
          height:'100%',
      },
    cardImage:{
      width:100,
      height:100,
     shadowOpacity:1,
     shadowColor:'#000000',
     shadowOffset:{
      width:3,
      height:3
        }
    },
    submit:{
      width:'60%',
      marginRight:40,
      marginLeft:40,
      marginTop:10,
      marginBottom:10,
      paddingTop:20,
      paddingBottom:20,
      backgroundColor:'transparent',
      borderRadius:100,
      borderWidth: 1,
      borderColor: '#c0272c'
    },
    submitText:{
      fontSize: 16,
      color:'#c0272c',
      textAlign:'center'
    },
    menu:{
      backgroundColor:'#c0272c',
      position:'absolute',
      left:15,
      top:15,
      zIndex:1
    }
  });