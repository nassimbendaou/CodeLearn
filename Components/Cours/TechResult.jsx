import React, { Component } from 'react'
import { StyleSheet,Text, View,TouchableOpacity,Image,ScrollView  } from 'react-native'

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
  componentDidMount(){
    if(this.props.route.params.score>=5){
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

 
  render() {
   // const { params } = this.props.navigation.state;
    
    const r = this.props.route.params.score ;
  
    return (
      <ScrollView  > 
       {this.handelCanon()}
          <View style={{    justifyContent: 'center',
      alignSelf:"center",
      backgroundColor:"#fff",
 
      borderRadius: 150,
        borderColor:this.state.result? "#1FEE12":"#E81B1B",
        borderWidth:20,
      height: 300,
      width:300,
      marginTop:130,
      
      marginLeft:30,
      marginRight:30}} >
    <Text style={{  fontSize: 80,
      color: this.state.result? "#1FEE12":"#E81B1B",
      fontWeight: '900',
      alignSelf: "center",
      textShadowColor:  "#000"}}>{r}0%</Text>
                
          </View>
          <View style={{alignSelf:"center",alignContent:"center",marginTop:100}}>  
             <AwesomeButton
       progress
       onPress={()=>{
        this.props.navigation.navigate("comments");}}
       type="secondary"
              width={ 100}
              textSize={17}
            
           style={{borderRadius:20}}
            >
              return 
            </AwesomeButton>
    
       
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