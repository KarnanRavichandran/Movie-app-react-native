import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from '../screens'; // Import your screen components
import { COLORS, icons } from '../constants';
import { TabIcon } from '../components';


const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                backgroundColor: COLORS.black,
                position:"absolute",
                bottom:0,
                left:0,
                right:0,
                elevation:0,
                borderTopColor:"transparent",
                height:100
          // Other styles for the entire tab bar
        },
            }}
           
        >
            <Tab.Screen name='Home' component={Home} options={{
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={icons.home} />
                )
            }} />

            {/* Replace "Home" with the actual component for the "Play" tab */}
            <Tab.Screen name='Play' component={Home} options={{
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={icons.play_button} />
                )
            }} />

            {/* Replace "Home" with the actual component for the "Search" tab */}
            <Tab.Screen name='Search' component={Home} options={{
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={icons.search} />
                )
            }} />

            {/* Replace "Home" with the actual component for the "Profile" tab */}
            <Tab.Screen name='Profile' component={Home} options={{
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={icons.profile} />
                )
            }} />
        </Tab.Navigator>
    );
}

export default Tabs;
