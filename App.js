import * as React from 'react';
import { View, Text, TouchableOpacity ,StyleSheet,Image} from 'react-native';
import { Vibration } from "react-native";  
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon }from  "react-native-elements"
import { createStackNavigator,TransitionPresets } from "@react-navigation/stack";
import { createDrawerNavigator,DrawerNavigatorItems } from '@react-navigation/drawer';
import {  DrawerActions } from '@react-navigation/native';
import testlogin from "./Components/testlogin"
import DrawerMain from "./Components/Drawer"
import MyApp from "./Components/MyApp"
import register from "./Components/register"
import { navigationRef } from "./Components/Utils/RootNavigation";
import TestInfos from "./Components/TestLogic/TestInfos"
import TestCours from "./Components/Cours/TestCous"
import TechResult from "./Components/Cours/TechResult"
import TestPage from "./Components/TestLogic/TestPage"
import initProfile from './Components/initProfile'
import UserController from './Components/Controller/UserController'
import UserProfile from './Components/UserProfile'
import TestLevels from "./Components/TestLogic/TestLesvels"
import Lessons from './Components/Cours/Lessons'
import Header from "./Components/Header"
import Fire from './Components/Dao/Fire';
import TestResult from "./Components/TestLogic/TestResult";
import Result from "./Components/Cours/Result";
import UpdateProfile from './Components/UpdateProfile'
import Comment from "./Components/Comments"
import QuestCours from './Components/Cours/QuestCours';
import TestOf from "./Components/Cours/TestOf"
import Quiz from "./Components/itemQuiz"
import ChallengeChoice from "./Components/ChallengeChoice"
import TestChallenge from "./Components/TestChallenge"
import  CustomSidebarMenu from "./Components/CustimeSideBar"
import Profile from "./Components/Profile"
import * as RootNavigation from "./Components/Utils/RootNavigation";
import { Notifications } from 'expo';
const Stack = createStackNavigator();




