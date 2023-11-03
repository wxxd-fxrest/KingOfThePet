import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import NewPostStack from './NewPostStack';

const Stack = createNativeStackNavigator();

const MainStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="NewPostStack"
                component={NewPostStack}
                options={{
                    title: '포스트 작성',
                    headerShown: true,
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <BackButton>
                            <MaterialIcons
                                name="arrow-back-ios"
                                size={25}
                                color="#6b8a47"
                                onPress={() => navigation.goBack()}
                            />
                        </BackButton>
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

const BackButton = styled.TouchableOpacity`
    margin-right: 20px;
`;

export default MainStack;
