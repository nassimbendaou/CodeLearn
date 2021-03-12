import { AnimatedCircleBarComponent } from 'react-navigation-custom-bottom-tab-component/AnimatedCircleBarComponent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Discuss from "./Discuss"
import TestC from "./Cours/TestC"
import TestLogicHome from "./TestLogic/TestLogicHome"
import Home from "./Cours/Home"
import Challenge from "./Challenge"


import React, { Component } from 'react'
import { Text, View } from 'react-native'

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    
   
      <Tab.Navigator tabBar={props => <AnimatedCircleBarComponent {...props} />}  initialRouteName="home" >
 
        <Tab.Screen name="code" component={TestC}  id={1} /> 
        <Tab.Screen name="puzzle-piece" component={TestLogicHome}  id={2}/>
        <Tab.Screen name="home" component={Home}  id={3}/>
        <Tab.Screen name="comments"  component={Discuss}  id={4}/>
       
        <Tab.Screen name="users" component={Challenge}  id={5}/>
      </Tab.Navigator>
  
  );
}