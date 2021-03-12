import React, { Component } from 'react'
import { StyleSheet,Text, View,TouchableOpacity,Image } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';
import RootNavigation from "../Utils/RootNavigation"
import UserController from '../Controller/UserController';
import { ThemeProvider } from '@react-navigation/native';
import { Icon } from "react-native-elements";
import Fire from '../Dao/Fire';
var items =[]
export default class TestLogicHome extends Component {
    state={
        levels:[],
        myTest:[]
    }
    componentDidMount() {
       console.log(this.props)
    }
    handelItems=()=>{
        this.state.levels=Fire.shared.user.logiquelevel;
        //console.log(this.state.myTest)
        
        this.state.levels.forEach(element => {
            if(element.name===this.props.route.params.name){
                    this.state.myTest=element.levels;
                    
                    //items=element.levels;
            }
        });
        
         return this.state.myTest};
  render() {
    
    return (
       <View style={{flex:1}}><FlatGrid
        itemDimension={150}
        items={this.handelItems()}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        // spacing={20}
      
        renderItem={({ item, index }) => (
          <TouchableOpacity style={{ shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
          justifyContent: 'flex-end',    
          borderRadius: 5,
          padding: 10,
          height: 150,
          borderBottomColor:'#1078FC',
          borderBottomWidth:10,backgroundColor: item.disabled ? '#fff' : '#dddddd'}}
          disabled={!item.disabled }
          onPress={()=>{
            this.props.navigation.navigate("TestInfos",{name:this.props.route.params.name,level:item.num,picture:this.props.route.params.picture});}}>
                 
                 <Icon
              style={{ width:100,
                height:100,
                alignSelf: "center",
                color:'#fff'
            }}
              name="lock"
              size={100}
              type="font-awesome"
              color="#fff"
            />
            <Text style={styles.itemName}>level {item.num}</Text>
            
          </TouchableOpacity>
        )}
      /></View> 
    )
  }
}
const styles = StyleSheet.create({
    gridView: {
      marginTop: 20,
      flex: 1,
    },
    itemContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        justifyContent: 'flex-end',    
        borderRadius: 5,
        padding: 10,
        height: 150,
        borderBottomColor:'#0f78fc',
        borderBottomWidth:10
    },
    image:{
        borderRadius:5,
        
        width:100,
        height:100,
        alignSelf: "center",
        

    },
    itemName: {
      fontSize: 16,
      color: '#1078FC',
      fontWeight: '500',
      
      fontStyle:"italic",
      alignSelf: "flex-end",
        
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
  });