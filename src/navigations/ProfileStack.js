import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DiaryScreen from '../screens/profile/DiaryScreen';
import ProfilePostScreen from '../screens/profile/ProfilePostScreen';

const Tab = createMaterialTopTabNavigator();

const ProfileStack = ({ useremail }) => {
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
                name="Post"
                children={() => <ProfilePostScreen useremail={useremail} />}
                options={{
                    title: '게시글',
                }}
            />
            <Tab.Screen
                name="Diary"
                children={() => <DiaryScreen useremail={useremail} />}
                options={{
                    title: '일기',
                }}
            />
        </Tab.Navigator>
    );
};

export default ProfileStack;
