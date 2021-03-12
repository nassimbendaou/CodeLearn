import React from "react";
import { View, Text, StyleSheet, TextInput,TouchableOpacity, Image } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    flexDirection: "row",
    top:0,
    marginTop:0,
    alignItems:"center",
    backgroundColor: "#fff"
  },
  input: {
    height: 40,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10
  },
  pickimage:{
    width: 50,
    height: 50,
    borderRadius: 63,
    borderWidth: 7,
    borderColor: "white",
   
    
    
  
  }
});

const Header = props => (
  <View style={styles.container}>
          <TouchableOpacity
               
               >
                <Image style={styles.pickimage} source={{ uri: "https://i.ibb.co/WF1DGsv/user.png" }}  />
               </TouchableOpacity>
    <View style={{ alignItems: "center",flex:1,}}>
    
      <Image
        style={{ width: 70, height: 70 }}
        source={{
          uri:
          "https://i.ibb.co/2KPxGQc/brain-removebg-preview.png"
        }}
      />
    </View>
  </View>
);

export default Header;
