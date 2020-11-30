import React,{useState,useRef} from 'react';
import {View, Text, TextInput, StyleSheet, Alert,TouchableHighlight} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';



var options = [
    {label: 'Opção 1', value:1},
    {label: 'Opção 2', value:2},
    {label: 'Opção 3', value:3},
    {label: 'Opção 4', value:4},
    {label: 'Opção 5', value:5},
    {label: 'Opção 5', value:6}
];

export default function Question({navigation}){
    //const [checked, setChecked] = React.useState('first');
    const [classe, setClasse] = useState();
    const [opc1, setOpc1] = useState(0);
    const [opc2, setOpc2] = useState(0);
    const [opc3, setOpc3] = useState(0);
    const [opc4, setOpc4] = useState(0);
    const [opc5, setOpc5] = useState(0);
    const [opc6, setOpc6] = useState(0);
    const [status, setStatus] = React.useState(false);
    //console.log("teste",opc1)
     function onPressButton(opc) {
        const classe = opc
        setClasse(classe)
        console.log(classe)
        setStatus(classe)
        Alert.alert('Você escolheu a opção: '+classe)
        
      }
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
                <Text style={styles.title} >Responda a pergunta</Text>
                <Text style={styles.pergunta} >Quando exposto aos raios solares {'\n'} sem proteção você:</Text>
                
                <ScrollView>
                    <TouchableHighlight style={styles.opc,  status == 1 ? styles.opcDisabled:  styles.opc}
                        value={1}
                        onPress={()=> {setOpc1(1),onPressButton(1)}}
                        underlayColor='#ccc'
                        status={status}
                    >
                            <Text style={styles.opcText}>1. Queima facilmente e nunca bronzeia</Text>
                    </TouchableHighlight>
                    
                    <TouchableHighlight style={styles.opc,  status == 2 ? styles.opcDisabled:  styles.opc}
                        value={2}
                        onPress={()=> {onPressButton(2),setOpc2(1)}}
                        underlayColor='#ccc'
                        status={status}
                    >
                            <Text style={styles.opcText}>2. Queima facilmente, bronzeia muito pouco</Text>
                    </TouchableHighlight>
                
                    <TouchableHighlight style={styles.opc, status == 3 ? styles.opcDisabled:  styles.opc}
                        value={3}
                        onPress={()=> {onPressButton(3),setOpc3(1)}}
                        underlayColor='#ccc'
                    >
                            <Text style={styles.opcText}>3. Queima moderadamente, bronzeia moderadamente</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.opc,  status == 4 ? styles.opcDisabled:  styles.opc}
                        value={4}
                        onPress={()=> {onPressButton(4),setOpc4(1)}}
                        underlayColor='#ccc'
                    >
                            <Text style={styles.opcText}>4. Queima pouco, bronzeia facil</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.opc,  status == 5 ? styles.opcDisabled:  styles.opc}
                        value={5}
                        onPress={()=> {onPressButton(5),setOpc5(1)}}
                        underlayColor='#ccc'
                    >
                            <Text style={styles.opcText}>5. Queima raramente e bronzeia bastante</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.opc,  status == 6 ? styles.opcDisabled:  styles.opc}
                        value={6}
                        onPress={()=> {onPressButton(6),setOpc6(1)}}
                        underlayColor='#ccc'
                        
                    >
                            <Text style={styles.opcText}>6. Nunca queima</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.submit} 
                        onPress={()=> {navigation.navigate('Camera',{opc:classe})}}
                    >
                        <Text style={styles.submitText} >Enviar</Text>
                    </TouchableHighlight>
                </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignContent: "center",
        alignItems:'center',       
    },
    opc:{
        width:'100%',
        height:50,
        marginTop:10,
        marginBottom:10,
        paddingTop:20,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:20,
        backgroundColor:'#c0272c',
        borderRadius:5,
        borderWidth: 1,
        borderColor: '#c0272c',
        justifyContent: "center",
        alignContent: "center",
        alignItems:'center',       
        
      },
      opcDisabled:{
        width:'100%',
        height:50,
        marginTop:10,
        marginBottom:10,
        paddingTop:20,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:20,
        backgroundColor:'#ccc',
        borderRadius:5,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: "center",
        alignContent: "center",
        alignItems:'center',       
      },
    opcText:{
        fontSize: 16,
        color:'#fff',
        textAlign:'center',
    },
    submitText:{
        fontSize: 16,
        color:'#c0272c',
        textAlign:'center'
    },

    title:{
        alignContent:'center',
        textAlign:'center',
        fontWeight: 'bold',
        marginTop:20,
        marginBottom:20,
        fontSize:22,
        color:'#c0272c'
    },
    pergunta:{
        alignContent:'center',
        textAlign:'center',
        marginTop:20,
        marginBottom:20,
        fontSize:16,
        color:'#c0272c'
    },
    submit:{
        width:'100%',
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
        position:'absolute',
        left:15,
        top:15,
        zIndex:1
      }
  });