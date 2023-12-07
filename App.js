import { View, Text } from 'react-native'
import React from 'react'
import { MovieDetail } from './screens'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';
const Stack = createNativeStackNavigator();


const App = () => {
  return (
   <NavigationContainer>
<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Stack.Screen name='HomeStack' component={Tabs} />
      <Stack.Screen name='MovieDetail' component={MovieDetail} />
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default App;