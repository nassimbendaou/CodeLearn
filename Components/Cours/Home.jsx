import React, { Component } from 'react'
import { Text, View,FlatList,ScrollView ,StyleSheet,TouchableOpacity,Image,Vibration} from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Icon ,Overlay,Input }from  "react-native-elements"
import { SearchBar, ThemeProvider } from 'react-native-elements';
import RBSheet from "react-native-raw-bottom-sheet";
import { FlatGrid } from 'react-native-super-grid';
import svg from "react-native-svg"
import { NavigationContainer, DrawerActions } from '@react-navigation/native'
import Fire from '../Dao/Fire';
import * as Permissions from "expo-permissions";
import { Notifications } from 'expo';
import * as RootNavigation from "../Utils/RootNavigation";
import firebase from "firebase"; // 4.8.1
import FireCours from '../Dao/FireCours';
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
var gthis={};
var todo=0;
function Item({ title,image,file,main }) {
    //last stop
    return (
        <View style={{alignItems:"center",marginHorizontal:10}}>
            <View style={{flexDirection:"column"}}><TouchableOpacity style={{borderColor:"#1078FC"}}
            onPress={()=>{
              
              var cours=[];
              let flag=true
             // main.close()
              firebase.database().ref("UsersList")
              .orderByChild("id")
              .equalTo(firebase.auth().currentUser.uid)
              .on("value", (snapshot)=> {
               
                snapshot.forEach((childSnapshot)=> {
                  var childData = childSnapshot.val();
                  
                  if(typeof childData.cours === 'undefined'){
                    flag=false
                  }
                  else{childData.cours.forEach(element => {
                    if( element.name===title){
                     flag=true
                    }
                   }
                   );}
                })});
               
                
                if(!flag){
                  if(typeof Fire.shared.user.cours === 'undefined'){
                    var user =Fire.shared.user
                    var cls={cours:[{level:0,name:title,pic:image,max:10}]}
                    Fire.shared.user=Object.assign(user, cls);
                    
                  }else{
                    Fire.shared.user.cours.push({level:0,name:title,pic:image})
                  }
                  Fire.shared.UpdateCours( Fire.shared.user.cours);
                 // RootNavigation.navigate("lessons",{name:title,level:file/10,pic:image})
                }
                
              RootNavigation.navigate("lessons",{name:title,level:file/10,pic:image})}}
            >
            <AnimatedCircularProgress
  size={80}
  width={4}
  rotation={180}
  lineCap="round"
  fill={file}
  tintColor="#396afc"
  backgroundColor="#ddd">
  {
    (fill) => (
        <Image source={{uri:image}} style={{height:80,width:80,borderRadius:40}} />
    )
  }
</AnimatedCircularProgress>
       
      </TouchableOpacity>
      <Text style={{
      marginLeft:10,
      fontSize:14,
      fontWeight:"300",color:"#000",alignSelf:"center" }}>{title}</Text></View>
             
      </View>
     
    );
  }
 
export default class Home extends Component {
    state={
        items:null,
    }
  
