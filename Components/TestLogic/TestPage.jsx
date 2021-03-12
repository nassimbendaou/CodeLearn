import React, { Component } from 'react'
import { StyleSheet,Text, View,TouchableOpacity,Image,Animated ,ScrollView  } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import TestLogicController from "../Controller/TestLogiqueController"
import AwesomeButton from "react-native-really-awesome-button/src/themes/blue";
import Fire from '../Dao/Fire';
import UserController from '../Controller/UserController';
import GradientButton from 'react-native-gradient-buttons';

var rep=[];
var dim=50;

export default class TestPage extends React.Component  {

    contDownref = React.createRef();
 
  
  state={
    list:[],
    answers:[],
    question:{},
    flag:0,
    level:0,
    pic:"",
    score:0,
    item:1
  }
  handelDim=()=>{
    
    return dim;
  }
  handelScore=()=>{
    this.setState({score:this.state.score})};
  handelQuestion=(i)=>{
    if(this.state.item>=10 ){ console.log(this.state.score);
      if(this.state.score>5){
        if(this.state.level===0){
               if(this.props.route.params.name!=="random"){
        Fire.shared.user.logiquelevel.forEach(element => {
            if(element.name===this.props.route.params.name){
                    element.levels.forEach(level=>{if(level.num===this.props.route.params.level+1){
                      level.disabled=true;
                     
                    }})
            }
        });}
        UserController.shared.UpdateTestLevel(Fire.shared.user.logiquelevel)
        this.setState({level:1});
        console.log(Fire.shared.user)}
      }
     this.props.navigation.navigate("TestResult",{score:this.state.score});
     
     

    }else{ 
      this.state.question=this.state.list[i];
        console.log(this.state.list[i])
      if(this.state.question.name==="matrice"){
        
        dim=45;
      
      }
      else{
       
        dim=65;
      }
    
      console.log(this.state.score)
      return this.state.question;
    }
   
  }
   UNSAFE_componentWillMount() {
     this.myscore=0;
     
     console.log(this.props)
    switch(this.props.route.params.name){
      case "matrice":
        this.state.list=TestLogicController.shared.getTestByname("matrice",this.props.route.params.level).slice(0);
        //console.log("data",this.state.list);
        break;
      case "pilage":
        this.state.list=TestLogicController.shared.getTestByname("pilage",this.props.route.params.level).slice(0);
        break;
      case "random":
        this.state.list=TestLogicController.shared.getRandomTest().slice(0);
        console.log("logic",this.state.list)
        break;   
  }
  console.log('step1')
  //this.state.list=TestLogicController.shared.getRandomTest().slice(0);
    //this.state.list=TestLogicController.shared.getRandomTest().slice(0);
    //this.setState({list:TestLogicController.shared.getRandomTest().slice(0)})
    // this.test=TestLogicController.shared.getRandomTest();
     //console.log("logic",this.state.list)
     
    this.handelQuestion(0);
  }
  handelFlag=()=>{
    return this.state.flag;
  }

