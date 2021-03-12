import * as React from 'react';
import { View, Text, TouchableOpacity ,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AnimatedCircleBarComponent } from 'react-navigation-custom-bottom-tab-component/AnimatedCircleBarComponent';
import TabBar from "@mindinventory/react-native-tab-bar-interaction";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon }from  "react-native-elements"
import { createStackNavigator } from "@react-navigation/stack";
import testlogin from "./testlogin"
import Discuss from "./Discuss"
import TestC from "./Cours/TestC"
import Profile from "./Profile"
import TestLogicHome from "./TestLogic/TestLogicHome"
import Home from "./Cours/Home"
import { createDrawerNavigator } from '@react-navigation/drawer';

import Challenge from './Challenge';
const Stack = createStackNavigator();



function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor:"#fff",shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 3,
    shadowRadius: 4.65,
    paddingBottom:10
 
    }}>
      {state.routes.map((route, index) => {
        if(route.name !="drawer"){
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
          };  
          const handleIcon = ()=>{
            if(label==="Home"){
             
              return "home"
            }
            if(label==="Settings"){
              return "cog"
            }
          }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{  flex: 1,
        flexDirection: 'column',paddingBottom:10,paddingTop:10,borderTopColor: isFocused ? '#1078FC' : '#fff',borderTopWidth:5}}
          >
          
          <Icon
             name={label.toLowerCase()}
              type='font-awesome'
              size={30}
              color={ isFocused ? '#1078FC' : '#7B7881'}/>
           
          </TouchableOpacity>
        );
      }})}
    </View>
  );
}
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    
   
      <Tab.Navigator tabBar={props => 
       <MyTabBar {...props} /> }   initialRouteName="home" >
 
        <Tab.Screen name="code" component={TestC} screenOptions={{borderRadius:15}}  id={1} /> 
        <Tab.Screen name="puzzle-piece" component={TestLogicHome}  id={2}/>
        <Tab.Screen name="home" component={Home}  id={3}/>
        <Tab.Screen name="comments"  component={Discuss}  id={4}/>
       
        <Tab.Screen name="users" component={Challenge}  id={5}/>
      </Tab.Navigator>
  
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickimage:{
    width: 50,
    height: 50,
    borderRadius: 63,
    borderWidth: 7,
    borderColor: "white",
  }
});

