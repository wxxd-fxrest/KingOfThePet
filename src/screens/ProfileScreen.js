import React from "react";
import styled from "styled-components";
import auth from '@react-native-firebase/auth';
import { Alert } from "react-native";

const ProfileScreen = () => {
    const onLogOut = () => {
        Alert.alert(
            'Log Out',
            '정말로 로그아웃하시겠습니까?',
            [
                {
                    text: "No",
                    onPress: () => console.log("no"),
                    style: "destructive"
                },
                {
                    text: "Yes",
                    onPress: () => auth().signOut(),
                },
            ],
            {
                cancelable: true,
            },
        );
    };

    return (
        <Container>
            <LogoutButton onPress={onLogOut}>
                <LogoutButtonText> 로그아웃 </LogoutButtonText>
            </LogoutButton>
        </Container>
    )
};

const Container = styled.View`
    flex: 1;
`;

const LogoutButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 45px 0px;
`;

const LogoutButtonText = styled.Text`
    color: red;
    padding: 5px 5px;
    font-weight: 800;
`;

export default ProfileScreen; 