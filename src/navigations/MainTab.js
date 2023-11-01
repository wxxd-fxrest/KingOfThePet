import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainScreen from '../screens/MainScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#6b8a47',
                tabBarInactiveTintColor: '#a7c585',
            }}
        >
            <Tab.Screen
                name="Main"
                component={MainScreen}
                options={{
                    title: '홈',
                    headerShown: true,
                    headerShadowVisible: false,
                    tabBarIcon: ({ focused, size }) => {
                        return (
                            <Fontisto
                                name="island"
                                size={size}
                                color={focused ? '#6b8a47' : '#a7c585'}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="MyProfile"
                component={ProfileScreen}
                options={{
                    title: '프로필',
                    showLable: false,
                    tabBarIcon: ({ focused, size }) => {
                        return (
                            <MaterialCommunityIcons
                                name="dog"
                                size={size}
                                color={focused ? '#6b8a47' : '#a7c585'}
                            />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};

const SetupButton = styled.TouchableOpacity`
    margin-right: 20px;
`;

export default MainTab;
