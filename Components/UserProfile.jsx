import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  FlatList
} from 'react-native';
import { Divider } from 'react-native-elements';
import { Icon  }from  "react-native-elements"
import firebase from "firebase"; // 4.8.1
import Item from "./Utils/myItem"
import Fire from './Dao/Fire';
import FirePosts from './Dao/FirePosts'
HEADER_MAX_HEIGHT = 120;
HEADER_MIN_HEIGHT = 70;
PROFILE_IMAGE_MAX_HEIGHT = 80;
PROFILE_IMAGE_MIN_HEIGHT = 40;
var ii=0;
var demo=[];
var quiz=[];
var mylist=[]
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      list:[],
      date:"",
      user:{}
    };
  }
  UNSAFE_componentWillMount(){
      
     //var todayTime = new Date(firebase.auth().currentUser.metadata.creationTime);
     
     
      this.setState({user: Fire.shared.getUserData(this.props.route.params.uid)})
      
    firebase.database().ref("PostList").orderByChild("owner").equalTo(this.props.route.params.uid).on("value", (snapshot) => { 
      demo=[]
   
      snapshot.forEach((childSnapshot)=> {
        
        var childData = childSnapshot.val();
       
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
        
       
       
    })
    firebase.database().ref("QuizList").orderByChild("owner").equalTo(this.props.route.params.uid).on("value", (snapshot) => { 
    
      quiz=[]
      snapshot.forEach((childSnapshot)=> {
        var childData = childSnapshot.val();
          quiz.push({
             
              id:childData.id,
              owner: childData.owner,
              imguser:childData.imguser,
              title:childData.title,
              username:childData.username ,
              date:childData.date,
              obj:childData.obj,
              post:false,
              questions:childData.questions
            }); 
         
        })
      
      
          mylist=demo.concat(quiz);
         
          mylist=mylist.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        
     
       // data=Array.from(new Set(data))
      // console.log("short")
      
    })

    
  
    mylist=mylist.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      this.state.list=mylist;
     
  }
 
  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });
    const profileImageHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
      extrapolate: 'clamp'
    });

    const profileImageMarginTop = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [
        HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
        HEADER_MAX_HEIGHT + 5
      ],
      extrapolate: 'clamp'
    });
    const headerZindex = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
      outputRange: [0, 0, 1000],
      extrapolate: 'clamp'
    });

    const headerTitleBottom = this.state.scrollY.interpolate({
      inputRange: [
        0,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
        HEADER_MAX_HEIGHT -
          HEADER_MIN_HEIGHT +
          5 +
          PROFILE_IMAGE_MIN_HEIGHT +
          26
      ],
      outputRange: [-20, -20, -20, 0],
      extrapolate: 'clamp'
    });

    return (
      <View style={{ flex: 1,backgroundColor:"white" }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#1078FC',
            height: headerHeight,
            zIndex: headerZindex,
            elevation: headerZindex, //required for android
            alignItems: 'center'
          }}
        >
          <Animated.View
            style={{ position: 'absolute', bottom: headerTitleBottom }}
          >
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
            {this.state.user.fname+' '+this.state.user.lname}
            </Text>
          </Animated.View>
        </Animated.View>

        <ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}
        >
          <Animated.View
            style={{
              height: profileImageHeight,
              width: profileImageHeight,
              borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
              borderColor: 'white',
              borderWidth: 3,
              overflow: 'hidden',
              marginTop: profileImageMarginTop,
              marginLeft: 10
            }}
          >
            <Image
              source={{uri:this.state.user.image}
            }
              style={{ flex: 1, width: null, height: null }}
            />
          </Animated.View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 26, paddingLeft: 10 }}>
            {this.state.user.fname+' '+this.state.user.lname}
            </Text>
          </View>
          <View style={{flexDirection:"row",marginTop:30}}>
          <Icon
             name={"birthday-cake"}
              type='font-awesome'
              size={15}
              style={{marginLeft:30}}
              color= '#1078FC'/>
            <Text style={{ fontWeight: '200', fontSize: 12, paddingLeft: 10 ,color:"#6D6D6D"}}>
            Birthday :{new Date(this.state.user.date).toLocaleDateString()}
            </Text>
            </View>
            
          
          <FlatList
        keyExtractor={item => item.id}
       style={{backgroundColor:"#F0F0F0",marginTop:50}}
        data={this.state.list}
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
          title={item.title} 
          quizobj={item.obj}
          data={item.questions}
          />)} 
      
      
      />
          <View style={{ height: 400 ,backgroundColor:"#fff"}} />
          
        </ScrollView>
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});