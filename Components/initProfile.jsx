import React, { Component } from "react";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import firebase from "firebase"; // 4.8.1
import * as Permissions from "expo-permissions";
import GradientButton from 'react-native-gradient-buttons';
import AwesomeButton from "react-native-really-awesome-button/src/themes/blue";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import Fire from "./Dao/Fire"
import UserController from './Controller/UserController'
import DatePicker from 'react-native-datepicker'

export default class Profile extends Component {
  state = {
    userimage: "https://i.ibb.co/WF1DGsv/user.png",
    fname: "",
    lname: "",
    date:"",
    user: null,
    image: null
  };

  componentDidMount() {
    this.getPermissionAsync();

  }
  handleclick = () => {

        UserController.shared.writeUserData(
          this.state.userimage,
          this.state.fname,
          this.state.lname,
          this.state.date
        ).then(()=>{this.props.navigation.navigate("App");})
      
  

   
    
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.cancelled) {
      
      this.setState({ userimage: result.uri });
   
      
    }
    //console.log(result.cancelled);
  };
  render() {
    let { userimage } = this.state.userimage;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.header}  onPress={this._pickImage}></TouchableOpacity>
  
        <TouchableOpacity
               style={styles.avatar}
              onPress={this._pickImage}
            >
             <Image style={styles.pickimage} source={{ uri: this.state.userimage }}  />
            </TouchableOpacity>
       
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>Profile</Text>
            <TextInput
              style={styles.info}
              autoCorrect={false}
              onChangeText={fname => this.setState({ fname })}
              placeholder="firstname"
              
            />
            <TextInput
              style={styles.info}
              autoCorrect={false}
              onChangeText={lname => this.setState({ lname })}
              placeholder="lastname"
              
            />
            <DatePicker
      style={styles.infodate}
        date={this.state.date}
        mode="date"
        placeholder="Birth date"
        placeholderColor="#fff"
        format="YYYY-MM-DD"
        minDate="1950-01"
        confirmBtnText="Confirm"
      
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            
            borderWidth:0,
            
            

          }

        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
           
           <GradientButton
      style={{alignSelf:"center",marginBottom:30, marginVertical: 8 }}
      text="Save "
      textStyle={{ fontSize: 20 }}
      gradientBegin="#1078FC"
      gradientEnd="#1078FC"
      gradientDirection="diagonal"
      height={50}
      width={250}
      radius={15}
      impact
      impactStyle='Light'
      onPressAction={()=>this.handleclick()}
    />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 22,
    bottom: 0
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end"
  },
  header: {
    backgroundColor: "#1078FC",
    height: 200,
    borderBottomRightRadius:180,
    borderBottomLeftRadius:180,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.2,
shadowRadius: 16.00,
padding:5,
elevation: 24,
  },
  avatar: {
    width: 130,
    height: 130,
 marginTop:10,
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.1,
shadowRadius: 16.00,
padding:5,
elevation: 40,
  
  },
  name: {
    fontSize: 26,
    color: "#1078FC",
    fontWeight: "300",
    marginBottom:20
  },
  pickimage: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 7,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },
  
  body: {
    marginTop: 40
  },
  bodyContent: {
    alignItems: "center",
    padding: 30,
    marginVertical: 20
  },

  info: {
    fontSize: 16,
    
    
    marginTop: 10,
    marginBottom:20,
    borderRadius:15,
    padding:10,
    width:300,
    borderWidth: 1,
    borderColor: "#1078FC",
    
  },
  infodate: {
    
    
    
    marginTop: 10,
    marginBottom:20,
    borderRadius:15,
    
    width:300,
    borderWidth: 1,
    borderColor: "#0561D8",
    
  },
  description: {
    fontSize: 16,
    color: "#000",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#6D6D6D"
  }
});
