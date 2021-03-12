import React,{Component} from 'react';
import { SafeAreaView, View, FlatList,Dimensions, StyleSheet, Text,Modal,TouchableHighlight,TouchableOpacity,Image,TextInput } from 'react-native';
import Header from "./Header"
import AwesomeButton from "react-native-really-awesome-button/src/themes/blue";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import PostsController from "./Controller/PostsContoller"
import { SearchBar, ThemeProvider } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { Icon ,Overlay,Input }from  "react-native-elements"
import Fire from './Dao/Fire'
import { v4 as uuidv4 } from 'uuid';
import firebase from "firebase"; // 4.8.1
import FirePosts from './Dao/FirePosts';
import Item from "./Item"
const screenWidth = Math.round(Dimensions.get("window").width);
var DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    img:"https://i.ibb.co/WF1DGsv/user.png"
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    img:"https://i.ibb.co/WF1DGsv/user.png"
  },
  {
    id: '58694a0f-3da1-47-bd96-145571e29d72',
    title: 'Third Item',
    img:"https://i.ibb.co/WF1DGsv/user.png"
  },
  {
    id: '58694a0f-3da1-471f-bd9-145571e29d72',
    title: 'Third Item',
    img:"https://i.ibb.co/WF1DGsv/user.png"
  },
  {
    id: '58694a0f-3da1bd96-145571e29d72',
    title: 'Third Item',
    img:"https://i.ibb.co/WF1DGsv/user.png"
  },
  {
    id: '94a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    img:"https://i.ibb.co/WF1DGsv/user.png"
  },
  {
    id: '90f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    img:"https://i.ibb.co/WF1DGsv/user.png"
  },
  {
    id: '94a0f1-471f-bd96-145571e29d72',
    title: 'Third Item',
    img:"https://i.ibb.co/WF1DGsv/user.png"
  },
];






export default class Home extends Component {
 
  state = {
    search: '',
    visible:false,
    image: "https://i.ibb.co/JKPN5W9/Capture.png",
    text:"",
    title:"",
    list:FirePosts.shared.getAllPosts(),
    post:{}
  };
  toggleOverlay = () => {
    this.setState({visible:!this.state.visible});
  };
  updateSearch = search => {
    this.setState({ search });
  };
   componentDidMount =  () => {
    this.getPermissionAsync();
    
  
  }
  
  

  handelClick=()=>{
    let uid=uuidv4();      
    const utcDate1 = new Date();   
    let date = utcDate1.toUTCString();
      PostsController.shared.sendPost(this.state.text,this.state.title,this.state.image,uid)
      let post={text:this.state.text,title:this.state.title,image:this.state.image,id:uid,fname:Fire.shared.user.fname
        ,lname:Fire.shared.lname,owner:Fire.shared.uid,date:date,imguser:Fire.shared.user.image}
      var data=this.state.list;
   
      data.push(post);
      this.setState({list:data})
      this.setState({post:post})
      this.setState({text:""});
      this.setState({title:""});
      this.setState({image:"https://i.ibb.co/JKPN5W9/Capture.png"});
      this.toggleOverlay();
  }
  handelTest=()=>{
    let uid=uuidv4();      
    const utcDate1 = new Date();   
    let date = utcDate1.toUTCString();
      PostsController.shared.sendPost(this.state.text,this.state.title,this.state.image,uid)
      let post={text:this.state.text,title:this.state.title,image:this.state.image,id:uid,fname:Fire.shared.user.fname
        ,lname:Fire.shared.lname,owner:Fire.shared.uid,date:date,imguser:Fire.shared.user.image}
      var data=this.state.list;
   
      data.push(post);
      this.setState({list:data})
      this.setState({post:post})
      this.setState({text:""});
      this.setState({title:""});
      this.setState({image:"https://i.ibb.co/JKPN5W9/Capture.png"});
      this.toggleOverlay();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      this.setState({ image:result.uri });
    }
  };
  render() {
    let { image } = this.state;
    const { search } = this.state;
    return (
      <View style={styles.container}>
    
      <FlatList
      ListHeaderComponent={
         <SearchBar
        lightTheme
        round
        clearIcon={{ color: '#1078FC'}}
        onChangeText={this.updateSearch}
        value={search}
        placeholderTextColor='#6D6D6D'
        leftIconContainerStyle={{backgroundColor:"#fff"}}
        inputStyle={{backgroundColor:"#fff"}}
        inputContainerStyle={{backgroundColor:"#fff",borderRadius:35}}
        rightIconContainerStyle={{backgroundColor:"#fff"}}
        containerStyle={{backgroundColor:"#f5f5f5",borderEndWidth:0,borderEndColor:"#f5f5f5",padding:4}}
        showLoadingIcon
        searchIcon={{ type: 'font-awesome', name: 'search',color: '#1078FC'}}
        placeholder='Type Here...' />}
        keyExtractor={item => item.id}
       extraData={this.state.list}
        data={this.state.list}
        renderItem={({ item }) =>  (
          <Item lname={item.lname} 
          image={item.image} 
          fname={item.fname}
          imguser={item.imguser}
          date={item.date}
          text={item.text}     
          />)}
      
      
      />
     
      <ActionButton buttonColor="#1078FC" offsetX={20} offsetY={20}  >
    
              <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
              <Icon
             name="minus"
              type='font-awesome'
              size={30}
              color="#fff"/>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {console.log("Notifications tapped!")}}>
          <Icon
             name="user"
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
        
          <View style={styles.modalView}>
          <View style={styles.user} >
         
              <Image style={styles.pickimage} source={{ uri:Fire.shared.user.image }}  />
             <Text style={styles.modalText}>{Fire.shared.user.fname+" "+Fire.shared.user.lname}</Text>
               </View>
            <View style={{marginTop:10,alignItems:"center"}}>
            <Input
             label="Question Titel"
              placeholder='Write Something'
              onChangeText={(event)=>{this.setState({title:event})}}
            />
            </View>
            <View style={{marginTop:10,alignItems:"center"}}>
            <Input
            label="Question Body"
              placeholder='Write Something'
              onChangeText={(event)=>{this.setState({text:event})}}
            />
            </View>
         

          <TouchableOpacity style={{alignSelf:"center",marginBottom:40}} onPress={this._pickImage}> 
          <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200,alignSelf:"center",borderRadius:10 }}
            ></Image>
            </TouchableOpacity>
           
          
             

            <View style={{ flexDirection:"row",alignSelf:"center"}}>
            <AwesomeButton type="secondary" backgroundColor='#fff' borderRadius={30} width={100}  textSize={20} onPress={this.toggleOverlay} >
              return
            </AwesomeButton>
            <View style={{marginLeft:40}}>
            <AwesomeButton type="secondary" backgroundColor='#fff' styl borderRadius={30} width={100}  textSize={20} onPress={this.handelClick}>
              Save
            </AwesomeButton>
            </View>
           
            </View>
        
          </View>
        
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