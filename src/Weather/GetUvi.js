import React,{useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native'

import axios from 'axios';

export default function GetUvi(){

    const lat = -27.0990497;
    const log = -52.6452722;
    const [results,setResults] = useState(null);
    const [loading,setLoading] = useState(false);
    const [uvi,setUvi] = useState(0);
    const [dica,setDica] = useState('');
    
async function getapiData(){
    try{
    setLoading(true);

    await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${log}&exclude=daily,hourly,minutely&appid=6e2f966857d6fcace1d7be48ede3d56d&lang=pt_br`) 
    .then((response)=>{
        const data = response.data
        const uvi = data.current.uvi
        setUvi(uvi)
        //console.log(uvi)
    })
    if(uvi <= 2){
       setResults('Indice UV BAIXO')
       setDica('Recomenda-se o uso de proteção solar somente se você tiver a pele muito clara.')
    }
    if(uvi > 2 && uvi <=5 ){
        setResults('Indice UV MODERADO')
        setDica('Aplique protetor solar FPS 30 a cada 2 horas, mesmo em dias nublados, e depois de nadar ou suar.')
    }
    if(uvi > 5 && uvi <=7){
        setResults('Indice UV ALTO')
        setDica('Aplique protetor solar FPS 30+ a cada 2 horas - Reduza o tempo de exposição ao sol entre as 10:00h. e 16:00h.')
    }
    if(uvi > 7 && uvi <= 10){
        setResults('Indice UV MUITO ALTO')
        setDica('Aplique protetor solar FPS 50 a cada 2 horas - Tomar precauções extra, porque a pele desprotegida e os olhos vão se danificar e podem queimar-se rapidamente.')
    }
    if(uvi > 10){
        setResults('Indice UV EXTREMO')
        setDica('Aplique protetor solar FPS 50+ a cada 2 horas - Evitar sol entre as 10:00h e 16:00h ')
    }
    }catch(err){
        console.log(err)
    }
}
useEffect(() => {
    getapiData();
});
   
    return(
        <View style={styles.container}>
        {
              <View style={styles.container}>
                <Image source={require('./uvi.png')} style={{width:40,height:40}}/> 
                <Text style={styles.cardTitle}>
                    {results}: {uvi}
                </Text>
                <Text style={styles.cardText}>
                    OBS: {dica}
                </Text>
              </View>
            
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        //backgroundColor:'#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent:'center',
        color:'#fff',
    },
    cardTitle:{
        color:'#fff',
        alignContent:'center',
        alignItems:'center',
        justifyContent: 'center',
        fontSize:16,
        fontWeight:'bold'
    },
    cardText:{
        color:'yellow',
        alignContent:'center',
        alignItems:'center',
        justifyContent: 'center',
        textAlign:'center'

    },

});
