import React from 'react'
import {  SafeAreaView, View, FlatList,Dimensions, StyleSheet, Text,Modal,TouchableHighlight,TouchableOpacity,Image,TextInput } from 'react-native';
import { Icon } from "react-native-elements";
import * as RootNavigation from "./Utils/RootNavigation";
const screenWidth = Math.round(Dimensions.get("window").width);
export default class Comment extends React.Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
        <View style={styles.item} >
      
       <View >
       
       <Text style={{marginTop:10,
      marginLeft:20,
      fontSize:16,
      fontWeight:"600", }}>{this.props.text}</Text>
       
      </View>
      <View style={{ borderRadius:10,
      marginTop:5,
      flexDirection:"row",alignSelf:"flex-end"}} >
       
      <View>
       <Text style={{marginTop:2,
      marginLeft:8,
      fontSize:14,
      fontWeight:"300",
      textDecorationLine:"underline",
      textAlign:"right"
      }}>{this.props.username}</Text>
        <View style={{flexDirection:"row",marginTop:2,
      marginLeft:8,}}>
        <Icon name="calendar"
                type='font-awesome'
                size={10}
                style={{marginTop:2,marginRight:3}}
                color="#6D6D6D"></Icon>
           <Text style={{
      fontSize:10,
      fontWeight:"200", textAlign:"right"}}>{new Date(this.props.date).toUTCString()}</Text>
      </View>
      </View>
      <Image source={{uri:this.props.imguser}} style={{  width: 40,
      height: 40,
      marginRight:20,
      marginLeft:5,
      marginBottom:5,
      borderRadius: 63,
      borderWidth: 2,
      borderColor: "#ddd"}} />
       </View>
      
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#ddd"
      
    },
    pickimage: {
      width: 60,
      height: 60,
      marginLeft:30,
      marginBottom:5,
      borderRadius: 63,
      borderWidth: 2,
      borderColor: "#7B7881",
  
    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
    item: {
      backgroundColor: '#FFF',
      marginVertical: 2, 
      shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 2,
  },
  borderRadius:15,
  shadowOpacity:1,
  marginBottom:10,
  
  
  elevation: 24,
        
    },
    title: {
      fontSize: 32,
    },
    modalView: {
      
      backgroundColor: "white",
      borderRadius: 20,
      
    
    },
    user:{
  
      backgroundColor: "white",
     borderRadius:10,
      marginTop:30,
      flexDirection:"row",
     
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginTop:20,
      marginLeft:15,
      fontSize:16,
      fontWeight:"800",
      
    }
  });