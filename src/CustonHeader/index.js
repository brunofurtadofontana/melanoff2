import React from "react";
import { View,StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const CustonHeader = ({ navigation }) => (
    <View style={styles.menu}>
      <Icon
        name="bars"
        size={32}
        color="black"
        onPress={() => {navigation.openDrawer()}}
      />
    </View>
  );
  const styles = StyleSheet.create({
    menu:{
      backgroundColor:'#c0272c',
      height:35,
      padding:8
    }
  
  })
  export default CustonHeader