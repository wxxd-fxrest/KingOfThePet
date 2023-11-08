import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import UserImg from '../assets/user.png';
import ProfileStack from '../navigations/ProfileStack';

const ProfileScreen = () => {
    const [currentUser, setCurrentUser] = useState([]);
    const useremail = currentUser.email;

    useEffect(() => {
        setCurrentUser(auth().currentUser);
    }, [currentUser]);

    // 프로필 내부 레이아웃 및 diary데이터 바인딩

    const onLogOut = () => {
        Alert.alert(
            'Log Out',
            '정말로 로그아웃하시겠습니까?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('no'),
                    style: 'destructive',
                },
                {
                    text: 'Yes',
                    onPress: () => auth().signOut(),
                },
            ],
            {
                cancelable: true,
            }
        );
    };

    return (
        <Container>
            <ProfileImageBox>
                <ProfileImage source={UserImg} />
            </ProfileImageBox>
            <LogoutButton onPress={onLogOut}>
                <LogoutButtonText> 로그아웃 </LogoutButtonText>
            </LogoutButton>
            <ProfileStack useremail={useremail} />
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    background-color: white;
`;

const ProfileImageBox = styled.View`
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const ProfileImage = styled.Image`
    background-color: gray;
    width: 100px;
    height: 100px;
    border-radius: 100px;
`;

const LogoutButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 45px 0px;
    position: absolute;
    top: -30px;
    right: 0px;
`;

const LogoutButtonText = styled.Text`
    color: red;
    padding: 5px 5px;
    font-weight: 800;
`;

export default ProfileScreen;
