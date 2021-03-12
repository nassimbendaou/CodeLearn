import React, { Component } from 'react'
import { Text, View,FlatList,ScrollView ,StyleSheet,TouchableOpacity,Image,Dimensions,Picker} from 'react-native'
import ActionButton from 'react-native-action-button';
import RBSheet from "react-native-raw-bottom-sheet";
import { FlatGrid } from 'react-native-super-grid';
import * as RootNavigation from "./Utils/RootNavigation";
import { SearchBar } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import firebase from "firebase"; // 4.8.1
import Fire from './Dao/Fire';
const screenWidth = Math.round(Dimensions.get("window").height);
const DATA=[{id:"1",name:"java script",pic:"https://i.ibb.co/4m8fmS3/js.png",level:0},
{id:"2",name:"Html",pic:"https://i.ibb.co/L0jfpP1/html.png",level:0},
{id:"3",name:"Css",pic:"https://i.ibb.co/M2S9550/css.png",level:0},
{id:"4",name:"TypeScript",pic:"https://i.ibb.co/Vth7XVH/typescript.png",level:0},
]
const Programming=[{id:"1",name:"python",pic:"https://i.ibb.co/5Ft4T8y/python.jpg",level:0},
{id:"2",name:"Java",pic:"https://i.ibb.co/ZG4ppCL/java.jpg",level:0},
{id:"3",name:"C",pic:"https://i.ibb.co/TKB1KZR/c.png",level:0},
{id:"4",name:"swift",pic:"https://i.ibb.co/QJd6FJ6/swift.png",level:0},
{id:"5",name:"kotlin",pic:"https://i.ibb.co/2WHYy0h/kotlin.png",level:0},
{id:"6",name:"php",pic:"https://i.ibb.co/jz5Tqwn/php.jpg",level:0},
{id:"7",name:"C#",pic:"https://i.ibb.co/VxYRKh9/c.png",level:0}

]
const framework=[
    {id:"7",name:"Angular",pic:"https://i.ibb.co/4MYM7Rr/angular.png",level:0},
    {id:"23",name:"Spring",pic:"https://i.ibb.co/qdN6LT5/spring.png",level:0},
    {id:"32",name:"Laravel",pic:"https://i.ibb.co/HPm0NKg/laravel.png",level:0},
    {id:"2",name:"Symphony",pic:"https://i.ibb.co/K6BtFHs/symphony.png",level:0},
    {id:"22",name:"VueJs",pic:"https://i.ibb.co/LhG2H8J/vue.png",level:0}

 ]
 const mobile=[
    {id:"7",name:"ReactNative",pic:"https://i.ibb.co/x6P9g0q/react.png",level:0},
    {id:"23",name:"Flutter",pic:"https://i.ibb.co/R9W4s3y/flutter.jpg",level:0},
    {id:"32",name:"Ionic",pic:"https://i.ibb.co/qdwt7QT/ionic.jpg",level:0},
    {id:"2",name:"Android (java)",pic:"https://i.ibb.co/FXMkR0C/android.png",level:0}

 ]
 const all= Programming.concat(DATA,framework,mobile)
 var gthis={}
 var visible=false
 var opo=[]
 var pla=[]
 var challenges=[];
 function Item({ title,image,file,main }) {
    //last stop
    return (
        <View style={{flexDirection:"",alignItems:"center",marginHorizontal:10}}>
            <View style={{flexDirection:"column"}}><TouchableOpacity style={{borderColor:"#1078FC"}}
            onPress={()=>{
              visible=true;
              
              gthis.close()
            }}
            >
         
        <Image source={{uri:image}} style={{height:80,width:80,borderRadius:40}} />
 
       
      </TouchableOpacity>
      <Text style={{
      marginLeft:10,
      fontSize:14,
      fontWeight:"300",color:"#000",alignSelf:"center" }}>{title}</Text></View>
             
      </View>
     
    );
  }
  
  var list=[]