  sendPushNotification = () => {
    let response = fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: '',
        sound: 'default',
        title: 'Demo',
        body: 'Demo notificaiton'
      })
    });
  };
  _handleNotification = async notification => {    
                                                                                  
                                                   
  }; 
  


   componentDidMount() {
    this._notificationSubscription = Notifications.addListener(notification => {

      let { toScreen } = notification.data;
      RootNavigation.navigate(toScreen);
      
      // send user to screen
    
    });        
   
      FireCours.shared.getAllCoourses();
      firebase.database().ref("UsersList")
      .orderByChild("id")
      .equalTo(firebase.auth().currentUser.uid)
      .on("value", (snapshot)=> {
       
        snapshot.forEach((childSnapshot)=> {
          var childData = childSnapshot.val();             
          this.setState({items:childData.cours});
          if(typeof childData.cours!== 'undefined'){
          childData.cours.forEach((item)=>{
            DATA.forEach((d)=>{
                if(d.name===item.name){
                  d.level=item.level*10/item.max
                    console.log(item.level)
                }
            });
            framework.forEach((d)=>{
                if(d.name===item.name){
                    d.level=item.level
                }
            })
            Programming.forEach((d)=>{
                if(d.name===item.name){
                    d.level=item.level
                }
            })
            mobile.forEach((d)=>{
                if(d.name===item.name){
                    d.level=item.level
                }
            })
      })}
        });
      });
    
      
     
     
    }
    handelData=()=>{
      return  Fire.shared.user.cours
    }
    handelMyCours=()=>{
      const data = Fire.shared.user
      console.log(data)
        if(this.state.items!=null){
            return ( <View style={styles.itemContainer}> 
                <Text style={{
      marginLeft:10,
      fontSize:18,
      fontWeight:"600",color:"#6D6D6D"}}>My Courses</Text>
               <FlatList
                         data={data.cours}
                         style={{marginLeft:20,marginTop:30}}
                         horizontal
                         renderItem={({ item }) => <Item title={item.name}  image={item.pic} file={item.level*100/item.max} main={this.RBSheet}/>}
                         keyExtractor={item => item.id}
                />
       
                     </View>)
        }else{
            return(  <View style={styles.itemCours}> 
                <Text style={{marginTop:20,
      marginLeft:20,
      fontSize:18,
      fontWeight:"600",color:"#6D6D6D",marginBottom:3 }}>My Courses</Text>
      <View style={{flexDirection:"column"}}><Text  style={{
      marginLeft:10,
      fontSize:14,
      fontWeight:"200",color:"#6D6D6D",marginBottom:20,alignSelf:"center",marginTop:30}} >no seleceted corses </Text>
               <TouchableOpacity  onPress={() => this.RBSheet.open()} style={{backgroundColor:"#1078FC",height:40,width:200,alignSelf:"center",alignItems:"center",justifyContent:"center",borderRadius:5}}><Text style={{
     
      fontSize:14,
      fontWeight:"600",color:"#fff",alignSelf:"center"}}>Start learning</Text></TouchableOpacity></View>
                
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
        <FlatGrid
         itemDimension={90}
         items={all}
                         style={{marginLeft:20}}
                         
                         renderItem={({ item }) => <Item title={item.name} image={item.pic} file={item.level*10}/>}
                         keyExtractor={item => item.id}
                />
        </ScrollView>
      </RBSheet>
                     </View>)
        }
    }
    render() {
     this.getCouses
        return (
            <ScrollView>
                  <SearchBar
        lightTheme
        round
        clearIcon={{ color: '#396afc'}}
        style={{marginBottom:10}}
        placeholderTextColor='#6D6D6D'
        leftIconContainerStyle={{backgroundColor:"#fff"}}
        inputStyle={{backgroundColor:"#fff"}}
        inputContainerStyle={{backgroundColor:"#fff",borderRadius:35}}
        rightIconContainerStyle={{backgroundColor:"#fff"}}
        containerStyle={{backgroundColor:"#f5f5f5",borderEndWidth:0,borderEndColor:"#f5f5f5",padding:4}}
        showLoadingIcon
        searchIcon={{ type: 'font-awesome', name: 'search',color: '#1078FC'}}
        placeholder='Type Here...' />
        {this.handelMyCours()}
        <View style={styles.itemContainer}> 
                <Text style={{
      marginLeft:10,
      fontSize:18,
      fontWeight:"600",color:"#6D6D6D",marginBottom:3 }}>Become a Web Developper</Text>
                <Text  style={{
      marginLeft:10,
      fontSize:14,
      fontWeight:"200",color:"#6D6D6D",marginBottom:20}} >Learn Web development at your own space. and Become an expert </Text>
                <FlatList
                         data={DATA}
                         style={{marginLeft:20}}
                         horizontal
                         renderItem={({ item }) => <Item title={item.name} main={this.RBSheet} image={item.pic} file={item.level*10}/>}
                         keyExtractor={item => item.id}
                />
       
                     </View>
                <View style={styles.itemContainer}> 
                <Text style={{
      marginLeft:10,
      fontSize:18,
      fontWeight:"600",color:"#6D6D6D",marginBottom:10 }}>Programming languages</Text>
                <Text  style={{
      marginLeft:10,
      fontSize:14,
      fontWeight:"200",color:"#6D6D6D",marginBottom:20}} >Learn Programming at your own space. and Become an expert </Text>
                <FlatList
                         data={Programming}
                         style={{marginLeft:20}}
                         horizontal
                         renderItem={({ item }) => <Item title={item.name} image={item.pic} main={this.RBSheet} file={item.level*10}/>}
                         keyExtractor={item => item.id}
                />
       
                     </View>
                <View style={styles.itemContainer}> 
                <Text style={{
      marginLeft:10,
      fontSize:18,
      fontWeight:"600",color:"#6D6D6D",marginBottom:10 }}>Master the famous Frameorks</Text>
                <Text  style={{
      marginLeft:10,
      fontSize:14,
      fontWeight:"200",color:"#6D6D6D",marginBottom:20}} >Learn some of the famous frameworks at your own space. and Become an expert </Text>
                <FlatList
                         data={framework}
                         style={{marginLeft:20}}
                         horizontal
                         renderItem={({ item }) => <Item title={item.name} main={this.RBSheet} image={item.pic} file={item.level*10}/>}
                         keyExtractor={item => item.id}
                />
       
                     </View>
                     <View style={styles.itemContainer}> 
                <Text style={{
      marginLeft:10,
      fontSize:18,
      fontWeight:"600",color:"#6D6D6D",marginBottom:10 }}>Mobile Development</Text>
                <Text  style={{
      marginLeft:10,
      fontSize:14,
      fontWeight:"200",color:"#6D6D6D",marginBottom:20}} >Learn some of the famous frameworks to build mobile apps at your own space. and Become an expert </Text>
                <FlatList
                         data={mobile}
                         style={{marginLeft:20}}
                         horizontal
                         renderItem={({ item }) => <Item title={item.name} main={this.RBSheet} image={item.pic} file={item.level*10}/>}
                         keyExtractor={item => item.id}
                />
       
                     </View>
            </ScrollView>
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
    elevation: 10,   
      height: 200,
      marginBottom:15,
    
    },
    itemCours: {
        
        backgroundColor:"#fff",
        shadowColor: "#000",
      elevation: 10,   
        height: 200,
        marginBottom:15,
      
      },
    image:{
        borderRadius:20,
        width:300,
        alignSelf:"center",
        height:300,
        marginBottom:20,
        marginTop:0
        
        
        

    },
    itemName: {
      fontSize: 16,
      color: '#6F6F6F',
      fontWeight: '600',
      alignSelf: "center",
      textShadowColor:  "#000",
    
     
      
        
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 8,
      color: '#fff',
    },
  });