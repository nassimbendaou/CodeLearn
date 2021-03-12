import React, { Component } from 'react'
import { StyleSheet,Text, View,TouchableOpacity,Image,ScrollView  } from 'react-native'
import GradientButton from 'react-native-gradient-buttons';
import AwesomeButton from "react-native-really-awesome-button/src/themes/blue";
import TestLogiqueController from '../Controller/TestLogiqueController';
import ConfettiCannon from 'react-native-confetti-cannon';

var result=false;
export default class TechResult extends Component {
  state={
    name:"",
    page:"TestLevels",
    result:false
  }
  componentWillMount(){
    if(this.props.route.params.score>=8){
      this.setState({result:true})
  
    }else{
      this.setState({result:false})
    }
  }
  handelCanon=()=>{
    if(this.state.result){
      return <ConfettiCannon count={200} origin={{x: -10, y: 0}} />
    }
  }
  handelUri=(r)=>{
    if(r>=8 && r <= 10){
      return "https://i.ibb.co/7phppYD/Clipart-Email-10743228-1-removebg-preview.png";
    }
    if(r>=5 && r<8){
      return "https://i.ibb.co/QphNmHW/hiclipart-com-2.png"
    }
    if(r<5){
      return "https://i.ibb.co/ZYmV3qL/sad-face-emoji-transparent-17.png"
    }
    
      
  }
  handelColor(r){
    if(r>=8 && r <= 10){
      return  "#1FEE12";
    }
    if(r>=5 && r<8){
      return "#ECC32A"
    }
    if(r<5){
      return "#E81B1B"
    }
   
  }
  handelDim=(r)=>{
    if(r>=8){
      return 264
    }
    else{
      return 200
    }
  }
  handelTitle=(r)=>{
    if(r>=8 && r <= 10){
      return "Congrats"
    }
    if(r>=5 && r<8){
      return "You could do better"
    }
    if(r<5){
      return "Unlucky"
    }
    
  }

 
  render() {
   // const { params } = this.props.navigation.state;
    
    const r = this.props.route.params.score ;
  
    return (
      <ScrollView style={{backgroundColor:"#fff"}} > 
      {this.handelCanon()}
      <View style={{    justifyContent: 'center',
     alignSelf:"center",
     backgroundColor:"#fAfAfA",
     shadowOffset: {
       width: 12,
       height: 12,
     },
     shadowOpacity: 0.5,
     shadowRadius: 15.00,
     padding:5,
     shadowColor: this.handelColor(r),
 
     borderRadius: 10,
       
       
     
     width:350,
     marginTop:130,
     
     marginLeft:30,
     marginRight:30}}> 
     <Image source={{uri:this.handelUri(r)}} style={{height:200,width:this.handelDim(r),justifyContent: 'center',
     alignSelf:"center",marginTop:10}} />
      <View style={{    justifyContent: 'center',
     alignSelf:"center",
     backgroundColor:"#fAfAfA",

    
      
       
     height: 100,
     width:300,
     marginTop:20,
     
     marginLeft:30,
     marginRight:30}} >
        <Text style={{  fontSize: 22,
     color: "#333",
     fontWeight: '900',
     alignSelf: "center",
        textShadowColor:  "#000"}}>{this.handelTitle(r)}</Text>
   <Text style={{  fontSize: 20,
     color: this.handelColor(r),
     fontWeight: '900',
     alignSelf: "center",
     textShadowColor:  "#000"}}>{r}0% Score</Text>
               
         </View></View>
       
         <View style={{alignSelf:"center",alignContent:"center",marginTop:100}}>  
         <GradientButton
     style={{alignSelf:"center",marginBottom:30, marginVertical: 8 }}
     text="Return "
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
        
      this.props.navigation.navigate("puzzle-piece");
     }} />
            
    
       
           </View>
       
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
    itemContainer: {
      justifyContent: 'center',
      alignSelf:"center",
      backgroundColor:"#fff",
 
      borderRadius: 150,
        borderColor:result? "#1FEE12":"#E81B1B",
        borderWidth:20,
      height: 300,
      width:300,
      marginTop:130,
      
      marginLeft:30,
      marginRight:30
    },
    image:{
        borderRadius:20,
        width:300,
        alignSelf:"center",
        height:300,
        marginBottom:20,
        marginTop:20
        
        
        

    },
    itemName: {
      fontSize: 80,
      color: result? "#1FEE12":"#E81B1B",
      fontWeight: '900',
      alignSelf: "center",
      textShadowColor:  "#000",
      
         
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 8,
      color: '#fff',
    },
  });