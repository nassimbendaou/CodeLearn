import React, { Component } from 'react'
import { StyleSheet,Text, View,TouchableOpacity,Image } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';
import RootNavigation from "../Utils/RootNavigation"
import Fire from '../Dao/Fire';
import TestTech from '../Controller/TestTechController';
const items = [
    {id:"1",name:"java script",code:"https://i.ibb.co/4m8fmS3/js.png",level:0},
{id:"2",name:"Html",code:"https://i.ibb.co/L0jfpP1/html.png",level:0},
{id:"3",name:"Css",code:"https://i.ibb.co/M2S9550/css.png",level:0},
{id:"4",name:"TypeScript",code:"https://i.ibb.co/Vth7XVH/typescript.png",level:0},
{id:"1A",name:"python",code:"https://i.ibb.co/5Ft4T8y/python.jpg",level:0},
{id:"2A",name:"Java",code:"https://i.ibb.co/ZG4ppCL/java.jpg",level:0},
{id:"3A",name:"C",code:"https://i.ibb.co/TKB1KZR/c.png",level:0},
{id:"4A",name:"swift",code:"https://i.ibb.co/QJd6FJ6/swift.png",level:0},
{id:"5",name:"kotlin",code:"https://i.ibb.co/2WHYy0h/kotlin.png",level:0},
{id:"6",name:"php",code:"https://i.ibb.co/jz5Tqwn/php.jpg",level:0},
{id:"7",name:"C#",code:"https://i.ibb.co/VxYRKh9/c.png",level:0}

  
  ];
export default class TestC extends Component {
  componentDidMount() {
    console.log("test",TestTech.shared.getTestByname("java script"));
  }
  handelNavigation=(name)=>{
  
      this.props.navigation.navigate("TestOf",{name:name});
   
  
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
          <TouchableOpacity style={styles.itemContainer} onPress={()=>{
            console.log(item.name)
            this.handelNavigation(item.name)
          }}>
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
      padding: 4,
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
      color: '#333',
      fontWeight: '600',
      alignSelf: "center",
        
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
  });