import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import UserController from "./Controller/UserController"
import AwesomeButton from "react-native-really-awesome-button/src/themes/blue";
//import AwesomeButtonSocial  from "react-native-really-awesome-button/src/themes/social/index";
import GradientButton from 'react-native-gradient-buttons';
import { Icon } from "react-native-elements";
import CoursController from "./Controller/CoursController";
const screenWidth = Math.round(Dimensions.get("window").width);


export default class Auth extends Component {
  state = {
    email: "",
    password: ""
  };
  componentDidMount(){
    //CoursController.shared.getAll();
    //console.log( CoursController.shared.getCoursByName("java script"));
  }

  render() {
    return (
      <ScrollView style={styles.main}>
         <TouchableOpacity style={styles.header} ></TouchableOpacity>
  
  <TouchableOpacity
         style={styles.avatar}
        
      >
       <Image style={styles.pickimage} source={{
              uri:"https://i.ibb.co/d64F2qx/output-onlinepngtools-9.png"
            }}  />
      </TouchableOpacity>
 
       
        <SafeAreaView style={styles.form}>
          <SafeAreaView style={styles.passwordContainer}>
            <TextInput
              style={styles.inputStyle}
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
              placeholder="Email"
            />
            <Icon
              style={styles.inputStyle}
              name="user"
              type="font-awesome"
              color="#A3A0A0"
            />
          </SafeAreaView>

          <SafeAreaView style={styles.passwordContainer}>
            <TextInput
              style={styles.inputStyle}
              autoCorrect={false}
              secureTextEntry
              placeholder="Password"
              onChangeText={password => this.setState({ password })}
            />
            <Icon
              style={styles.inputStyle}
              name="key"
              type="font-awesome"
              color="#A3A0A0"
            />
          </SafeAreaView>
          <SafeAreaView
            style={{
              
              alignItems:"center",
              justifyContent:"center",
              marginVertical: 20
            }}
          >
             
    
             <GradientButton
      style={{alignSelf:"center",marginBottom:10, marginVertical: 8 }}
      text="LogIn "
      textStyle={{ fontSize: 20 }}
      gradientBegin="#1078FC"
      gradientEnd="#1078FC"
      gradientDirection="diagonal"
      height={50}
      width={screenWidth-100}
      radius={15}
      impact
      impactStyle='Light'
      onPressAction={()=>{UserController.shared.SignIn(this.state.email,this.state.password)}}
    />
            <SafeAreaView style={{ marginTop: 15 }}>
               <GradientButton
      style={{alignSelf:"center",marginBottom:30, marginVertical: 8 }}
      text="SignIn "
      textStyle={{ fontSize: 20 }}
      gradientBegin="#1078FC"
      gradientEnd="#1078FC"
      gradientDirection="diagonal"
      height={50}
      width={screenWidth-100}
      radius={15}
      impact
      impactStyle='Light'
      onPressAction={() => this.props.navigation.navigate("Register")}
    />
              
            </SafeAreaView>
            
          </SafeAreaView>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 55,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    padding: 0
  },

  passwordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  backgroundColor:"#FAFAFA",
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,

    borderColor: "#0f78fc",
    marginVertical: 25
  },
  inputStyle: {
    flex: 1,
    paddingTop: 20,
    
    paddingBottom: 10,
    paddingLeft: 0,
    borderRadius: 10,
    marginLeft: 20,

    marginRight: 20,
    backgroundColor: "#FAFAFA",
    color: "#424242"
  },
  title: {
    marginTop: 30,
    justifyContent: 'center',
        alignItems: 'center',
    height: 200,
    width: 200,

    marginLeft: 50
  },
  pickimage: {
    width: 130,
    height: 130,
    borderRadius: 63,
   
    
    marginBottom: 10,
    alignSelf: "center",
    justifyContent:"center",
    position: "absolute",
    marginTop: 50
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
  main: {
 
    flex: 1,
   
    backgroundColor:"#FDFDFD"
  },
  form: {
    fontFamily: "Roboto",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",

    fontFamily: "Cochin",
    marginVertical: 13,
    color: "#fff"
  }
});
