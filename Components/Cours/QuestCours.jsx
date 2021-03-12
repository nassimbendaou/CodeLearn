import React, { Component } from 'react'
import { StyleSheet,Text, View,TouchableOpacity,Image,Animated ,ScrollView  } from 'react-native'
import AwesomeButton from "react-native-really-awesome-button/src/themes/blue";
import { CheckBox } from 'react-native-elements'
import CheckboxGroup from 'react-native-checkbox-group'

var rep=[];
var dim=50;

export default class QuestCours extends React.Component  {


 
  
  state={
    
    answers:'',
    question:{},
    options:[],
    myanswer:'',
  
  }
 
  
   componentDidMount() {
     var optiont=[];
     this.setState({question:this.props.route.params.quest})
     this.setState({answer:this.props.route.params.quest.answer})
     let i=1;
     this.props.route.params.quest.optiens.forEach(element => {
          optiont.push({ label: element,
          value: i})
          i=i+i;
      });
      this.setState({options:optiont})

  }


  render() {

    return (
      <ScrollView  > 
        
          <View style={styles.itemContainer} >
        
          <Text style={styles.itemName}>{this.state.question.quest}</Text>
          
          <CheckboxGroup
              callback={(selected) => { console.log(selected) }}
              iconColor={"#00a2dd"}
              iconSize={40}
              checkedIcon="ios-checkbox-outline"
              uncheckedIcon="ios-square-outline"
              checkboxes={this.state.options
              }
              labelStyle={{
                color: '#333',
                fontSize:18,marginBottom:12
              }}
              rowStyle={{
                flexDirection: 'row',
                marginVertical:10,
                marginHorizontal:5
              }}
              rowDirection={"column"}
            />
                     
          </View>
          <AwesomeButton
       progress
       
       type="secondary"
       width={ 100}
       textSize={17}
              
               
           style={{alignSelf:"center",borderRadius:20,marginBottom:30}}
            >
              Next 
            </AwesomeButton>
          
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
shadowOpacity: 0.58,
shadowRadius: 16.00,

elevation: 24,
      borderRadius: 20,
    
      height: 500,
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
    itemName: {
      fontSize: 28,
      color: '#6D6D6D',
      fontWeight: '600',
      marginLeft:15,
      textShadowColor:  "#000",
      marginTop:5,
      marginBottom:70
    
     
      
        
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