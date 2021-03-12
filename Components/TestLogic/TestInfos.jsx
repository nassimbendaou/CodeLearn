import React, { Component } from 'react'
import { StyleSheet,Text, View,TouchableOpacity,Image,ScrollView  } from 'react-native'
import GradientButton from 'react-native-gradient-buttons';
import AwesomeButton from "react-native-really-awesome-button/src/themes/blue";
import TestLogiqueController from '../Controller/TestLogiqueController';
export default class TestInfos extends Component {
  state={
    name:"",
    page:"TestLevels"
  }
  componentDidMount(){
    
   console.log(this.props.route.params.name)
 this.state.name=this.props.route.params.name;
    if(this.props.route.params.name==="random"){
       this.state.page="TestPage"
      
    }
    switch(this.props.route.params.name){
        case "matrice":
        TestLogiqueController.shared.getTestByname("matrice",1).slice(0);
          break;
        case "pilage":
          TestLogiqueController.shared.getTestByname("pilage",1).slice(0);
          break;
        case "random":
          TestLogiqueController.shared.getRandomTest().slice(0);
          break;   
    }
    
  }
  render() {
   // const { params } = this.props.navigation.state;
    
    const pic = this.props.route.params.picture ;
    var data={name:" Test Contains 10 Problems.\n\n for every problem you have 30s.\n\n to deblock the next level you should score over 60%.",code:pic};
    return (
      <ScrollView  > 
          <View style={styles.itemContainer} >
          <Text style={styles.itemName}>{data.name}</Text>
              <Image source={{ uri: data.code }} style={styles.image} ></Image>
              <Text style={styles.itemName}>Good Luck </Text>           
          </View>
          <View style={{flexDirection:"row",alignSelf:"center",marginHorizontal:20,marginBottom:25,marginTop:20}}>  
          <GradientButton
      style={{alignSelf:"center",marginBottom:30, marginVertical: 8 }}
      text="Return  "
      textStyle={{ fontSize: 20 }}
      gradientBegin="#1078FC"
      gradientEnd="#1078FC"
      gradientDirection="diagonal"
      height={45}
      width={150}
      radius={15}
      impact
      impactStyle='Light'
      onPressAction={()=>{
        this.props.navigation.navigate("puzzle-piece");}}
   style={{marginRight:40,alignSelf:"center",borderRadius:20}}
    />
      <GradientButton
      style={{alignSelf:"center",marginBottom:30, marginVertical: 8 }}
      text="Start "
      textStyle={{ fontSize: 20 }}
      gradientBegin="#1078FC"
      gradientEnd="#1078FC"
      gradientDirection="diagonal"
      height={45}
      width={150}
      radius={15}
      impact
      impactStyle='Light'
      onPressAction={()=>{
        this.props.navigation.navigate("TestPage",{name:this.props.route.params.name,level:this.props.route.params.level});}}
   style={{alignSelf:"center",borderRadius:20}}
 
    />
            
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
      backgroundColor:"#fff",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.1,
      shadowRadius: 16.00,
      
      elevation: 24,

      borderRadius: 20,
    
    
      marginTop:30,
      marginBottom:30,
      marginLeft:30,
      marginRight:30
    },
    image:{
        borderRadius:20,
        width:300,
        alignSelf:"center",
        height:350,
        marginBottom:20,
        marginTop:0
        
        
        

    },
    itemName: {
      fontSize: 16,
      color: '#6F6F6F',
      fontWeight: '600',
      alignSelf: "center",
      textShadowColor:  "#000",
      marginTop:10,
      marginBottom:10
    
     
      
        
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 8,
      color: '#fff',
    },
  });