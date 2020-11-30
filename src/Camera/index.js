import React, {useState,useRef} from 'react';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconPic from "react-native-vector-icons/FontAwesome";
import ImagePicker from 'react-native-image-picker';


import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  PermissionsAndroid,
  CameraRoll,
  ActivityIndicator,
  Alert,
  Image
} from 'react-native';

const axios = require('axios')

const camaraScreen = ({route,navigation}) =>{

  const {opc} = route.params;
  //console.log(opc)
  const [avatar, setAvatar] = useState();
  const imagePickerOptions = {
    title:'Selecione uma imagem',

  }
  function imagePickerCallback(data){
    //console.log(data)
    if(data.didCancel){
      return;
    }
    if(data.error){
      return;
    }
    if(!data.uri){
      return;
    }
    setAvatar(data);
  }
  
  async function uploadImage(){
    const data = new FormData();
    var numero_aleatorio = Math.random();
    numero_aleatorio = Math.floor(numero_aleatorio * 10000);
    //data.append('submit','ok');
    data.append('status',opc);
    //console.log(avatar.path);
    data.append('image',{
      fileName: avatar.fileName,
      uri: avatar.uri,
      type:'image/jpeg',
      name: 'imageTemp.jpg',
    })
    await axios.post('https://apimelafoto.herokuapp.com/books/',data)
    .then(res => {
      console.log(res);
      console.log(res.data)
      const id = res.data.id_book;
      Alert.alert('Imagem enviada com sucesso!')
      navigation.navigate("Result",{id_book:id})
    })
    .catch(error => console.log(error));
     
    }
    return (
      
     <View style={styles.container}>
       <View style={styles.menu}>
        <IconPic
          name="bars"
          size={32}
          color="black"
          onPress={() => {navigation.openDrawer()}}
        />
      </View> 
      <Text style={styles.title}>Escolha ou tire uma foto do rosto</Text>
       <Image 
       source={{
        uri:avatar 
        ? avatar.uri
        : 'https://images.vexels.com/media/users/3/129733/isolated/preview/a558682b158debb6d6f49d07d854f99f-silhueta-de-avatar-masculino-casual-by-vexels.png' 
       }} 
       style={styles.image}
       />
      <TouchableOpacity
        style={styles.button}
        onPress={()=> ImagePicker.showImagePicker(imagePickerOptions, imagePickerCallback)}     >
        <Text style={styles.buttonText}>Escolher Imagem</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={uploadImage}     >
        <Text style={styles.buttonText}>Enviar Imagem</Text>
      </TouchableOpacity>
     </View>
     
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button:{
    width: 150,
    height: 50,
    borderRadius: 3,
    backgroundColor: '#c0272c',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
  },
  buttonText:{
    color: '#fff'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  buttonsPreview: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  menu:{
    position:'absolute',
    left:15,
    top:15,
    zIndex:1
  },
  image:{
    width:200,
    height:200,
    borderRadius:100,
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
});

const App = () =>{
  return (
    <Text>Helloo</Text>
  )
};
 

export default camaraScreen;