export default class Challenge extends Component {
    state={
        list:[],
        visible:false,
        challenges:[],
        data:[],
        search:""
    }
    toggleOverlay = () => {
      this.state.visible=!this.state.visible
     // console.log("v",this.state.visible)
    };
    handeldata=()=>{
         this.setState({list:[]});
      this.state.list=Fire.shared.getALL()
      
      return this.state.list
    }
    UNSAFE_componentWillMount() {
      this.setState({list:this.handeldata()})
      
      firebase.database().ref("ChallengeList").orderByChild("oponentid")
      .equalTo(firebase.auth().currentUser.uid)
      .on("value", (snapshot)=> {
        opo=[];
        snapshot.forEach((childSnapshot)=> {
          console.log("1")
          var childData = childSnapshot.val();    
                  
          opo.push(childData)
          console.log("2")
           
        });
        challenges=pla.concat(opo);
         console.log("post2",challenges)
         challenges=challenges.slice().sort((a, b) => b.date- a.date)
         this.setState({data:challenges})
    
      });
      
      firebase.database().ref("ChallengeList").orderByChild("playerid")
      .equalTo(firebase.auth().currentUser.uid)
      .on("value", (snapshot)=> {
        pla=[]
        snapshot.forEach((childSnapshot)=> {
          var childData = childSnapshot.val(); 
          console.log("1.1")       
          pla.push(childData)
          console.log("1.2")
        });
        
       
          challenges=opo.concat(pla)
          console.log("1",challenges)
          challenges=challenges.slice().sort((a, b) =>new Date(b.date).getTime() - new Date(a.date).getTime())
           this.setState({data:challenges})
      
      });

    }
    UNSAFE_componentWillUpdate(nextProps, nextState){

    }
    
