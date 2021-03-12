import React,{Component} from 'react';
import { SafeAreaView, View, FlatList,Dimensions, StyleSheet, Text,Modal,TouchableHighlight,TouchableOpacity,Image,TextInput,ScrollView } from 'react-native';
import Header from "./Header"
import GradientButton from 'react-native-gradient-buttons';
import AwesomeButton from "react-native-really-awesome-button/src/themes/blue";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import PostsController from "./Controller/PostsContoller"
import { SearchBar, ThemeProvider, ThemeConsumer } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { Icon ,Overlay,Input }from  "react-native-elements"
import Fire from './Dao/Fire'
import { v4 as uuidv4 } from 'uuid';
import { CheckBox } from 'react-native-elements'
import firebase from "firebase"; // 4.8.1
import FirePosts from './Dao/FirePosts';
import 'react-native-get-random-values'
import Item from "./Item" 
import CheckBoxGroupe from "./Utils/checkBox"
import { Dropdown } from 'react-native-material-dropdown';

const screenWidth = Math.round(Dimensions.get("window").width);

var i=0;
var ii=0;
var questions=[]
var listT=[]
var mylist=[] 
var quiz=[]
var demo=[]
const items = [
  {id:"1",value:"java script",code:"https://i.ibb.co/4m8fmS3/js.png",level:0},
{id:"2",value:"Html",code:"https://i.ibb.co/L0jfpP1/html.png",level:0},
{id:"3",value:"Css",code:"https://i.ibb.co/M2S9550/css.png",level:0},
{id:"4",value:"TypeScript",code:"https://i.ibb.co/Vth7XVH/typescript.png",level:0},
{id:"1A",value:"python",code:"https://i.ibb.co/5Ft4T8y/python.jpg",level:0},
{id:"2A",value:"Java",code:"https://i.ibb.co/ZG4ppCL/java.jpg",level:0},
{id:"3A",value:"C",code:"https://i.ibb.co/TKB1KZR/c.png",level:0},
{id:"4A",value:"swift",code:"https://i.ibb.co/QJd6FJ6/swift.png",level:0},
{id:"5",value:"kotlin",code:"https://i.ibb.co/2WHYy0h/kotlin.png",level:0},
{id:"6",value:"php",code:"https://i.ibb.co/jz5Tqwn/php.jpg",level:0},
{id:"7",value:"C#",code:"https://i.ibb.co/VxYRKh9/c.png",level:0}


];
export default class Discuss extends Component {

