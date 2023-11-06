import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Fontisto } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllScreen from './main/AllScreen';
import QnAScreen from './main/QnAScreen';
import FollowScreen from './main/FollowScreen';
import auth from '@react-native-firebase/auth';
import { AntDesign } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

const MainScreen = ({ navigation }) => {
    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {
        setCurrentUser(auth().currentUser);
    }, [currentUser]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Fontisto name="island" size={25} color="#6b8a47" />,
            headerRight: () => (
                <SetupButton onPress={() => navigation.navigate('MainStack', { screen: 'NewPostStack' })}>
                    <AntDesign name="plus" size={30} color="#6b8a47" />
                </SetupButton>
            ),
        });
    }, [navigation]);

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
                    width: 70,
                    left: 35,
                },
            }}
        >
            <Tab.Screen
                name="All"
                children={() => <AllScreen currentUser={currentUser} />}
                options={{
                    title: '전체',
                    unmountOnBlur: true,
                }}
            />
            <Tab.Screen
                name="QnA"
                component={QnAScreen}
                options={{
                    title: '질문',
                    unmountOnBlur: true,
                }}
            />
            <Tab.Screen
                name="Follow"
                component={FollowScreen}
                options={{
                    title: '구독',
                }}
            />
        </Tab.Navigator>
    );
};

const SetupButton = styled.TouchableOpacity`
    margin-right: 20px;
`;

export default MainScreen;
