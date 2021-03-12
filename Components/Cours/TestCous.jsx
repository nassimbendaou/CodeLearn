import React, { Component } from 'react'
import { StyleSheet,Text, View,TouchableOpacity,Image,Animated ,ScrollView  } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import TestLogicController from "../Controller/TestLogiqueController"
import AwesomeButton from "react-native-really-awesome-button/src/themes/blue";
import GradientButton from 'react-native-gradient-buttons';
import { CheckBox } from 'react-native-elements'
import Fire from '../Dao/Fire';
import UserController from '../Controller/UserController';
import CheckboxGroup from 'react-native-checkbox-group'
import { Root, Popup } from 'popup-ui'
import WebView from 'react-native-webview';

var flag=0;
export default class TestPage extends React.Component  {

    contDownref = React.createRef();
 
  
  state={
    list:[],
    answers:[],
    question:[],
    cours:[],
    show:0,
    item:0,
    num:0,
    myanswer:""
  }
 
  
   componentDidMount() {
     console.log(this.props)
     this.state.cours=this.props.route.params.data.lesson
     this.state.question=this.props.route.params.data.questions
     this.state.num=this.state.cours.length
     console.log(this.props.route.params.data.questions[this.state.item].quest)
     flag=this.props.route.params.flag;
     this.setState({answer:this.props.route.params.data.questions[this.state.item].answer})
   



  }
  handelOptients=(k)=>{
    var i=0;
    var optiont=[]

    this.props.route.params.data.questions[k].optiens.forEach(element => {
      optiont.push({ label: element,
      value: i})
      i=i+1;
  });
 
 return optiont;
  }
  hanndelItem=()=>{
    
    var i=this.state.cours.length;
    if(this.state.item===i-1){
      var level=null;
      Fire.shared.user.cours.forEach(element => {
        if(element.name===this.props.route.params.name){
          element.level=this.props.route.params.level+1;
          level= element.level;
        }
    })
    Fire.shared.UpdateCours( Fire.shared.user.cours);
    this.props.navigation.navigate("lessons",{name:this.props.route.params.name,level:level,pic:""})
    }else{
      this.setState({answer:this.props.route.params.data.questions[this.state.item+1].answer})
      this.setState({item:this.state.item+1},()=>{console.log(this.state.item)})
      
    }
  }

 handelOutPut=()=>{
  if(this.props.route.params.flag===0){ return (
    <ScrollView  > 
      <Text style={styles.itemtitle}>{this.props.route.params.data.lesson[this.state.item].Title}</Text>
        <ScrollView style={styles.itemContainer} >
      
        <Text style={styles.itemName}>{this.props.route.params.data.lesson[this.state.item].body}</Text>
        <Video source={{uri: "https://www.youtube.com/watch?v=qoSksQ4s_hg&list=PL4cUxeGkcC9i9Ae2D9Ee1RvylH38dKuET"}}   // Can be a URL or a local file.
       ref={(ref) => {
         this.player = ref
       }}                                      // Store reference
                   // Callback when video cannot be loaded
       style={styles.backgroundVideo} />
      <Image source={{uri:this.props.route.params.data.lesson[this.state.item].picture}} borderRadius={10}  ></Image>
                   
        </ScrollView>
        <AwesomeButton
     progress
     
     type="secondary"
     width={ 100}
     textSize={17}
            onPress={()=>{
              flag=1
             }}
         style={{alignSelf:"center",borderRadius:20,marginBottom:30}}
          >
            Next 
          </AwesomeButton>
        
    </ScrollView >
  )}
 if(this.props.route.params.flag===1){ return (
    <ScrollView  > 
      
        <View style={styles.itemContainer} >
      
 <Text style={styles.itemName}>{this.props.route.params.data.questions[this.state.item].quest}</Text>
      
        {this.handelOptients(this.state.item).map(e=>{
          
<CheckBox
  title={e.label}
  checked={console.log(selected)}
/>
        })}
        
                   
        </View>
        <AwesomeButton
     progress
     
     type="secondary"
     width={ 100}
     textSize={17}
            onPress={()=>{
              this.hanndelItem();
              this.props.route.params.flag=0;}}
             
         style={{alignSelf:"center",borderRadius:20,marginBottom:30}}
          >
            Next 
          </AwesomeButton>
        
    </ScrollView >
  )
} 
 }