const MyTheme = {
  dark: true,
  colors: {
    background: "#6D6D6D"
  }
};
function LogoTitle() {
  return (
    <View style={{ alignContent:"center" }}>
    <Image
      style={{ width: 60, height: 60,marginBottom:5,alignSelf:"center" }}
      source={{uri:"https://i.ibb.co/2KPxGQc/brain-removebg-preview.png"}}
    />
    </View>
  );
}
function returnPropic(){
  return Fire.shared.user.image
}
const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
  
          <Drawer.Navigator    drawerContent={props => <CustomSidebarMenu {...props} />}  initialRouteName='Home'>
            <Drawer.Screen name="Home" component={MyStack} />
           
        <Drawer.Screen name="Signout" component={testlogin} />
        
        </Drawer.Navigator>
   
  );
}
function MyStack({navigation}) {
  
 
  return (
    <Stack.Navigator theme={MyTheme} 
   >
     
      <Stack.Screen
        name="testlogin"
        component={testlogin}
        options={{ headerShown: false,drawerLockMode: 'locked-close'}}      
      />
       <Stack.Screen
        name="App"
        component={MyApp}
        options={{
          headerShown: true ,
             headerTitle: props => <LogoTitle {...props} />,
             headerStyle: {
              
             },
             headerTitleAlign:"center",
             headerLeft: (props) => (
               <TouchableOpacity
                onPress={() => navigation.openDrawer()}
               >
                  
               <Image style={styles.pickimage} source={{ uri: returnPropic() }}  />
               </TouchableOpacity>
             ),
           }}
      />
       <Stack.Screen
        name="Register"
        component={register}
        options={{ headerShown: false ,  drawerLockMode: 'locked-close'}}
      />
       <Stack.Screen   
        name="TestInfos"
        component={TestInfos}
        options={{
          headerShown: true ,
             headerTitle: props => <LogoTitle {...props} />,
             headerStyle: {
              
             },
             headerTitleAlign:"center",
             headerLeft: () => (
               <TouchableOpacity
               onPress={() => navigation.openDrawer()}
               >
                <Image style={styles.pickimage} source={{ uri:Fire.shared.user.image }}  />
               </TouchableOpacity>
             )
           }}
      />  
    <Stack.Screen       
         name="TestChallenge"
         component={TestChallenge}
         options={{
           headerShown: true ,
              headerTitle: props => <LogoTitle {...props} />,
              headerStyle: {
               
              },
              headerTitleAlign:"center",
              headerLeft: () => (
                <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                >
                 <Image style={styles.pickimage} source={{ uri:Fire.shared.user.image }}  />
                </TouchableOpacity>
              )
            }}
       />
          <Stack.Screen       
         name="userprofile"
         component={UserProfile}
         options={{
           headerShown: true ,
              headerTitle: props => <LogoTitle {...props} />,
              headerStyle: {
               
              },
              headerTitleAlign:"center",
              headerLeft: () => (
                <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                >
                 <Image style={styles.pickimage} source={{ uri:Fire.shared.user.image }}  />
                </TouchableOpacity>
              )
            }}
       />
         <Stack.Screen       
         name="Profile"
         component={Profile}
         options={{
           headerShown: true ,
              headerTitle: props => <LogoTitle {...props} />,
              headerStyle: {
               
              },
              headerTitleAlign:"center",
              headerLeft: () => (
                <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                >
                 <Image style={styles.pickimage} source={{ uri:Fire.shared.user.image }}  />
                </TouchableOpacity>
              )
            }}
       />
       <Stack.Screen   
        name="challengechoice"
        component={ChallengeChoice}
        options={{
          headerShown: true ,
             headerTitle: props => <LogoTitle {...props} />,
             headerStyle: {
              
             },
             headerTitleAlign:"center",
             headerLeft: () => (
               <TouchableOpacity
               onPress={() => navigation.openDrawer()}
               >
                <Image style={styles.pickimage} source={{ uri:Fire.shared.user.image }}  />
               </TouchableOpacity>
             )
           }}
      />
          <Stack.Screen       
         name="Quiz"
         component={Quiz}
         options={{
           headerShown: true ,
              headerTitle: props => <LogoTitle {...props} />,
              headerStyle: {
               
              },
              headerTitleAlign:"center",
              headerLeft: () => (
                <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                >
                 <Image style={styles.pickimage} source={{ uri:Fire.shared.user.image }}  />
                </TouchableOpacity>
              )
            }}
       />
        <Stack.Screen       
         name="UpdateProfile"
         component={UpdateProfile}
         options={{
           headerShown: true ,
              headerTitle: props => <LogoTitle {...props} />,
              headerStyle: {
               
              },
              headerTitleAlign:"center",
              headerLeft: () => (
                <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                >
                 <Image style={styles.pickimage} source={{ uri:Fire.shared.user.image }}  />
                </TouchableOpacity>
              )
            }}
       />
       <Stack.Screen
         
        
         name="TechResult"
         component={TechResult}
         options={{
           headerShown: true ,
              headerTitle: props =><View style={{marginBottom:40}}></View>,
              headerStyle: {
               
              },
              headerTitleAlign:"center",
             
              gestureEnabled: true,
              cardOverlayEnabled: true,
              ...TransitionPresets.ModalPresentationIOS,
            }}
       />
       <Stack.Screen
        name="TestResult"
        component={TestResult}
        options={{
          headerShown: true ,
             headerTitle: props => <LogoTitle {...props} />,
             headerStyle: {
              
             },
             headerTitleAlign:"center",
             headerLeft: () => (
               <TouchableOpacity
               onPress={() => navigation.openDrawer()}
               >
                
                <Image style={styles.pickimage} source={{ uri:Fire.shared.user.image }}  />
               </TouchableOpacity>
             ),
           }}
      />
       <Stack.Screen
        name="Result"
        component={Result}
        options={{
          headerShown: true ,
             headerTitle: props => <LogoTitle {...props} />,
             headerStyle: {
              
             },
             headerTitleAlign:"center",
             headerLeft: () => (
               <TouchableOpacity
               onPress={() => navigation.openDrawer()}
               >
                
                <Image style={styles.pickimage} source={{ uri:Fire.shared.user.image }}  />
               </TouchableOpacity>
             ),
           }}
      />
       <Stack.Screen
        name="testcours"
        component={TestCours}
        options={{
          headerShown: true ,
             headerTitle: props => <LogoTitle {...props} />,
             headerStyle: {
              
             },
             headerTitleAlign:"center",
             headerLeft: () => (
               <TouchableOpacity
               onPress={() => navigation.openDrawer()}
               >
                <Image style={styles.pickimage} source={{ uri:Fire.shared.user.image }}  />
               </TouchableOpacity>
             ),
           }}
      />
        <Stack.Screen
        name="TestOf"
        component={TestOf}
        options={{
          headerShown: true ,
             headerTitle: props => <LogoTitle {...props} />,
             headerStyle: {
              
             },
             headerTitleAlign:"center",
             headerLeft: () => (
               <TouchableOpacity
               onPress={() => navigation.openDrawer()}
               >
                <Image style={styles.pickimage} source={{ uri:Fire.shared.user.image }}  />
               </TouchableOpacity>
             ),
           }}
      />
       <Stack.Screen
        name="questCours"
        component={QuestCours}
        options={{
          headerShown: true ,
             headerTitle: props => <LogoTitle {...props} />,
             headerStyle: {
              
             },
             headerTitleAlign:"center",
             headerLeft: () => (
               <TouchableOpacity
               onPress={() => navigation.openDrawer()}
               >
                <Image style={styles.pickimage} source={{ uri:Fire.shared.user.image }}  />
               </TouchableOpacity>
             ),
           }}
      />
      
      <Stack.Screen
        name="TestPage"
        component={TestPage}
        options={{
          headerShown: true ,
             headerTitle: props => <LogoTitle {...props} />,
             headerStyle: {
             
             },
             headerTitleAlign:"center",
             headerLeft: () => (
               <TouchableOpacity
               onPress={() => navigation.openDrawer()}
               >
                <Image style={styles.pickimage} source={{ uri: Fire.shared.user.image }}  />
               </TouchableOpacity>
             ),
           }}
      />
       <Stack.Screen
        name="lessons"
        component={Lessons}
        options={{
          headerShown: true ,
             headerTitle: props => <LogoTitle {...props} />,
             headerStyle: {
              
             },
             headerTitleAlign:"center",
             headerLeft: () => (
               <TouchableOpacity
               onPress={() => navigation.openDrawer()}
               >
                <Image style={styles.pickimage} source={{ uri:Fire.shared.user.image }}  />
               </TouchableOpacity>
             ),
           }}
      />
       <Stack.Screen
        name="TestLevels"
        component={TestLevels}
        options={{
          headerShown: true ,
          headerTitleAlign:"center",
             headerTitle: props => <LogoTitle {...props} />,
             headerStyle: {
            
             },
             headerLeft: () => (
               <TouchableOpacity
               onPress={() => navigation.openDrawer()}
               >
                <Image style={styles.pickimage} source={{ uri: Fire.shared.user.image }}  />
               </TouchableOpacity>
             ),
           }}
      />
          <Stack.Screen
        name="comment"
        component={Comment}
        options={{
          headerShown: true ,
          headerTitleAlign:"center",
             headerTitle: props => <LogoTitle {...props} />,
             headerStyle: {
            
             },
             headerLeft: () => (
               <TouchableOpacity
               onPress={() => navigation.openDrawer()}
               >
                <Image style={styles.pickimage} source={{ uri: Fire.shared.user.image }}  />
               </TouchableOpacity>
             ),
           }}
      />
       <Stack.Screen
        name="initProfile"
        component={initProfile}
        options={{ headerShown: false }}
      />
  
  
          
    </Stack.Navigator>
  );
}


  const CustomDrawer = props => {
  
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Header/>
        <DrawerNavigatorItems {...props} />
      </View>
    );
  };
export default function App() {
    return (
      <NavigationContainer ref={navigationRef}>
    
          <MyDrawer  />
          
          
      </NavigationContainer>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    
    },
    item: {
      backgroundColor: '#000',
    
  
    },
    title: {
      fontSize: 32,
    },
    pickimage: {
      width: 35,
      height: 35,
      marginLeft:5,
      marginBottom:5,
      borderRadius: 63,
      borderWidth: 2,
      borderColor: "#7B7881",
 
    },
  });