  state = {
    search: '',
    visible:false,
    show:false,
    image: "https://i.ibb.co/JKPN5W9/Capture.png",
    text:"",
    title:"",
    list:[],
    checked:[false,false,false],
    post:{},
    quiz:{},
    obj:"",
    qcm:[<CheckBoxGroupe reuslt={1} callback={(result)=>{questions.push(result);
      this.setState({quiz:questions})}}></CheckBoxGroupe>],
    refreshing: false,
  };
  _onRefresh = () => {
    console.log("yesss sirrrr")
    this.setState({refreshing: true});
    this.returnList();
    this.setState({refreshing: false});
  }
  toggleOverlay = () => {
    this.setState({visible:!this.state.visible});
  };
  toggleShow= () => {
    this.setState({show:!this.state.show});
  };
  updateSearch = search => {
    this.setState({ search });
  };
  create_UUID=()=>{
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
  UNSAFE_componentWillMount =  () => {
    this.getPermissionAsync();
    mylist=[]
    firebase.database().ref("PostList").on("value", (snapshot) => { 
      demo=[]
      snapshot.forEach((childSnapshot)=> {
        
        var childData = childSnapshot.val();
        Fire.shared.getUserData(childData.owner)
        demo.push({
            id:childData.id,
              image:childData.image,
              
              fname: childData.fname,
              lname:childData.lname,
              owner: childData.owner,
              imguser:childData.imguser,
              title:childData.title,
              text:childData.text ,
              date:childData.date,
              post:true
            }); 
          
           
        })
     
          mylist=quiz.concat(demo);
         
         mylist=mylist.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
         this.state.list=mylist

       
       
    })
    firebase.database().ref("QuizList").on("value", (snapshot) => { 
    
      quiz=[]
      snapshot.forEach((childSnapshot)=> {
        var childData = childSnapshot.val();
          quiz.push({
             
              id:childData.id,
              owner: childData.owner,
              imguser:childData.imguser,
              title:childData.title,
              obj:childData.obj,
              username:childData.username ,
              date:childData.date,
              post:false,
              questions:childData.questions
            }); 
         
        })
        
       
          mylist=demo.concat(quiz)
          
          mylist=mylist.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          ii=2;
          console.log(mylist)
          this.state.list=mylist
          this._onRefresh()
       // data=Array.from(new Set(data))
      // console.log("short")
      
    })
    this.state.list=mylist

    
  
    
  
  }

  handelChoices=()=>{
    var qcm = this.state.qcm;
    qcm.push(<CheckBoxGroupe reuslt={1} callback={this.getResponse}></CheckBoxGroupe>)
    this.setState({qcm:qcm});
    return qcm;
  }

  
  handelTest=()=>{
    let uid=this.create_UUID();      
    const utcDate1 = new Date();   
    let date = utcDate1.toUTCString();

  //  console.log(this.state.quiz)
      PostsController.shared.sendQuiz(this.state.title,this.state.quiz,uid,this.state.obj).then((b)=>{
        this.toggleShow()
      })
      // this.toggleOverlay()   
      this.setState({text:""});
      this.setState({title:""});
      this.setState({quiz:[]})
      this.setState({image:"https://i.ibb.co/JKPN5W9/Capture.png"});
      
  }

  handelClick=()=>{
    let uid=this.create_UUID();       
    const utcDate1 = new Date();   
    let date = utcDate1.toUTCString();
   
    if(this.state.image!=="https://i.ibb.co/JKPN5W9/Capture.png"){ PostsController.shared.sendPost(this.state.text,this.state.title,this.state.image,uid).then(()=>{  this.toggleOverlay();});}
    else{
      PostsController.shared.sendPost(this.state.text,this.state.title,"null",uid).then(()=>{  this.toggleOverlay();});
    }
    
     
      this.setState({text:""});
      this.setState({title:""});
      this.setState({image:"https://i.ibb.co/JKPN5W9/Capture.png"});
      
  }


  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  getResponse=(result)=>{
    
    questions.push(result);
    this.setState({quiz:questions})

}

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      
      quality: 1
    });

    if (!result.cancelled) {
      this.setState({ image:result.uri });
    }
  };
  returnList=()=>{

    return this.state.list;
  }
  render() {
    let { image } = this.state;
    const { search } = this.state;
    let q=1;
    if(q===1){
      this._onRefresh
    }
    q=24;
    i=i+1;
   
    return (
      <View style={styles.container}>
    
      <FlatList
     
        refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
        
        keyExtractor={item => item.id}
       extraData={ii}
        data={this.returnList()}
        renderItem={({ item }) => 
          
          (    
          <Item lname={item.lname} 
          image={item.image} 
          fname={item.fname}
          id={item.id}
         username={item.username}
          post={item.post}
          imguser={item.imguser}
          date={item.date}
          text={item.text}    
          obj={item.obj}
          title={item.title} 
          data={item.questions}
          uid={item.owner}
          />)} 
      
      
      />
      <ActionButton buttonColor="#1078FC" offsetX={20} offsetY={20}  >
    
    <ActionButton.Item buttonColor='#9b59b6' title="Share a Post" onPress={this.toggleOverlay}>
    <Icon
   name="plus-square"
    type='font-awesome'
    size={30}
    color="#fff"/>
</ActionButton.Item>
<ActionButton.Item buttonColor='#3498db' title="Share a Quiz" onPress={this.toggleShow}>
<Icon
   name="trophy"
    type='font-awesome'
    size={30}
    color="#fff"/>
</ActionButton.Item>


</ActionButton>
     
          <Modal
          //prob in slide
          presentationStyle='pageSheet'
        animationType="slide"
        visible={this.state.visible}
       
      >
        
          <ScrollView style={styles.modalView}>
          <View style={styles.user} >
         
              <Image style={styles.pickimage} source={{ uri:Fire.shared.user.image }}  />
             <Text style={styles.modalText}>{Fire.shared.user.fname+" "+Fire.shared.user.lname}</Text>
               </View>
            <View style={{marginTop:10,alignItems:"center"}}>
            <Input
             label="Question Titel"
              placeholder='Write Something'
              multiline = {true}
              
              onChangeText={(event)=>{this.setState({title:event})}}
            />
            </View>
            <View style={{marginTop:10,alignItems:"center"}}>
            <Input
            label="Question Body"
            multiline = {true}
              
              placeholder='Write Something'
              onChangeText={(event)=>{this.setState({text:event})}}
            />
            </View>
         
          
          <TouchableOpacity style={{alignSelf:"center",marginBottom:40}} onPress={this._pickImage}> 
          <Image
              source={{ uri: image }}
              resizeMode="contain"
              style={{ width: 200, height: 200,alignSelf:"center",borderRadius:10 }}
            ></Image>
            </TouchableOpacity>
           
          
             

            <View style={{ flexDirection:"row",alignSelf:"center"}}>
            <AwesomeButton type="secondary" backgroundColor='#fff' borderRadius={30} width={100}  textSize={20} onPress={this.toggleOverlay} >
              return
            </AwesomeButton>
            <View style={{marginLeft:40}}>
            <AwesomeButton type="secondary" backgroundColor='#fff' styl borderRadius={30} width={100}  textSize={20} onPress={()=>{
           
           this.handelClick()}}>
              Save
            </AwesomeButton>
            </View>
           
            </View>
        
          </ScrollView>
        
      </Modal>
      <Modal
          //prob in slide
          presentationStyle='pageSheet'
        animationType="slide"
        visible={this.state.show}
       
      >
        
          <ScrollView style={styles.modalView}>
          <View style={styles.user} >
         
              <Image style={styles.pickimage} source={{ uri:Fire.shared.user.image }}  />
             <Text style={styles.modalText}>{Fire.shared.user.fname+" "+Fire.shared.user.lname}</Text>
               </View>
            <View style={{marginTop:10,alignItems:"center"}}>
            <Input
             label="Test Titel"
             multiline = {true}
              numberOfLines = {4}
              placeholder='Write Something'
              onChangeText={(event)=>{this.setState({title:event})}}
            />
            <View >
            <Dropdown
            onChangeText={text=>{this.setState({obj:text})}}
            containerStyle={{width:screenWidth-10,marginBottom:20}}
            
        label='Choose the Subject of The Quiz'
        data={items}
        
      />
            </View>
             
            </View>
            
            {this.state.qcm}
            <GradientButton
      style={{alignSelf:"center",marginBottom:50, marginVertical: 8,marginTop:50 }}
      text="Add Question "
      textStyle={{ fontSize: 14 }}
      gradientBegin="#1078FC"
      gradientEnd="#1078FC"
      gradientDirection="diagonal"
      height={40}
      width={150}
      radius={15}
      impact
      impactStyle='Light'
      onPressAction={()=>{
        this.handelChoices()
      }}
    />
            
            
            <View style={{ flexDirection:"row",alignSelf:"center",marginBottom:20}}>
            <GradientButton
      style={{alignSelf:"center",marginBottom:50, marginVertical: 8,marginTop:50 }}
      text="Return "
      textStyle={{ fontSize: 20 }}
      gradientBegin="#1078FC"
      gradientEnd="#1078FC"
      gradientDirection="diagonal"
      height={50}
      width={170}
      radius={15}
      impact
      impactStyle='Light'
      onPressAction={this.toggleShow} 
    />

           
            <View style={{marginLeft:25}}>
            <GradientButton
      style={{alignSelf:"center",marginBottom:50, marginVertical: 8,marginTop:50 }}
      text="Save "
      textStyle={{ fontSize: 20 }}
      gradientBegin="#1078FC"
      gradientEnd="#1078FC"
      gradientDirection="diagonal"
      height={50}
      width={170}
      radius={15}
      impact
      impactStyle='Light'
      onPressAction={()=>{
           
        this.handelTest()}}
    />
          
            </View>
           
            </View>
        
          </ScrollView>
        
      </Modal>

        
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
    width: 60,
    height: 60,
    marginLeft:30,
    marginBottom:5,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "#7B7881",

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
  user:{

    backgroundColor: "white",
   borderRadius:10,
    marginTop:30,
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
    marginTop:20,
    marginLeft:15,
    fontSize:16,
    fontWeight:"800",
    
  }
});
/**<Item title={item.fname+" "+item.lname} image={item.image} 
         imageuser={item.imguser}
         date={item.date}
         text={item.text}
         /> */
         /** <ActionButton buttonColor="#1078FC" offsetX={20} offsetY={20} onPress={this.toggleOverlay} degrees={0} >
      
          <Icon
             name="plus"
              type='font-awesome'
              size={30}
              color="#fff"/>
          
        </ActionButton> */