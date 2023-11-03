import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewPostScreen from '../screens/newpost/NewPostScreen';
import NewDiaryScreen from '../screens/newpost/NewDiaryScreen';

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get('window');

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

const Container = styled.View`
    flex: 1;
    background-color: white;
    padding: 25px;
`;

const NewPostInputBox = styled.View`
    background-color: rgb(234, 234, 234);
    height: ${SCREENHEIGHT / 3.5}px;
    padding-bottom: 55px;
    border-radius: 15px;
    position: relative;
`;

const NewPostInput = styled.TextInput`
    /* background-color: yellowgreen; */
    padding: 20px;
`;

const NewPostFooterBox = styled.View`
    /* background-color: yellow; */
    position: absolute;
    bottom: 10px;
    width: 100%;
    padding: 0px 20px;
    align-items: flex-end;
`;

const ImgSelectIconBox = styled.TouchableOpacity`
    /* background-color: aqua; */
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
`;

export default NewPostStack;
