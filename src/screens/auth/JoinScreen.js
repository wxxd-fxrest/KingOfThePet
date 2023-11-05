import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator, Alert } from 'react-native';
import { useCreateAuthMutation } from '../../store/apiSlice';

const JoinScreen = ({ navigation }) => {
    const [createAuth, { data, isLoading, error }] = useCreateAuthMutation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const passwordInput = useRef();

    const onSubmitEmailEditing = () => {
        passwordInput.current.focus();
    };

    let useremail;
    let username;

    const onSubmitPasswordEditing = async () => {
        if (email === '' || password === '') {
            return Alert.alert('Fill in the form.');
        }

        if (loading) {
            return;
        }

        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            useremail = userCredential.user.email;
            username = userCredential.user.email.split('@')[0];
            const result = createAuth({
                useremail,
                username,
                userimg: '',
            });

            console.log('회원가입 및 데이터 저장이 성공하였습니다.');
        } catch (e) {
            switch (e.code) {
                case 'auth/user-not-found' || 'auth/wrong-password':
                    return Alert.alert('이메일 혹은 비밀번호가 일치하지 않습니다.', [
                        {
                            text: '확인',
                            onPress: () => setLoading(false),
                        },
                    ]);
                case 'auth/email-already-in-use':
                    return Alert.alert('이미 사용 중인 이메일입니다.', [
                        {
                            text: '확인',
                            onPress: () => setLoading(false),
                        },
                    ]);
                case 'auth/weak-password':
                    return Alert.alert('비밀번호는 6글자 이상이어야 합니다.', [
                        {
                            text: '확인',
                            onPress: () => setLoading(false),
                        },
                    ]);
                case 'auth/network-request-failed':
                    return Alert.alert('네트워크 연결에 실패 하였습니다.', [
                        {
                            text: '확인',
                            onPress: () => setLoading(false),
                        },
                    ]);
                case 'auth/invalid-email':
                    return Alert.alert('잘못된 이메일 형식입니다.', [
                        {
                            text: '확인',
                            onPress: () => setLoading(false),
                        },
                    ]);
                case 'auth/internal-error':
                    return Alert.alert('잘못된 요청입니다.', [
                        {
                            text: '확인',
                            onPress: () => setLoading(false),
                        },
                    ]);
                default:
                    return Alert.alert('로그인에 실패 하였습니다.', [
                        {
                            text: '확인',
                            onPress: () => setLoading(false),
                        },
                    ]);
            }
        }
    };

    return (
        <Container>
            <TextInput
                value={email}
                placeholder="email"
                placeholderTextColor="grey"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={onSubmitEmailEditing}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                value={password}
                ref={passwordInput}
                placeholder="password"
                placeholderTextColor="grey"
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={onSubmitPasswordEditing}
                onChangeText={(text) => setPassword(text)}
            />
            <Button onPress={onSubmitPasswordEditing}>
                {loading ? <ActivityIndicator color="white" /> : <ButtonText> Jogin </ButtonText>}
            </Button>

            <SwitchBox>
                <Text>Do you own an account?</Text>
                <NextButton onPress={() => navigation.navigate('Login')}>
                    <NextButtonText> Loin </NextButtonText>
                </NextButton>
            </SwitchBox>
        </Container>
    );
};

const Container = styled.View`
    background-color: white;
    flex: 1;
    align-items: center;
    color: white;
    padding: 60px 20px;
`;

const TextInput = styled.TextInput`
    border: solid 1px #6b8a47;
    width: 100%;
    padding: 10px 20px;
    border-radius: 20px;
    margin-bottom: 10px;
    font-size: 16px;
    color: black;
`;

const Button = styled.TouchableOpacity`
    width: 100%;
    padding: 10px 20px;
    border-width: 1px;
    border-radius: 20px;
    border-color: #6b8a47;
    justify-content: center;
    align-items: center;
    background-color: #6b8a47;
`;

const ButtonText = styled.Text`
    font-size: 16px;
    color: white;
`;

const SwitchBox = styled.View`
    flex-direction: row;
    width: 100%;
    padding: 20px 0px;
    justify-content: space-between;
    align-items: center;
`;

const Text = styled.Text`
    font-size: 16px;
    text-align: center;
    color: black;
`;

const NextButton = styled.TouchableOpacity`
    width: 35%;
    padding: 10px 20px;
    border-width: 1px;
    border-radius: 20px;
    border-color: #6b8a47;
    background-color: #6b8a47;
    justify-content: center;
    align-items: center;
`;

const NextButtonText = styled.Text`
    color: white;
    font-size: 16px;
`;

export default JoinScreen;
