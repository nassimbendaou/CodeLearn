import React from 'react'
import {  SafeAreaView, View, FlatList,Dimensions, StyleSheet, Text,Modal,TouchableHighlight,TouchableOpacity,Image,TextInput } from 'react-native';
import { Icon } from "react-native-elements";
import { Divider } from 'react-native-elements';
import * as RootNavigation from "./Utils/RootNavigation";
import FirePosts from "./Dao/FirePosts"
import Fire from "./Dao/Fire"
const screenWidth = Math.round(Dimensions.get("window").width);
export default class componentName extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount=()=>{
      console.log(this.props)
    }
    state={
      show:false,
      text:''
    }
    renderShow=()=>{
      if(this.state.show){
      return(<View style={{backgroundColor:"#ddd",paddingTop:30,paddingBottom:30}}>
      <View style={{flexDirection:"row",backgroundColor:"#fff",borderRadius:15,marginLeft:5,marginRight:5}}>
     <TextInput style={styles.info}
     multiline = {true}
     numberOfLines = {4}
    placeholder="Write something ..." onChangeText={(text)=>{this.setState({text:text})}} />  
     <TouchableOpacity style={{backgroundColor:"#1078FC",width:40,height:41,borderBottomRightRadius:15,borderTopRightRadius:15,alignSelf:"center"}} 
      onPress={()=>{FirePosts.shared.sendComment(this.state.text,this.props.id);
      this.setState({show:!this.state.show})      
      }}
    
     >
         <Icon name="paper-plane"
      type='font-awesome'
      size={20}
      style={{marginTop:10}}
      color="#fff"></Icon></TouchableOpacity>
    
      </View>
      </View>)} else {
            return null;
        }
    }
    renderItem=()=>{
      if(!this.props.post){
       console.log(this.props.post)
      return (
         <View style={{flexDirection:"column"}}>
       <TouchableOpacity
       style=
       {{backgroundColor:"#1078FC",
       height:40,
       width:200,
       alignSelf:"center",
       alignItems:"center",justifyContent:"center",borderRadius:5}} onPress={()=>{RootNavigation.navigate("Quiz",{data:this.props.data})}}>
         <Text 
       style={{       
        fontSize:14,
       fontWeight:"600",color:"#fff",alignSelf:"center"}}>Start {this.props.title}</Text>
        </TouchableOpacity>
        </View>)
      }
      else{
       return null
      }
    }
    handelname=()=>{
      if(this.props.post){
       return this.props.fname+" "+this.props.lname
      }else{
        return this.props.username
      }
    }
    handeltext=()=>{
      if(this.props.post){
       return this.props.text
      }else{
        return this.props.username+" Posted a "+this.props.obj+" Quiz: "+this.props.title
      }
    }
    
  render() {
    return (
        <TouchableOpacity style={styles.item}>
        <TouchableOpacity style={{ borderRadius:10,
      marginTop:10,
      flexDirection:"row",}}  onPress={()=>{
        if(typeof this.props.uid !== 'undefined'){if(Fire.shared.uid===this.props.uid)
      {RootNavigation.navigate("Profile")}
      else{RootNavigation.navigate("userprofile",{uid:this.props.uid})}}
        }}>
        <Image source={{uri:this.props.imguser}} style={{  width: 40,
      height: 40,
      marginLeft:30,
      marginBottom:5,
      borderRadius: 63,
      borderWidth: 2,
      borderColor: "#ddd"
      }} />
      <View>
       <Text style={{marginTop:2,
      marginLeft:8,
      fontSize:16,
      fontWeight:"500",
 
      }}>{this.handelname()}</Text>
    
        <View style={{flexDirection:"row",marginTop:2,
      marginLeft:8,}}>
        <Icon
               name="calendar"
                type='font-awesome'
                size={10}
                style={{marginTop:2,marginRight:3}}
                color="#6D6D6D"></Icon>
           <Text style={{
      fontSize:10,
      fontWeight:"200",
      
           }}>{this.props.date}</Text>
      </View>
        
               
      <Divider style={{ backgroundColor: '#ddd' }} />
                </View>
       </TouchableOpacity>
       <TouchableOpacity  onPress={()=>{RootNavigation.navigate("comment",{data:this.props})}}>
    
       <Text style={{marginTop:10,
      marginLeft:10,
      fontSize:14,
      fontWeight:"600",
      marginBottom:10
      
      
       }}>{this.handeltext()}</Text>
       {this.props.image &&
        <Image source={{uri:this.props.image}}  resizeMode="contain" style={{  width: screenWidth,
      height: 150,
      marginTop:10,
      marginBottom:5,
      alignSelf:"center"
      }} />}
      {this.renderItem()}
       </TouchableOpacity>
       <Divider style={{ backgroundColor: '#ddd',marginTop:10,height:2,marginBottom:5,width:screenWidth-20,alignSelf:"center" }} />
       <TouchableOpacity style={{alignContent:"center",padding:5}} onPress={()=>{this.setState({show:!this.state.show})}}>
       <Icon
               name="sms"
               
                size={25}
                style={{marginBottom:10,alignSelf:"center"}}
                color="#ddd"></Icon>
       </TouchableOpacity>
       {this.renderShow()}
      </TouchableOpacity>
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
      marginBottom:10,
  shadowOffset: {
      width: 0,
      height: 2,
  },
  
  
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
    info: {
      fontSize: 16, 
      borderRadius:15,
      padding:10,
      width:screenWidth-50,
     backgroundColor:"#fff"
      
      
    },
    modalText: {
      marginTop:20,
      marginLeft:15,
      fontSize:16,
      fontWeight:"800",
      
    }
  });