  render() {
   // const { params } = this.props.navigation.state;
    
    //const pic = 'https://i.ibb.co/PM7sq5J/random.png';
   // var data={name:"Test Contains 10 Problems.\n \nfor every problem you have 2 min. \n",code:pic};
    return (
      <ScrollView  > 
       
          <View style={styles.itemContainer} >
        <View style={{alignSelf:"flex-end",marginTop:10,marginRight:10}}>
          <CountdownCircleTimer
            
             isPlaying
             size={55}
              key={this.handelFlag()}
             
             onComplete={()=>{
              this.setState({item:this.state.item+1});
              this.handelQuestion(this.state.item);
               return [true,"1000"] }}
             duration={30}
             colors={[['#1078FC', 0.33], ['#8788f8', 0.33], ['#A30000']]} >
                 {({ remainingTime, animatedColor }) => (
               <Animated.Text style={{ color: animatedColor ,fontSize:16,alignSelf:"center"}}>
               {remainingTime}
              
              </Animated.Text>
    )}

  </CountdownCircleTimer></View>  
          <Text style={styles.itemName}>{this.state.question.quest}</Text>
          
              <Image source={{uri:this.state.question.picture}} style={styles.image} ></Image>
                     
          </View>
          <View style={{flexDirection:"row",alignSelf:"center"}}>
          <TouchableOpacity style={styles.itemContainerop} 
          onPress={()=>{
            this.setState({flag:new Date().getTime()});
            this.setState({item:this.state.item+1});
            if(this.state.question.answer===this.state.question.optiens[0]){
              this.state.score==this.state.score++;  
              }
             this.handelQuestion(this.state.item);
             rep.push(this.state.question.optiens[0]); }} > 
          <Image source={{uri:this.state.question.optiens[0]}} resizeMode="contain" style={{height:this.handelDim(), width:80,
                                                                                                      alignSelf:"center",
                                                                                                      marginBottom:20,
                                                                                                      marginTop:20}}  />            
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainerop} onPress={()=>{
            this.setState({flag:new Date().getTime()});
            this.setState({item:this.state.item+1});
            if(this.state.question.answer===this.state.question.optiens[1]){
              this.state.score==this.state.score++;  
              }
             this.handelQuestion(this.state.item);
             rep.push(this.state.question.optiens[1]); }}  > 
          <Image source={{uri:this.state.question.optiens[1]}} resizeMode="contain" style={{height:this.handelDim(), width:80,
                                                                                                      alignSelf:"center",
                                                                                                      marginBottom:20,
                                                                                                      marginTop:20}}  />            
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainerop} onPress={()=>{this.setState({flag:new Date().getTime()});
                                                                        if(this.state.question.answer===this.state.question.optiens[2]){
                                                                          this.state.score==this.state.score++;    
                                                                          
                                                                        }
                                                                       this.setState({item:this.state.item+1});
                                                                      this.handelQuestion(this.state.item);
                                                                      rep.push(this.state.question.optiens[2]);
                                                                                                              }} > 
          <Image source={{uri:this.state.question.optiens[2]}} resizeMode="contain" style={{height:this.handelDim(), width:80,
                                                                                                      alignSelf:"center",
                                                                                                      marginBottom:20,
                                                                                                      marginTop:20}}  />            
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainerop} onPress={()=>{this.setState({flag:new Date().getTime()});
                                                                         if(this.state.question.answer===this.state.question.optiens[3]){
                                                                          this.state.score==this.state.score++;      
                                                                       
                                                                        }
                                                                       this.setState({item:this.state.item+1});
                                                                      this.handelQuestion(this.state.item);

                                                                      rep.push(this.state.question.optiens[3]);
                                                                                                              }} > 
          <Image source={{uri:this.state.question.optiens[3]}} resizeMode="contain" style={{height:this.handelDim(), width:80,
                                                                                                      alignSelf:"center",
                                                                                                      marginBottom:20,
                                                                                                      marginTop:20}} />            
          </TouchableOpacity>
          
         
          </View>
          <GradientButton
      style={{alignSelf:"center",marginBottom:30, marginVertical: 8 ,marginTop:30}}
      text=" Quit  "
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
        this.props.navigation.navigate("puzzle-piece");}}
  
    />
      
          
      </ScrollView >
    )
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
shadowOpacity: 0.2,
shadowRadius: 16.00,

elevation: 24,
      borderRadius: 20,
    
      
      marginTop:40,
      marginBottom:20,
      marginLeft:30,
      marginRight:30
    },
    image:{
        borderRadius:5,
        width:250,
        alignSelf:"center",
        height:180,
        marginBottom:50,
        marginTop:10
        
        
        

    },
    itemName: {
      fontSize: 19,
      color: '#1078FC',
      fontWeight: '600',
      alignSelf: "center",
      textShadowColor:  "#000",
      marginTop:25,
      marginBottom:15
    
     
      
        
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
     
      width:80,
     
      marginBottom:10,
      marginLeft:5,
      marginRight:5
    },
    imageop:{
       
        width:65,
        alignSelf:"center",
        
        marginBottom:20,
        marginTop:20
        
        
        

    },
  });