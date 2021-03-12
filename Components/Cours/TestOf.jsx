import React, { Component } from 'react'
import { StyleSheet,Text, View,TouchableOpacity,Image,Animated ,ScrollView  } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import TestTech from "../Controller/TestTechController"
import AwesomeButton from "react-native-really-awesome-button/src/themes/blue";
import Fire from '../Dao/Fire';
import GradientButton from 'react-native-gradient-buttons';
import UserController from '../Controller/UserController';
import CheckboxGroup from 'react-native-checkbox-group'
var rep=[];
var count=50;

export default class TestPage extends React.Component  {

    contDownref = React.createRef();
 
  
  state={
    list:[],
    answers:[],
    myanswer:[],
    question:{},
    flag:0,
    level:0,
    pic:"",
    score:0,
    item:0
  }
  
  handelScore=()=>{
    this.setState({score:this.state.score})};
  handelQuestion=(i)=>{
    if(this.state.item<10){ 
        this.setState({question:this.state.list[i]});
        //console.log("numl",this.state.i)
        return this.state.question;
      }
    if(this.state.item>10 ){
     console.log(this.state.score); 
   //  this.props.navigation.navigate("TestResult",{score:this.state.score});
    }
    if(this.state.item===10 ){
        console.log(this.state.score); 
      //  this.props.navigation.navigate("TestResult",{score:this.state.score});
       }
   
  }
   UNSAFE_componentWillMount() {
     this.myscore=0;
    var answ=[];
    TestTech.shared.getTestByname(this.props.route.params.name)
    this.state.list=TestTech.shared.getTestByname(this.props.route.params.name);
     this.state.list.forEach((element)=>{
        answ.push(element.answer);
     })
     this.setState({answers:answ});
    
    this.handelQuestion(0);
  }
  handelQuest=()=>{
      return this.state.question
  }
  handelFlag=()=>{
    return this.state.flag;
  }
  handelOptients=()=>{
    var i=0;
    var optiont=[]

    this.state.list[this.state.item].optiens.forEach(element => {
      optiont.push({ label: element,
      value: i})
      i=i+1;
  });
 
 return optiont;
  }

  render() {
   // const { params } = this.props.navigation.state;
    
    //const pic = 'https://i.ibb.co/PM7sq5J/random.png';
   // var data={name:"Test Contains 10 Problems.\n \nfor every problem you have 2 min. \n",code:pic};
    return (
      <ScrollView style={{backgroundColor:"#fff"}} > 
       
          <View style={styles.itemContainer} >
        <View style={{alignSelf:"flex-end",marginTop:10,marginRight:10}}>
          <CountdownCircleTimer
            
             isPlaying
             size={60}
              key={this.handelFlag()}
             
             onComplete={()=>{
                if(this.state.item<=10){
                    this.setState({flag:new Date().getTime()});
                this.setState({item:this.state.item+1});
                return [true,"1000"]}
                }}
             duration={30}
             colors={[['#1078FC', 0.33], ['#8788f8', 0.33], ['#A30000']]} >
                 {({ remainingTime, animatedColor }) => (
               <Animated.Text style={{ color: animatedColor ,fontSize:16,alignSelf:"center"}}>
               {remainingTime}
              
              </Animated.Text>
    )}

  </CountdownCircleTimer></View> 
  <Text style={styles.itemQuest}>{this.state.list[this.state.item].quest}</Text>
           
  <CheckboxGroup
              callback={(selected) => { console.log(selected)
              this.setState({myanswer:selected}) }}
              iconColor={"#6D6D6D"}
              iconSize={35}
              
              checkedIcon="ios-checkbox-outline"
              uncheckedIcon="ios-square-outline"
              checkboxes={this.handelOptients()
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
        //console.log(this.state.answer,this.state.myanswer)
        if(this.state.item<9){
        this.setState({flag:new Date().getTime()});
    this.setState({item:this.state.item+1});}
    else{
      let score=0;
      
        for(let i=0;i<this.state.answers.length;i++){
          if(this.state.answers[i]===this.state.myanswer[i]){
            score=score+1;
            
          }
          console.log(i)
        }
        this.props.navigation.navigate("Result",{score:score,name:"Test"});
    }
  
       }}
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
	width: 10,
	height: 12,
},
shadowOpacity: 0.2,
shadowRadius: 16.00,
padding:5,
elevation: 12,
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
        height:250,
        marginBottom:50,
        marginTop:10
        
        
        

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
      fontSize: 17,
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
    imageop:{
       
        width:65,
        alignSelf:"center",
        
        marginBottom:20,
        marginTop:20
        
        
        

    },
  });
  /** this.setState({flag:new Date().getTime()});
            this.setState({item:this.state.item+1});
            this.handelQuestion(this.state.item);*/