  render() {

    if(this.props.route.params.flag===0){ return (
      <ScrollView  > 
        <Text style={styles.itemtitle}>{this.props.route.params.data.lesson[this.state.item].Title}</Text>
          <View style={styles.itemContainer} >
          <Text style={styles.itemName}>{this.props.route.params.data.lesson[this.state.item].body}</Text>
         <View style={styles.imageView} >
         <Image source={{uri:this.props.route.params.data.lesson[this.state.item].picture}} resizeMode="contain" style={styles.image} ></Image>
         </View>
        
      
     
        
        

                     
          </View>
          <GradientButton
      style={{alignSelf:"center",marginBottom:30, marginVertical: 8 }}
      text="Next "
      textStyle={{ fontSize: 20 }}
      gradientBegin="#1078FC"
      gradientEnd="#1078FC"
      gradientDirection="diagonal"
      height={50}
      width={200}
      radius={15}
      impact
      impactStyle='Light'
      onPressAction={()=>{
        this.props.route.params.flag=1
    
        this.forceUpdate()
       }}
    />
        
          
      </ScrollView >
    )}
   if(this.props.route.params.flag===1){ return (
    <Root>
      <ScrollView  > 
        
          <View style={styles.itemContainer} >
        
          <Text style={styles.itemQuest}>{this.props.route.params.data.questions[this.state.item].quest}</Text>
          
          <CheckboxGroup
              callback={(selected) => { console.log(selected)
              this.setState({myanswer:selected[0]}) }}
              iconColor={"#6D6D6D"}
              iconSize={35}
              rowStyle={{marginLeft:10}}
              checkedIcon="ios-checkbox-outline"
              uncheckedIcon="ios-square-outline"
              checkboxes={this.handelOptients(this.state.item)
              }
              labelStyle={{
                color: '#333',
                fontSize:18,marginBottom:12,
                marginLeft:10,
                alignSelf:"center",
                marginTop:4
              }}
              rowStyle={{
                flexDirection: 'row',
                marginVertical:10,
                marginHorizontal:5
              }}
              rowDirection={"column"}
            />
                     
          </View>
          <GradientButton
      style={{alignSelf:"center",marginBottom:30, marginVertical: 8 }}
      text="Next "
      textStyle={{ fontSize: 20 }}
      gradientBegin="#1078FC"
      gradientEnd="#1078FC"
      gradientDirection="diagonal"
      height={50}
      width={200}
      radius={15}
      impact
      impactStyle='Light'
      onPressAction={()=>{
        console.log(this.state.answer,this.state.myanswer)
        if(this.state.myanswer===this.state.answer){
          Popup.show({
            type: 'Success',
            title: 'Correct',
            button: false,
            textBody: 'Congrats!',
            buttontext: 'Ok',
            
            callback: () => {Popup.hide();
              this.hanndelItem();
              this.props.route.params.flag=0;}
          })
        }
        else{
          this.forceUpdate();
          Popup.show({
            type: 'Danger',
            title: 'Wrong',
            button: true,
            textBody: 'Re-Try !',
            buttontext: 'Ok',
            callback: () => {
              Popup.hide();
              this.forceUpdate()    
              }
          })
         
        }
       }}
    />
       
          
      </ScrollView >
      </Root>
    )
  } 
  }
}
const styles = StyleSheet.create({
    gridView: {
      marginTop: 100,
      
      flex: 1,
      marginBottom:300,
      
      alignSelf:"center"
    },
    imageopt:{
      borderRadius:5,
        
      width:100,
      height:100,
      alignSelf: "center",
      
    },
    itemContainer: {
      justifyContent: 'center',
      backgroundColor:"#fff",
      shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.15,
shadowRadius: 16.00,
padding:5,
elevation: 24,
      borderRadius: 20,
    
    
      marginTop:40,
      marginBottom:20,
      marginLeft:20,
      marginRight:10
    },
    image:{
        borderRadius:15,
        width:350,
        alignSelf:"center",
        height:200,
        
        marginBottom:20,
        marginTop:10
        
        
        

    },
    imageView:{
      borderRadius:15,
     
      alignSelf:"center",
  
      
      marginBottom:50,
      marginTop:30
      
      
      

  },
    itemtitle: {
        fontSize: 22,
        color: '#1078FC',
        fontWeight: "bold",
        alignSelf: "center",
        textShadowColor:  "#000",
        marginTop:25,
        marginBottom:15
      
       
        
          
      },
      itemQuest: {
        fontSize: 22,
        color: '#1078FC',
        fontWeight: '600',
        marginLeft:15,
        textShadowColor:  "#000",
        marginTop:5,
        marginBottom:70
      
       
        
          
      },
    itemName: {
      fontSize: 14,
      color: '#6D6D6D',
      fontWeight: '600',
      marginLeft:15,
      textShadowColor:  "#000",
      marginTop:5,
      marginBottom:10
    
     
      
        
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 8,
      color: '#fff',
    },
    itemContainerop: {
      justifyContent: 'center',
      backgroundColor:"#fff",
      shadowColor: "#000",
    shadowOffset: {
      	width: 0,
	      height: 7,
            },
      shadowOpacity: 0.58,
      shadowRadius: 3.00,
      elevation: 24,
      borderRadius: 3, 
      height: 80,
      width:80,
     
      marginBottom:10,
      marginLeft:5,
      marginRight:5
    },
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    imageop:{
       
        width:65,
        alignSelf:"center",
        
        marginBottom:20,
        marginTop:20
        
        
        

    },
  });
  /***/