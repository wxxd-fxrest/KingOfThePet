import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components";
import { MaterialIcons } from '@expo/vector-icons'; 
import NewPostStack from "./NewPostStack";

const Stack = createNativeStackNavigator();

const MainStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="NewPostStack" component={NewPostStack}
                options={{
                    title: '포스트 작성',
                    headerShown: true,
                    headerShadowVisible: false, 
                    headerLeft: () => (
                        <SetupButton>
                            <MaterialIcons name="arrow-back-ios" size={25} color="gray" onPress={() => navigation.goBack()}/>
                        </SetupButton>
                    )
                }}
            />
        </Stack.Navigator>
    )   
};

const SetupButton = styled.TouchableOpacity`
    margin-right: 20px;
`;

export default MainStack;