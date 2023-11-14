import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import FormData from 'form-data';
import auth from '@react-native-firebase/auth';
import { useGetAuthQuery } from '../../store/apiSlice';

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get('window');

const NewPostScreen = ({ navigation }) => {
    const [currentUser, setCurrentUser] = useState([]);

    const [newPost, setNewPost] = useState('');
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    const useremail = currentUser.email;
    const { data, error, isLoading } = useGetAuthQuery(useremail);

    useEffect(() => {
        setCurrentUser(auth().currentUser);
    }, [currentUser]);

    const uploadImage = async () => {
        // 권한 확인 코드: 권한이 없을 경우 물어보고, 승인하지 않을 경우 코드를 종료함
        if (!status?.granted) {
            const premission = await requestPermission();
            if (!premission.granted) {
                return null;
            }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            aspect: [1, 1],
        });

        if (result.canceled) {
            return null; //이미지 업로드를 취소한 경우
        }

        setImageUrl(result.assets[0].uri);
        // 이미지 업로드 결과 및 이미지 경로 업데이트
    };

    const uploadServer = async () => {
        // 텍스트 및 이미지 데이터를 포함한 FormData 생성
        const formData = new FormData();

        // if (newPost) {
        // 글 데이터가 있을 경우만 추가
        formData.append('text', newPost);
        formData.append('QnA', toggleCheckBox);
        // }

        if (imageUrl) {
            // 이미지 데이터가 있을 경우만 추가
            const localUri = imageUrl;
            formData.append('post_image', {
                name: new Date() + '_post_image',
                uri: localUri,
                type: 'image/jpeg',
            });
        }

        formData.append('user_id', data?.data._id);
        formData.append('useremail', data?.data.useremail);
        formData.append('username', data?.data.username);
        formData.append('user_img', data?.data.userimg);

        // 서버에 데이터 전송
        await axios({
            method: 'post',
            url: 'http://localhost:3000/posts/upload-posts',
            headers: {
                'content-type': 'multipart/form-data',
            },
            data: formData,
        });

        // 업로드 후 초기화
        setImageUrl('');
        setNewPost('');
        navigation.navigate('MainTab', { screen: 'Main' });
    };

    return (
        <Container>
            <SaveBtn onPress={uploadServer}>
                <SaveText> 저장 </SaveText>
            </SaveBtn>
            <NewPostInputBox>
                <ImageContainer onPress={uploadImage}>
                    <PreviewBox>
                        {imageUrl ? (
                            <PreviewImg source={{ uri: imageUrl }} />
                        ) : (
                            <Ionicons name="ios-camera" size={30} color="#6b8a47" />
                        )}
                    </PreviewBox>
                </ImageContainer>
                <NewPostInput
                    value={newPost}
                    placeholder="내용을 입력해 주세요."
                    placeholderTextColor="gray"
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={300}
                    multiline={true}
                    returnKeyType="search"
                    onChangeText={(text) => setNewPost(text)}
                />
            </NewPostInputBox>
            <NewPostSelectBox>
                {toggleCheckBox ? (
                    <QnACheckText> 질문 있습니다! </QnACheckText>
                ) : (
                    <QnACheckText> 자랑하고 싶어요! </QnACheckText>
                )}
                <QnACheckInput
                    disabled={false}
                    value={toggleCheckBox}
                    tintColor={'#a7c585'}
                    onCheckColor={'#6b8a47'}
                    onTintColor={'#6b8a47'}
                    lineWidth={1.8}
                    animationDuration={0.3}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
            </NewPostSelectBox>
        </Container>
    );
};
// 6b8a47
// a7c585

const Container = styled.View`
    flex: 1;
    background-color: white;
    padding: 5px 25px;
`;

const SaveBtn = styled.TouchableOpacity`
    align-items: flex-end;
    margin: 10px 5px;
`;

const SaveText = styled.Text`
    font-size: 16px;
    font-weight: 700;
    color: #6b8a47;
`;

const NewPostInputBox = styled.View`
    flex-direction: row;
    justify-content: space-between;
    background-color: rgb(234, 234, 234);
    height: ${SCREENHEIGHT / 3.8}px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    position: relative;
    padding: 0px 10px;
    padding-top: 10px;
`;

const ImageContainer = styled.TouchableOpacity`
    background-color: rgba(189, 189, 189, 0.5);
    width: 40%;
    aspect-ratio: 0.65;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
`;

const PreviewBox = styled.View``;

const PreviewImg = styled.Image`
    width: 100%;
    aspect-ratio: 0.65;
    border-radius: 4px;
`;

const NewPostInput = styled.TextInput`
    width: 55%;
    margin: 10px 0px;
`;

const NewPostSelectBox = styled.View`
    background-color: yellowgreen;
    background-color: rgb(234, 234, 234);
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 10px;
    height: 55px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`;

const QnACheckText = styled.Text`
    font-size: 17px;
    font-weight: 500;
    color: #8c8c8c;
`;

const QnACheckInput = styled(CheckBox)``;

export default NewPostScreen;