    handelExtraDat=()=>{
      challenges=[];
      console.log("hello me again0")
      firebase.database().ref("ChallengeList").orderByChild("playerid")
      .equalTo(firebase.auth().currentUser.uid)
      .on("child_added", (snapshot)=> {
        console.log("hello me again1")
        snapshot.forEach((childSnapshot)=> {
          var childData = childSnapshot.val(); 
          console.log(childData)            
          challenges.push(childData)
           
        });
      });
      firebase.database().ref("ChallengeList").orderByChild("oponentid")
      .equalTo(firebase.auth().currentUser.uid)
      .on("child_added", (snapshot)=> {
        console.log("hello me again2")
        snapshot.forEach((childSnapshot)=> {
          var childData = childSnapshot.val();    
          console.log(childData)           
          challenges.push(childData)
           
        });
      });
      
   
      console.log("data2",challenges)
   const sortedActivities = challenges.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
      return sortedActivities;
     
    }
    handelTitle=(item)=>{
      console.log(item)
      if(item.playerid===firebase.auth().currentUser.uid){
      return <Text style={{color:"#6D6D6D",fontSize:12,alignSelf:"center"}}>you have challenged {item.oponent.username}</Text>
      }
      if(item.oponentid===firebase.auth().currentUser.uid){
        return <Text style={{color:"#6D6D6D",fontSize:12,alignSelf:"center"}}> {item.player.username} challenged you</Text>
      }
    }
    updateSearch = search => {
      var newlist=[];
      this.setState({search: search });
      if(search===""){
        this.setState({list:this.handeldata()})
      }
      console.log("search",search);
      console.log("state",this.state.search)
      this.state.list.forEach(element=>{
        if(element.fname.includes(search) || element.lname.includes(search) ){
          newlist.push(element);
          console.log(element)
        }
      });
      this.setState({list:newlist});

    };
    handelvi=()=>{
      console.log("nnnnn",this.state.visible)
      return this.state.visible}
      handelItem=(item)=>{
        if((item.oponentid===firebase.auth().currentUser.uid && !item.oponent.played)|| !item.player.played){
          return <TouchableOpacity onPress={()=>{
            if(!item.player.played && item.playerid===Fire.shared.uid){
              console.log("player go")
              this.props.navigation.navigate("TestChallenge",{player:true,data:item.questions,challenge:item});}
            if(!item.oponent.played  && item.oponentid===Fire.shared.uid){
              console.log("oponent go")
              this.props.navigation.navigate("TestChallenge",{player:false,data:item.questions,challenge:item,});}
            
          }}
            style={{flexGrow:1 ,backgroundColor:"#1078FC",marginLeft:10,marginRight:10,height:30,width:50,alignSelf:"center",alignItems:"center",justifyContent:"center",borderRadius:15}}>
              <Text style={{
            
            fontSize:14,
            fontWeight:"300",color:"#fff",alignSelf:"center",marginLeft:5,marginRight:5}}>play</Text></TouchableOpacity>
        }
        else{
          return   <TouchableOpacity style={{flexGrow:1 ,marginLeft:10,marginRight:10,height:30,width:50,alignSelf:"center",alignItems:"center",justifyContent:"center"}}><Text style={{color:"#6D6D6D",fontSize:14,alignSelf:"center",marginLeft:20,marginRight:10,fontWeight:"300",textAlign:'center',alignSelf:"center",marginLeft:5,marginRight:5}}>{item.player.score+":"+item.oponent.score}</Text></TouchableOpacity> 
        }

      }
    render() {
        return (
            <View style={styles.container}>
                  <FlatList
    extraData={this.state.data}
     data={this.state.data}
     renderItem={({ item }) =>  (
       <View style={{backgroundColor:"#fff",flex:1,marginBottom:4}}>
         {this.handelTitle(item)}
         <Divider style={{ backgroundColor: '#DDD',height:2,marginTop:5 }} />
       <TouchableOpacity style={{backgroundColor:"#fff",flex:1,flexDirection:"row",alignItems:"stretch"}}>
          <View style={styles.user} >   
      <Image style={styles.pickimage} source={{ uri:item.player.image }}  />
     <Text style={styles.modalText}>{item.player.username}</Text>
       </View>
       
      {this.handelItem(item)}
       <View style={styles.user1} >
      
      <Image style={styles.pickimage} source={{ uri:item.oponent.image }}  />
      <Text style={styles.modalText}>{item.oponent.username}</Text>
       </View>
       </TouchableOpacity>
      
       </View>
       
           
       )}
   
   
   />
    <ActionButton buttonColor="#1078FC" offsetX={20} offsetY={20}  nPress={()=>{
      console.log("clicked")
        this.RBSheetM.open()
    }}>
    
    <ActionButton.Item >
  
</ActionButton.Item>



</ActionButton>
    
    <ActionButton buttonColor="#1078FC" offsetX={20} offsetY={20}  onPress={()=>{
      console.log("clicked")
        this.RBSheetM.open()
    }} > 
    
  
</ActionButton>
<RBSheet
        ref={ref => {
          this.RBSheetM = ref;
          gthis=ref;
        }}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(168, 168, 168, 0.6)"
          },
          draggableIcon: {
            backgroundColor: "#6D6D6D",
            shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,
padding:5,
elevation: 24,
          },
          container:{
            backgroundColor: "#FFF",
            
          }
        }}
        height={650}
      >
      
        <Text style={styles.modalTextcente}>Choose your oponent</Text>
               <FlatList
      ListHeaderComponent={
        <SearchBar
       lightTheme
       round
       onClear={()=>{
        this.setState({list:this.handeldata()})
        //console.log(this.state.list)
       }}
       clearIcon={{ color: '#1078FC'}}
       onChangeText={(text)=>{this.updateSearch(text)}}
       value={this.state.search}
       placeholderTextColor='#6D6D6D'
       leftIconContainerStyle={{backgroundColor:"#fff"}}
       inputStyle={{backgroundColor:"#fff"}}
       inputContainerStyle={{backgroundColor:"#fff",borderRadius:35}}
       rightIconContainerStyle={{backgroundColor:"#fff"}}
       containerStyle={{backgroundColor:"#f5f5f5",borderEndWidth:0,borderEndColor:"#f5f5f5",padding:4}}
       showLoadingIcon
       searchIcon={{ type: 'font-awesome', name: 'search',color: '#1078FC'}}
       placeholder='Type Here...' />}
       data={this.state.list}
       renderItem={({ item }) =>  (
    
          <View style={styles.useritem} >
      <TouchableOpacity style={{flexDirection:"row",width:240}}>
      <Image style={styles.pickimage} source={{ uri:item.image }}  />
     <Text style={styles.modalText}>{item.fname+" "+item.lname}</Text>

      </TouchableOpacity>

     
     <TouchableOpacity  onPress={()=>{
     
     RootNavigation.navigate("challengechoice",{username:item.fname+" "+item.lname,image:item.image,id:item.id,token:item.token})
     this.RBSheetM.close();
    }}
     style={{backgroundColor:"#1078FC",marginLeft:30,height:40,width:80,alignItems:"center",justifyContent:"center",flexGrow: 1,marginRight:10,borderRadius:5}}>
       <Text style={{
     
     fontSize:14,
     fontWeight:"600",color:"#fff",alignSelf:"center"}}>play</Text></TouchableOpacity>
   
       </View>
    
       
           
       )}
   
   
   />
      </RBSheet>
