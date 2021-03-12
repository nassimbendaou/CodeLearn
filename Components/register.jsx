import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  Dimensions,
  Image,
  StyleSheet
} from "react-native";
import GradientButton from 'react-native-gradient-buttons';
import AwesomeButton from "react-native-really-awesome-button/src/themes/blue";
import { Icon } from "react-native-elements";
import Toast from "react-native-tiny-toast";
const screenWidth = Math.round(Dimensions.get("window").width);
import UserController from "./Controller/UserController";

export default class Auth extends Component {
  state = {
    email: "",
    password: "",
    confirm: ""
  };

  handelLogin = (email, password) => {
    if (
      this.state.email !== "" &&
      this.state.password !== "" &&
      this.state.confirm !== ""
    ) {
      if (this.state.password === this.state.confirm) {
        UserController.shared.SignUp(email, password);
      } else {
        Toast.show("please re-confirm your password");
      }
    } else {
      Toast.show("please fill all the inputs ");
    }
  };

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.header} ></View>
  
  <View
         style={styles.avatar}
        
      >
       <Image style={styles.pickimage} source={{
              uri:"https://i.ibb.co/d64F2qx/output-onlinepngtools-9.png"
            }}  />
      </View>
        <View style={styles.form}>
          <View style={styles.passwordContainer}>
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
          </View>

          <View style={styles.passwordContainer}>
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
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputStyle}
              autoCorrect={false}
              secureTextEntry
              placeholder="Confirm your Password"
              onChangeText={confirm => this.setState({ confirm })}
            />
            <Icon
              style={styles.inputStyle}
              name="key"
              type="font-awesome"
              color="#A3A0A0"
            />
          </View>
          <View
            style={{
            

              marginVertical: 20
            }}
          >
                <GradientButton
      style={{alignSelf:"center",marginBottom:10, marginVertical: 8 }}
      text="Register In "
      textStyle={{ fontSize: 20 }}
      gradientBegin="#1078FC"
      gradientEnd="#1078FC"
      gradientDirection="diagonal"
      height={50}
      width={screenWidth-100}
      radius={15}
      impact
      impactStyle='Light'
      onPressAction={()=>{this.handelLogin(this.state.email,this.state.password)}}
    />
         
          </View>
        </View>
      </View>
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
      backgroundColor: "#fff",
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
    main: {
      backgroundColor: "#fff",
      flex: 1,
      
    },
    form: {
      fontFamily: "Roboto",
      fontSize: 30,
      textAlign: "center",
      fontWeight: "bold",
  
      fontFamily: "Cochin",
      marginVertical: 13,
      color: "#fff"
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
    }
  });
