import React, { Component } from 'react'
import { StyleSheet,Text, View,TouchableOpacity,Image,Dimensions } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';
import RootNavigation from "../Utils/RootNavigation"
import UserController from '../Controller/UserController';
import { ThemeProvider } from '@react-navigation/native';
import { Neomorph } from 'react-native-neomorph-shadows';
import { SearchBar} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { Overlay,Input }from  "react-native-elements"
import { Icon } from "react-native-elements";
import Fire from '../Dao/Fire';
import FireCours from "../Dao/FireCours"
const screenWidth = Math.round(Dimensions.get("window").width);
var items =[]
export default class Lessons extends Component {
    state={
        cours:[],
        myTest:[]
    }
    componentDidMount() {
    let cours=FireCours.shared.getCoursByName(this.props.route.params.name);
       console.log(this.props.route.params.name);
       console.log(cours)
      
      
    }
    handelLessons=()=>{
        var arr=[]
       let cours=FireCours.shared.getCoursByName(this.props.route.params.name);
           
                var i=1;
                cours.forEach(element => {
                 
                    if(element.key<=this.props.route.params.level){

                        
                        arr.push({data:element,disabled:false,level:element.key})
                                        i=i+1
                    }
                    else{
                      if(element.key===1){

                        console.log(element.key)
                        arr.push({data:element,disabled:false,level:element.key})
                                        i=i+1
                    }else{arr.push({data:element,disabled:true,level:element.key})
                                        i=i+1}
                        
                    }
                   
                });
            
       
       
        console.log(arr)
        return arr;
    }
    handelItems=()=>{
        this.state.levels=Fire.shared.user.cours;

        this.state.levels.forEach(element => {
            if(element.name===this.props.route.params.name){
                
            }
        });
        
         return this.state.myTest};
  render() {
    
    return (
       <View style={{flex:1}}><FlatGrid
       ListHeaderComponent={
        <SearchBar
        lightTheme
        round
        clearIcon={{ color: '#1078FC'}}
        onChangeText={this.updateSearch}

        placeholderTextColor='#6D6D6D'
        leftIconContainerStyle={{backgroundColor:"#fff"}}
        inputStyle={{backgroundColor:"#fff"}}
        inputContainerStyle={{backgroundColor:"#fff",borderRadius:35}}
        rightIconContainerStyle={{backgroundColor:"#fff"}}
        containerStyle={{backgroundColor:"#f5f5f5",borderEndWidth:0,borderEndColor:"#f5f5f5",padding:4}}
        showLoadingIcon
        searchIcon={{ type: 'font-awesome', name: 'search',color: '#1078FC'}}
        placeholder='Type Here...' />
       }
        itemDimension={170}
        items={this.handelLessons()}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        // spacing={20}
      
        renderItem={({ item, index }) => (
            
          <TouchableOpacity 
          style={{ shadowColor: "#ddd",
          shadowOffset: {
              width: 8,
              height: 8,
          },
          shadowOpacity: 19,
          shadowRadius: 2,
          elevation: 6,
          justifyContent: 'flex-end',    
          borderRadius: 5,
          padding: 10,
          height: 180,
          borderBottomColor:'#0f78fc',
          borderBottomWidth:10,backgroundColor: item.disabled ? '#ddd' : '#fff' }}
          disabled={item.disabled }
          onPress={()=>{
            console.log("ket",item.level)
            this.props.navigation.navigate("testcours",{data:item.data,flag:0,name:this.props.route.params.name,level:item.level})}}
          >
                 
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
            <Text style={styles.itemName}>{item.data.name}</Text>
            
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
      color: '#0f78fc',
      fontWeight: '500',
      
      fontStyle:"italic",
      
        
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
  });