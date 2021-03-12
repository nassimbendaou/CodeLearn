import React, { Component } from 'react'
import { StyleSheet,Text, View,TouchableOpacity,Image,ScrollView } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';
import AwesomeButton from "react-native-really-awesome-button/src/themes/blue";
import GradientButton from 'react-native-gradient-buttons';
import RootNavigation from "../Components/Utils/RootNavigation"
import Fire from './Dao/Fire';
import TestTech from '../Components/Controller/TestTechController';
import { v1 as uuidv4 } from 'uuid';
import 'react-native-get-random-values'
import Toast from "react-native-tiny-toast";
import firebase from "firebase"; // 4.8.1
var items = [
    {id:"0",name:"java script",code:"https://i.ibb.co/4m8fmS3/js.png",level:0,color:false},
    {id:"1",name:"Html",code:"https://i.ibb.co/L0jfpP1/html.png",level:0,color:false},
{id:"2",name:"Css",code:"https://i.ibb.co/M2S9550/css.png",level:0,color:false},
    {id:"3",name:"C#",code:"https://i.ibb.co/VxYRKh9/c.png",level:0,color:false},

{id:"4",name:"TypeScript",code:"https://i.ibb.co/Vth7XVH/typescript.png",level:0,color:false},
{id:"5",name:"python",code:"https://i.ibb.co/5Ft4T8y/python.jpg",level:0,color:false},
{id:"6",name:"Java",code:"https://i.ibb.co/ZG4ppCL/java.jpg",level:0,color:false},
{id:"7",name:"C",code:"https://i.ibb.co/TKB1KZR/c.png",level:0,color:false},
{id:"8",name:"swift",code:"https://i.ibb.co/QJd6FJ6/swift.png",level:0,color:false},
{id:"9",name:"kotlin",code:"https://i.ibb.co/2WHYy0h/kotlin.png",level:0,color:false},
{id:"10",name:"php",code:"https://i.ibb.co/jz5Tqwn/php.jpg",level:0,color:false},


  
  ];
export default class ChallengChoice extends Component {
    state={
        data:[],
        color:[]
    }
  UNSAFE_componentWillMount() {
    var data=[]
    TestTech.shared.getTestByname("java script");
    items.forEach(element => {
      data.push({color:element.color,name:element.name,id:element.id}) 
    });
    this.state.color=data
    //this.setState({color:data})

    //console.log("testA",TestTech.shared.getTestByname("java script"));
  }
  sendPushNotification = (token) => {
    let response = fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: token,
        sound: 'default',
        title: 'SoloLearn ',
        body: Fire.shared.user.fname+" "+Fire.shared.user.lname+' Challenged You ',
        data:{"toScreen":"users"},
        ios: { _displayInForeground: true }
      })
    });
  };
  handelColor=(i)=>{
    return items[i].color;
  }
   create_UUID=()=>{
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
  handelNavigation=()=>{
    var tab=[];
    this.state.color.forEach(element => {
      if(element.color===true){
       // tab.push({name:element.name})
      // console.log("test of th ",)
         tab =tab.concat(TestTech.shared.getTestByname(items[element.id].name));
      
  
      }
    });
   
    if(tab.length!==0)
    {
      let uid=this.create_UUID();   
      console.log(uid)
         
      const utcDate1 = new Date();   
      let date = utcDate1.toUTCString();
       
    
     
     
    
        var challenge={
          id:uid,
            player: {id:firebase.auth().currentUser.uid,image:Fire.shared.user.image,username:Fire.shared.user.fname+" "+Fire.shared.user.lname,
            score:0,played:false},
            oponent:{id:this.props.route.params.id,image:this.props.route.params.image,username:this.props.route.params.username,score:0,played:false},
            questions:TestTech.shared.getRandomTests(tab),     
            date:date,
            oponentid:this.props.route.params.id,
            playerid:firebase.auth().currentUser.uid
    
        }
     
        firebase.database().ref("ChallengeList").push(challenge);
       
     this.props.navigation.navigate("TestChallenge",{data:challenge.questions,challenge:challenge,player:true});
      this.sendPushNotification(this.props.route.params.token)
    }else{
        Toast.show("please Choose a Language to challenge your oponent");
      }
   // console.log("test of th ",tab)
    
  
  }
  render() {
    return (
        <ScrollView style={{flex:1,backgroundColor:"#fff"}}>
            <Text style={styles.itemCo}>Choose your weopens</Text>
             <FlatGrid
        itemDimension={120}
        items={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        // spacing={20}
        renderItem={({ item, index }) => {
      
          return(
          
          <TouchableOpacity style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            
            elevation: 6,
                  justifyContent: 'center',
                 backgroundColor: this.state.color[index].color ? "#1078FC":"transparent",
                  borderRadius: 5,
                  padding: 4,
                  height: 120,
          }} onPress={()=>{
            var tab= []
            this.state.color.forEach(element => {

              if(element.id===item.id){
                tab.push({color:!element.color,id:element.id})
              }else{
                tab.push(element)
              }


            });
            this.setState({color:tab})
            //item.color=true;
           
            

           // 
          }}>
              <Image source={{ uri: item.code }} style={styles.image} ></Image>
           
            
          </TouchableOpacity>
        )}}
        
      />
      <View style={{ flexDirection:"row",alignSelf:"center",marginBottom:10}}>
      <GradientButton
      style={{alignSelf:"center", marginVertical: 8,marginTop:30 }}
      text="Continue  "
      textStyle={{ fontSize: 20 }}
      gradientBegin="#1078FC"
      gradientEnd="#1078FC"
      gradientDirection="diagonal"
      height={50}
      width={200}
      radius={15}
      impact
      impactStyle='Light'
      onPressAction={this.handelNavigation}
   
    />
          
           
           
            </View>
      </ScrollView>
       
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
    itemCo: {

        fontSize: 22,
        color: '#1078FC',
        fontWeight: '900',
        alignSelf: "center",
          marginTop:20
      },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
  });