<RBSheet
        ref={ref => {
          this.RBSheet = ref;
          gthis=ref;
        }}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(168, 168, 168, 0.6)"
          },
          draggableIcon: {
            backgroundColor: "#6D6D6D",
            shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.58,
shadowRadius: 16.00,
padding:5,
elevation: 24,
          },
          container:{
            backgroundColor: "#FFF",
            
          }
        }}
        height={450}
      >
          
        <ScrollView>
        <Text style={{marginTop:10,
      marginLeft:20,
      fontSize:16,
      fontWeight:"500",alignSelf:"center" }}>Choose your weapon</Text>
        <FlatGrid
         itemDimension={90}
         items={all}
                         style={{marginLeft:20}}
                         
                         renderItem={({ item }) =>   <View style={{flexDirection:"",alignItems:"center",marginHorizontal:10}}>
                         <View style={{flexDirection:"column"}}><TouchableOpacity  onPress={()=>{this.RBSheetM.open()}}
                         style={{borderColor:"#1078FC"}}
                        
                         >
                      
                     <Image source={{uri:item.pic}} style={{height:80,width:80,borderRadius:40}} />
              
                    
                   </TouchableOpacity>
                   <Text style={{
                   marginLeft:10,
                   fontSize:14,
                   fontWeight:"300",color:"#000",alignSelf:"center" }}>{item.title}</Text></View>
                          
                   </View>
                         }
                         keyExtractor={item => item.id}
                />
        </ScrollView>
      </RBSheet>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#ddd"
      
    },
    pickimage: {
      width: 50,
      height: 50,
      marginLeft:5,
      marginBottom:5,
      borderRadius: 63,
      borderWidth: 5,
      borderColor: "#fff",
  
    },
     
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
    item: {
      backgroundColor: '#FFF',
      marginVertical: 2, 
      shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 2,
  },
  
  
  elevation: 24,
        
    },
    title: {
      fontSize: 32,
    },
    modalView: {
      
      backgroundColor: "white",
      borderRadius: 20,
      
    
    },
    user1:{
      flexGrow: 1,
      backgroundColor: "white",
     borderRadius:10,
      flexDirection:"row-reverse",
   
    },
    user:{
      flexGrow:1 ,
      backgroundColor: "white",
     borderRadius:10,
     alignSelf:"flex-start",
     justifyContent:"flex-start",
      flexDirection:"row",
      
     
    },
    useritem:{
  
      backgroundColor: "white",
     borderRadius:10,
     
      flexDirection:"row",
      
     
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginTop:18,
      marginLeft:5,
      fontSize:10,
      fontWeight:"400",
     
    
    },
    modalTextcente: {
      marginTop:20,
      
      fontSize:14,
      fontWeight:"900",
      alignSelf:"center"
    
    },
  
  });
  /**  <FlatList
     
        keyExtractor={item => item.id}
       extraData={this.state.challenges}
        data={DATA}
        renderItem={({ item }) =>  (
          <View style={{flexDirection:"row",backgroundColor:"#fff",justifyContent:"space-around"}}>
             <View style={styles.user} >
         
         <Image style={styles.pickimage} source={{ uri:item.player.image }}  />
        <Text style={styles.modalText}>{item.player.username}</Text>
          </View>
          <Text style={{color:"#6D6D6D",fontSize:17,alignSelf:"center",marginTop:20,marginLeft:10,fontWeight:"900"}}>{item.player.score+":"+item.oponent.score}</Text>
          <View style={styles.user1} >
          <Text style={styles.modalText}>{item.oponent.name}</Text>
         <Image style={styles.pickimage} source={{ uri:item.oponent.image }}  />
       
          </View>
          </View>
              
          )}
      
      
      /> */