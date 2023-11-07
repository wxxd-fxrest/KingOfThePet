import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewPostScreen from '../screens/newpost/NewPostScreen';
import NewDiaryScreen from '../screens/newpost/NewDiaryScreen';

const Tab = createMaterialTopTabNavigator();

const NewPostStack = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#6b8a47',
                tabBarInactiveTintColor: '#a7c585',
                tabBarStyle: {
                    backgroundColor: 'white',
                },
                tabBarLabelStyle: {
                    textAlign: 'center',
                    fontSize: 15,
                },
                tabBarIndicatorStyle: {
                    borderBottomColor: '#6b8a47',
                    borderBottomWidth: 2.5,
                    width: 100,
                    left: 55,
                },
            }}
        >
            <Tab.Screen
                name="NewPost"
                component={NewPostScreen}
                options={{
                    title: '게시글',
                }}
            />
            <Tab.Screen
                name="NewDiary"
                component={NewDiaryScreen}
                options={{
                    title: '일기',
                }}
            />
        </Tab.Navigator>
    );
};

export default NewPostStack;
