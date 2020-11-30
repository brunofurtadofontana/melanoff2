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
  Alert
} from 'react-native';

const axios = require('axios')

const camaraScreen = ({navigation}) =>{
 let cameraRef = useRef(null);
 const [camType,setCam] = useState(RNCamera.Constants.Type.back);
 const [imagem,setImagem] = useState(null); 

 const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5 };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);// data.uriTrocar para data para ver o que sai no console
      setImagem(data.uri)
      //submitPicture(data.uri)
    }
  }
  const flipCamera = () =>{
    if(camType === RNCamera.Constants.Type.back){
      setCam(RNCamera.Constants.Type.front)
    }else{
      setCam(RNCamera.Constants.Type.back)
    }
  }
  const submitPicture = async () => {
    try {
      let uploadData = new FormData();
     // uploadData.append('submit','ok');
     //const cleanURL = imagem.uri.replace("file:///", "");
      uploadData.append('file',{
        type:'image/jpg', 
        uri:imagem, 
        name:'uploadimagetmp.jpg'
      });
      console.log(uploadData.type)
      await axios.post('https://off-roadspeed.com/react/index.php', uploadData).then(res => {
        console.log(res.uploadData);
        console.log(res.status);
    })
      //this.setState({isUploading:true})
      // let base_url = 'https://off-roadspeed.com/react/index.php';
      // let uploadData = new FormData();
      // uploadData.append('submit','ok');
      // uploadData.append('file',{type:'image/jpg', uri:imagem, name:'uploadimagetmp.jpg'})
      // console.log(uploadData)
      // await fetch(base_url,{
      //   heaaders:{
      //     'Accept': 'application/json',
      //     'Contente-Type': 'multipart/form-data'
      //   },
      //   method: 'post',
      //   body: uploadData
      // }).then(response=> response.json()).then(response=> alert(response));

     
      // var data = new FormData();

      // data.append('file', { uri: data.uri, name: 'picture.jpg', type: 'image/jpg' });
      // // Create the config object for the POST
      //     const config = {
      //         method: 'POST',
      //         body: data
      //     };
      //     fetch('https://webhook.site/cc3db7c5-cbb7-42ad-a947-baa39e501701', config).then(responseData => {
      //         // Log the response form the server // Here we get what we sent to Postman s
      //         console.log(responseData);
      //     })
      // await fetch('https://webhook.site/cc3db7c5-cbb7-42ad-a947-baa39e501701', {
      //     method: 'post',
      //     mode: 'no-cors',
      //     headers:{
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       pages: '5',
      //       image: imagem
      //     })
      // });

    } catch (err) {
      console.warn(err);
    }

    setImagem(null);
  }
    return (
      imagem ?
      <ImageBackground style={{flex:1}} source={{ uri: imagem }}>
          <ScrollView></ScrollView>
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => setImagem(null)} style={styles.capture}>
                  <IconPic name="times" size={25} color="#000"  />
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => submitPicture()} style={styles.capture}>
                  <IconPic name="check" size={25} color="#000" />
              </TouchableOpacity>
          </View>
          
      </ImageBackground>
      :
      <View style={styles.container}>
      <View style={styles.menu}>
        <IconPic
          name="bars"
          size={32}
          color="white"
          onPress={() => {navigation.openDrawer()}}
        />
      </View> 
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          type={camType}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={()=>takePicture()} style={styles.capture}>
            <Icon name='camera-alt' size={30} ></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>flipCamera()} style={styles.capture}>
          <Icon name='settings-backup-restore' size={30} ></Icon>
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
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
  }
});

const App = () =>{
  return (
    <Text>Helloo</Text>
  )
};
 

export default camaraScreen;
