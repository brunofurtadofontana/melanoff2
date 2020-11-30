import React,{useState, useEffect, Component} from 'react';
import {View,Text, StyleSheet, Alert, PermissionsAndroid, Image} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import getCurrentWeather from './ConsumirApi';
//import GetDataApi from '../Weather/ConsumirApi'
//Icon.loadFont();
import GetUvi from './GetUvi';



const Temp = ()=> {
    
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [userPosition, setUserPosition] = useState(false);
    const [currentTemperature, setCurrentTemperature] = useState('30');
    const [locationName, setLocationName] = useState('Br, Santa Catarina');
    const [locationCoords, setLocationCoords] = useState('0');
    const [wind, setWind] = useState('7')
    const [iconW, setIcon] = useState('0')
    const [humidity, setHumidity] = useState('68')

    async function verifyLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('permissão concedida');
            setHasLocationPermission(true);
          } else {
            console.error('permissão negada');
            setHasLocationPermission(false);
          }
        }catch (err) {
          console.log(err);
        }
      }
    async function getLocation(){
        try{
            await verifyLocationPermission();
            if (hasLocationPermission) {
                await Geolocation.getCurrentPosition(
                    position => {
                        setUserPosition({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                        error => {
                            console.log(error.code, error.message);
                        }
                );
                setLocationCoords(userPosition)
                
            }
        }catch(err){
            console.log(err)
        }   
    }
    async function setCurrentWeather(){
        try{
            await getLocation()
           
            const data = await getCurrentWeather(locationCoords)
            setCurrentTemperature(convertKelvinToC([data[0]]))
            setLocationName(data[3])
            setWind(convertMsToKm(data[4]))
            setHumidity(data[5])
            // setClouds(data[6])
            setIcon(data[6])
            //console.log(iconW[0].icon)
            // console.log(`http://openweathermap.org/img/wn/${iconW[0].icon}@2x.png`)
            console.log(data)
            
        }catch(err){
            console.log(err)
        }
    }
    function convertKelvinToC(kelvin){
        return parseInt(kelvin - 273)
    }
    function convertMsToKm(metro){
        return parseInt(metro*3.6)
    }
    useEffect(() => {
       setCurrentWeather()
      
    }, []);




  
    
    return(
        <View style={styles.container}>
            <Icon name='refresh' size={20} style={{marginTop:10}} onPress={()=>setCurrentWeather()} color="#fff"></Icon> 
            <View style={styles.temperatura}>
                <Text style={styles.temperaturaText}>{currentTemperature}</Text>
                <Text style={[styles.temperaturaText, {fontSize:12}]} >°C</Text>
            </View>
            <Text style={styles.locationText} >{locationName}</Text>
            <Icon name='keyboard-arrow-down' size={30} style={{marginTop:10}} color="#fff" ></Icon> 
            <View style={styles.cardView}>
            <View style={styles.card} >
                <Image source={{uri:`http://openweathermap.org/img/wn/${iconW[0].icon}@2x.png`}}  
                        style={{width:50,height:50}}
                    
                />
                <Text style={styles.cardText}>
                    Tempo Hoje 
                </Text>
                <Text styles={styles.cardText} style={{fontSize:10,color:"#fff",fontWeight:'bold',textTransform:'uppercase'}}>
                    {iconW[0].description}
                </Text>
            </View>
            <View style={styles.card}>
        
            <Image source={require('../Home/wind2.png')} style={{width:40,height:40}}/>
                
                <Text style={styles.cardText}>
                    Vento
                </Text>
                <Text style={styles.cardText}>
                    {wind}Km/h
                </Text>
            </View>
            <View style={styles.card}>
            <Icon name='invert-colors' size={30}  color="#fff"></Icon> 
                <Text style={styles.cardText}>
                    Humidade
                </Text>
                <Text style={styles.cardText}>
                {humidity}%
                </Text>
            </View>
            </View>
            <View style={styles.info}>
                <Text style={styles.infoText} >
                    {/* Latitude: {userPosition.latitude} {'\n'}
                    Longitude: {userPosition.longitude} {'\n'} */}
                </Text>
                <GetUvi />
            </View>
        </View>
    );
}
export default Temp

const styles = StyleSheet.create({
    container:{
        //backgroundColor:'#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent:'center',
        color:'#fff',
    },
    temperatura:{
        alignItems: 'center',
        flexDirection: 'row',
    },
    temperaturaText:{
        fontSize:50,
        color:'#fff',
    },
    locationText:{
        fontSize:10,
        color:'#e0e0e0',
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
    card:{
        width:'33%',
        height:150,
        borderColor:'#fff',
        borderWidth:1,
        padding:10,
        alignItems:'center',
        justifyContent: 'center',
        alignContent:'center',
        borderRadius:5,
        margin:10,
    },
    cardText:{
        color:'#fff',
        alignContent:'center',
        alignItems:'center',
        justifyContent: 'center',
    },
    info:{
        width:'90%',
        height:150,
        borderColor:'#fff',
        borderWidth:1,
        padding:10,
        alignItems:'center',
        justifyContent: 'center',
        alignContent:'center',
        borderRadius:5,
        margin:10,
    },
    infoText:{
        fontSize:16,
        fontWeight:'bold',
        color:'#fff',
    }
});