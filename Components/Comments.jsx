import React, { Component } from 'react'
import {Platform, KeyboardAvoidingView, SafeAreaView, View, FlatList,Dimensions, StyleSheet, Text,Modal,TouchableHighlight,TouchableOpacity,Image,TextInput } from 'react-native';
import { Icon } from "react-native-elements";
import * as RootNavigation from "./Utils/RootNavigation";
import Item from "./Item"
import firebase from "firebase"; // 4.8.1
import FirePosts from "./Dao/FirePosts"
import Comment from "./Comment"
const screenWidth = Math.round(Dimensions.get("window").width);

export default class Comments extends Component {
    state={
        comments:[],
        text:""
    }
    componentDidMount() {
        
    firebase.database().ref("CommentList").orderByChild("idpost")
    .equalTo(this.props.route.params.data.id).on("value", (snapshot) => { 
        var listT=[] 
        this.setState({comments:[]})  
         
        snapshot.forEach((childSnapshot)=> {
          var childData = childSnapshot.val();
            listT.push({
                idpost:childData.idpost,
                username: childData.username,
                owner: childData.owner,
                imguser:childData.imguser,
                text:childData.text ,
                date:childData.date}); 
              
          })
          this.setState({comments:listT})
        
        
      })
    }
    renderItem=()=>{
      if(!this.props.route.params.data.post){
       console.log(this.props.route.params.data.post)
      return (
         <View style={{flexDirection:"column"}}>
       <TouchableOpacity
       style=
       {{backgroundColor:"#1078FC",
       height:40,
       width:200,
       alignSelf:"center",
       alignItems:"center",justifyContent:"center",borderRadius:5}} onPress={()=>{RootNavigation.navigate("Quiz",{data:this.props.route.params.data.data})}}>
         <Text 
       style={{       
        fontSize:14,
       fontWeight:"600",color:"#fff",alignSelf:"center",textDecorationLine:"underline"}}>Start {this.props.route.params.data.title}</Text>
        </TouchableOpacity>
        </View>)
      }
      else{
       return null
      }
    }
    handelname=()=>{
      if(this.props.route.params.data.post){
       return this.props.route.params.data.fname+" "+this.props.route.params.data.lname
      }else{
        return this.props.route.params.data.username
      }
    }
    handeltext=()=>{
      if(this.props.route.params.data.post){
       return this.props.route.params.data.title
      }else{
        return this.props.route.params.data.title
      }
    }
  render() {
    return (
      <KeyboardAvoidingView style={{flex:1}}
     
    
      >
        <FlatList
      ListHeaderComponent={
        <View style={styles.item} >
      
       <View >
       <Text style={{marginTop:10,
      marginLeft:10,
      fontSize:20,
      fontWeight:"bold",color:"#1078FC" }}>{this.handeltext()}</Text>
       <Text style={{marginTop:10,
      marginLeft:10,
      fontSize:14,
      fontWeight:"600", }}>{this.props.route.params.data.text}</Text>
       {this.props.route.params.data.image && <Image source={{uri:this.props.route.params.data.image}}  resizeMode="contain" style={{  width: screenWidth,
      height: 150,
      marginTop:10,
      marginBottom:5,
      alignSelf:"center"
      }} ></Image>}  
      {this.renderItem()}
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
      }}>{this.handelname()}</Text>
        <View style={{flexDirection:"row",marginTop:2,
      marginLeft:8,}}>
        <Icon name="calendar"
                type='font-awesome'
                size={10}
                style={{marginTop:2,marginRight:3}}
                color="#6D6D6D"></Icon>
           <Text style={{
      fontSize:10,
      fontWeight:"200", textAlign:"right"}}>{this.props.route.params.data.date}</Text>
      </View>
      </View>
      <Image source={{uri:this.props.route.params.data.imguser}} style={{  width: 40,
      height: 40,
      marginRight:20,
      marginLeft:5,
      marginBottom:5,
      borderRadius: 63,
      borderWidth: 2,
      borderColor: "#ddd"}} />
       </View>
       <View style={{backgroundColor:"#ddd",paddingTop:20,paddingBottom:20,}}>
     <Text style={{
      fontSize:16,
      fontWeight:"400", textAlign:"left",color:"#6D6D6D",marginLeft:40}}>Comments</Text></View>
      </View>}
  
       keyExtractor={item => item.id}
       
        data={this.state.comments}
        renderItem={({ item }) =>  (
          <Comment 
          username={item.username}
          imguser={item.imguser}
          date={item.date}
          text={item.text}     
          />)}/>

<KeyboardAvoidingView style={{paddingTop:20,paddingBottom:20,
           justifyContent: 'flex-end',marginBottom:20

  }}  behavior={Platform.OS == "ios" ? "padding" : "height"}
  keyboardVerticalOffset={80}
  
  >
        <View style={{flexDirection:"row",backgroundColor:"#fff",borderRadius:15,marginLeft:5,marginRight:5}}>
       <TextInput style={styles.info} multiline={true} autoCorrect={false} placeholder="Write something ..." onChangeText={(text)=>{this.setState({text:text})}} />  
       <TouchableOpacity style={{backgroundColor:"#1078FC",width:40,height:41,borderBottomRightRadius:15,borderTopRightRadius:15,alignSelf:"center"}} 
        onPress={()=>{FirePosts.shared.sendComment(this.state.text,this.props.route.params.data.id).then((b)=>{
          this.setState({text:""});
        });
        
        }}
      
       >
           <Icon name="paper-plane"
        type='font-awesome'
        size={20}
        style={{marginTop:10}}
        color="#fff"></Icon></TouchableOpacity>
      
        </View>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
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
    info: {
        fontSize: 16, 
        borderRadius:15,
        padding:10,
        width:screenWidth-50,
       backgroundColor:"#fff"
        
        
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