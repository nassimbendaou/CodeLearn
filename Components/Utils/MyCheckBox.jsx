import React,{Component} from 'react';
import { SafeAreaView, View, FlatList,Dimensions, StyleSheet, Text,Modal,TouchableHighlight,TouchableOpacity,Image,TextInput,ScrollView } from 'react-native';
import AwesomeButton from "react-native-really-awesome-button/src/themes/blue";
import { CheckBox } from 'react-native-elements'


export default class MyCheckBox extends Component {
    state = {
        search: '',
        visible:false,
        show:false,
        image: "https://i.ibb.co/JKPN5W9/Capture.png",
        text:"",
        title:"",
        optien1:"",
        optien2:"",
        optien3:"",
        list:[],
        answer:"",
        disabled:false,
        checked:[false,false,false],
        post:{}
      };
    calc=()=>{
        this.props.callback(this.state.answer);
    }
    componentDidMount(){
        console.log("prop",this.props)
    }
    render() {
        return (
            <ScrollView style={styles.modalView}>
          
          
           
            <View style={{marginTop:10,alignItems:"center",flexDirection:"column",justifyContent:"center"}}>
            <View style={{flexDirection:"row"}}>
           <CheckBox
          
            checked={this.state.checked[0]}
            onPress={()=>{
              var checke=this.state.checked;
              checke[0]=! checke[0];
              checke[1]=false;
             checke[2]=false;
              this.setState({checked:checke})
              this.setState({answer:this.state.optien1})}}
          /></View>
           </View>
            <View style={{marginTop:10,alignItems:"center",flexDirection:"column",justifyContent:"center"}}>
            <View style={{flexDirection:"row"}}>
           <CheckBox
           
           checked={this.state.checked[1]}
           onPress={()=>{
            var checke=this.state.checked;
            checke[1]=! checke[1];
            checke[0]=false;
             checke[2]=false;
            this.setState({checked:checke})
            this.setState({answer:this.state.optien2})
        }}
          /></View>
           </View>
            <View style={{marginTop:10,alignItems:"center",flexDirection:"column",justifyContent:"center"}}>
            <View style={{flexDirection:"row"}}>
           <CheckBox
           
           checked={this.state.checked[2]}
           onPress={()=>{
             var checke=this.state.checked;
             checke[2]=! checke[2];
             checke[0]=false;
             checke[1]=false;
             this.setState({checked:checke})
             this.setState({answer:this.state.optien3})}}
          /></View>
            </View>
            
            <View style={{ flexDirection:"row",alignSelf:"center",marginBottom:20}}>
            <AwesomeButton type="secondary" disabled={this.state.disabled} backgroundColor='#fff' borderRadius={15} width={90} height={45} textSize={14} onPress={()=>{this.calc();
            this.setState({disabled:true})}} >
              confirm
            </AwesomeButton>
            
           
            </View>
        
          </ScrollView>
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
