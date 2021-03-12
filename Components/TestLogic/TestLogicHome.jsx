import React, { Component } from 'react'
import { StyleSheet,Text, View,TouchableOpacity,Image } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';
import RootNavigation from "../Utils/RootNavigation"
import Fire from '../Dao/Fire';
import TestLogiqueController from '../Controller/TestLogiqueController';
const items = [
    {key:"2", name: 'random', code: 'https://i.ibb.co/Wz7kJMW/output-onlinepngtools.png' },
    { key:"3", name: 'cases à Noircir', code: 'https://i.ibb.co/dQYf5MF/output-onlinepngtools-7.png' }, 
    { key:"1", name: 'cube', code: 'https://i.ibb.co/HBMBsGR/output-onlinepngtools-6.png' },
     {key:"4",  name: 'code', code: 'https://i.ibb.co/mGRL9MQ/output-onlinepngtools-5.png' },
    { key:"5", name: 'observation', code: 'https://i.ibb.co/sFbCKqk/output-onlinepngtools-2.png' },
     {key:"6",  name: 'pilage', code: "https://i.ibb.co/Vp5ptXY/output-onlinepngtools-1.png" },
     {key:"7",  name: 'matrice', code: "https://i.ibb.co/dKsLcJd/output-onlinepngtools-4.png" },
     {key:"8",  name: 'math logic', code: "https://i.ibb.co/x23sF20/output-onlinepngtools-3.png" },
  
  ];
export default class TestLogicHome extends Component {
  componentDidMount() {
    TestLogiqueController.shared.getRandomTest().slice(0);
  }
  handelNavigation=(name,code)=>{
    console.log(name,code)
    if(name==="random"){
      this.props.navigation.navigate("TestPage",{name:name});

    }
    else{
      this.props.navigation.navigate("TestLevels",{picture:code,name:name});
    }
   
  
  }
  render() {
    return (
        <FlatGrid
        itemDimension={150}
        items={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        // spacing={20}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={()=>{this.handelNavigation(item.name,item.code)}}>
              <Image source={{ uri: item.code }} style={styles.image} ></Image>
            <Text style={styles.itemName}>{item.name}</Text>
            
          </TouchableOpacity>
        )}
      />
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
      backgroundColor:"#fff",
      borderRadius: 5,
      padding: 10,
      height: 150,
    },
    image:{
        borderRadius:5,
        
        width:100,
        height:100,
        alignSelf: "center",
        

    },
    itemName: {
      fontSize: 16,
      color: '#396afc',
      fontWeight: '600',
      alignSelf: "center",
        
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
  });