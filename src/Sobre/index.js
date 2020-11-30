import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';


Icon.loadFont();

export default function Sobre({navigation}){
    return(
        <View style={styles.container}>
            <View style={styles.menu}>
              <Icon
                name="bars"
                size={32}
                color="white"
                onPress={() => {navigation.openDrawer()}}
              />
            </View>     
            <ScrollView>
                <View>
                <Text style={styles.title}>
                        <Icon name='info-circle' size={20} color="#fff"></Icon>
                        { } SOBRE O MELANOFF 
                </Text>
                <TouchableOpacity style={styles.card}>
                    <Text style={styles.titleCard}>
                            <Icon name='fire' size={20} color="#c0272c"></Icon>
                            { } MELANOFF 
                    </Text>
                    <Text style={styles.text}>
                        Trabalho de conclusão de curso de Sistemas de Informação. {'\n'} {'\n'}
                        Tema: Auxilio ao homem do campo na prevenção do câncer de pele utilizando visão computacional
                    </Text>
                    <Text style={styles.text}>
                        Orientador: Marcos Moretto {'\n'}
                        Coorientador: Asdrubal Cezar Russo
                    </Text>
                    
                    <Text style={styles.cardText}>
                        Desenvolvido por Bruno Fontana {'\n'}
                        <Text style={styles.text}>
                            Unochapecó
                        </Text>
                    </Text>
                    
                
                </TouchableOpacity>
                
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: "#c0272c",
      justifyContent: "center",
      alignContent: "center",
      alignItems: 'center',
    },
   
    title:{
      alignContent:'center',
      textAlign:'center',
      fontWeight: 'bold',
      marginTop:20,
      marginBottom:20,
      fontSize:22,
      color:'#fff'
    },
    titleCard:{
        alignContent:'center',
        textAlign:'center',
        fontWeight: 'bold',
        marginTop:20,
        marginBottom:20,
        fontSize:22,
        color:'#c0272c'
      },
    card: {
        marginLeft:10,
        marginRight:10,
        marginTop:100,
        marginBottom:100,
        backgroundColor:'#fff',
        shadowColor:'#ccc',
        borderWidth:0,
        borderRadius:3,
        shadowOpacity:0.2,
        shadowRadius:10,
        elevation: 5,
        shadowOffset:{
          width:3,
          height:3
        }
    
      },
      cardText:{
        marginTop:20,
        marginBottom:20,
        alignContent:'center',
        textAlign: 'center',
        justifyContent: "center",
        fontSize:20,
        padding:10,
        fontWeight:'bold',
      },
      text:{
        color:'#000',
        alignContent:'center',
        textAlign: 'center',
        justifyContent: 'flex-end',
        fontSize:15,
        padding:10,
      },
      menu:{
        position:'absolute',
        left:15,
        top:15,
        zIndex:1
      }
  });