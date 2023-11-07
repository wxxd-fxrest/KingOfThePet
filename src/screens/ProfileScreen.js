import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { useGetAuthQuery } from '../store/apiSlice';
import UserImg from '../assets/user.png';

const ProfileScreen = () => {
    const [currentUser, setCurrentUser] = useState([]);

    const useremail = currentUser.email;
    const { data, error, isLoading } = useGetAuthQuery(useremail);
    console.log(data?.data);

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
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    background-color: white;
`;

const ProfileImageBox = styled.View`
    width: 100px;
    height: 100px;
`;

const ProfileImage = styled.Image`
    width: 50px;
    height: 50px;
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
