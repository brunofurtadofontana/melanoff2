import React,{useEffect,useState} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import { ScrollView, TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

Icon.loadFont();

export default function Result({route, navigation}){
 
  const {id_book} = route.params;
  const [image,setImage] = useState();
  const [opc,setOpc] = useState();
  const [color,setColor] = useState();
  const [status,setStatus] = useState();
  const [tempo,setTempo] = useState();
  const [fator,setFator] = useState();
  async function getData(){
    try{
      await axios.get('https://apimelafoto.herokuapp.com/books/'+id_book) 
        .then((response)=>{
            const data = response.data
            setImage(data.image)
            setOpc(data.status)
           // console.log(data)
        })
        getSkin();
    }catch(err){
      console.log(err)
    }
  }
  async function getSkin(){
    const data = new FormData();
    data.append('opc',opc);
    data.append('url',image)
    console.log(data)
    try{
      await axios.post('https://apimelanoff.herokuapp.com/face_detector/detect',data) 
        .then((response)=>{
            const data = response.data
            console.log(data)
            setColor(data['Color Skin'])
            setStatus(data.opc)
        })
        if(status == 1){
          setTempo('5 MINUTOS')
          setFator('60 FPS.')
        }
        if(status == 2){
          setTempo('5 MINUTOS')
          setFator('60 FPS')
        }
        if(status == 3){
          setTempo('15 MINUTOS')
          setFator('50 FPS')
        }
        if(status == 4){
          setTempo('20 MINUTOS')
          setFator('50 FPS')
        }
        if(status == 5){
          setTempo('25 MINUTOS')
          setFator('40 FPS')
        }
        if(status == 6){
          setTempo('30 MINUTOS')
          setFator('30 FPS')
        }
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    getData();
  }); 
    return(
        <View style={styles.container}>
          <View style={styles.menu}>
              <Icon
                name="bars"
                size={32}
                color="black"
                onPress={() => {navigation.openDrawer()}}
              />
            </View>
            <ScrollView>
                <View>
                <Text style={styles.title}>
                  <Icon name='fire' size={20} color="#fff"></Icon>
                  { } MELANOFF 
                </Text>
                
                <View style={styles.card} >
                    <Text style={styles.titleCard}>
                    <Icon name='exclamation-triangle' size={20} color="#c0272c"></Icon>
                        { } RESULTADO 
                           
                    </Text>
                    <Image 
                      source={{
                        uri:image 
                      }} 
                      style={styles.image}
                    />
                     <View style={styles.boxPele}>
                        <Text style={styles.text}>
                            {color}
                        </Text>
                      </View>
                    <View style={styles.cardView}>
                      <View style={styles.boxClock}>
                        <Text style={styles.text}>
                          Tempo de exposição ao sol sem proteção{'\n'} {'\n'}
                          <Icon name='clock-o' size={30} color="#c0272c"></Icon> {'\n'} {'\n'}
                          {tempo}
                        </Text>
                      </View>
                      <View style={styles.boxFator}>
                        <Text style={styles.text}>
                          Fator de proteção solar mínimo a ser utlizado {'\n'}{'\n'}
                          <Icon name='sun-o' size={30} color="#c0272c"></Icon>{'\n'}{'\n'}
                          {fator}
                        </Text>
                      </View>
                        
                    </View>
                    <View style={styles.boxReco}>  
                        <Text style={styles.text}>
                          <Icon name='exclamation-triangle' size={30} color="#c0272c"></Icon>{'\n'}{'\n'}
                            Recomenda-se a reposição do filtro solar a cada 2 horas e evitar o sol das 10 horas as 16 horas
                        </Text>
                    </View>   
                    <TouchableHighlight
                      style={styles.submit}
                      onPress={() => navigation.navigate("Home")}
                      underlayColor='#ccc'>
                      <Text style={styles.submitText}>Refazer Teste?</Text>
                  </TouchableHighlight> 
                </View>
                
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
        marginBottom:10,
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
        },
        alignItems:'center'
      },
      cardView:{
        width:'90%',
        padding:10,
        alignItems:'center',
        justifyContent: 'center',
        alignContent:'center',
        flexDirection: 'row',
        marginRight:10,
        marginLeft:10,
    },
      cardText:{
        marginTop:20,
        marginBottom:20,
        alignContent:'center',
        textAlign: 'center',
        justifyContent: "center",
        fontSize:18,
        padding:10,
        fontWeight:'bold',
      },
      image:{
        width:200,
        height:200,
        borderRadius:100,
        alignContent:'center',
        justifyContent: "center",
      },
      text:{
        alignContent:'center',
        textAlign: 'center',
        fontSize:18,
        padding:10,
        color:'#000'
      },
      boxClock:{
        width:'52%',
        height:250,
        textAlign: "center",
        borderColor:'#c0272c',
        borderWidth:1,
        padding:10,
        alignItems:'center',
        justifyContent: 'center',
        alignContent:'center',
        borderRadius:5,
        margin:10,
      },
      boxFator:{
        width:'52%',
        height:250,
        textAlign: "center",
        borderColor:'#c0272c',
        borderWidth:1,
        padding:10,
        alignItems:'center',
        justifyContent: 'center',
        alignContent:'center',
        borderRadius:5,
        margin:10,
      },
      boxPele:{
        width:'95%',
        height:100,
        textAlign: "center",
        borderColor:'#c0272c',
        borderWidth:1,
        padding:10,
        alignItems:'center',
        justifyContent: 'center',
        alignContent:'center',
        borderRadius:5,
        margin:10,
      },
      boxReco:{
        width:'95%',
        textAlign: "center",
        borderColor:'#c0272c',
        borderWidth:1,
        padding:10,
        alignItems:'center',
        justifyContent: 'center',
        alignContent:'center',
        borderRadius:5,
        margin:10,
      },
      menu:{
        position:'absolute',
        left:15,
        top:15,
        zIndex:1
      },
      submit:{
        width:300,
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
  });