import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';
import * as ImagePicker from 'expo-image-picker';
import { useCreatePostMutation } from '../../store/apiSlice';
import axios from 'axios';
import FormData from 'form-data';

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get('window');

const NewPostScreen = () => {
    const [newPost, setNewPost] = useState('');
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [createPost, { data, isLoading, error }] = useCreatePostMutation();

    const [imageUrl, setImageUrl] = useState('');
    const [status, requestPermission] =
        ImagePicker.useMediaLibraryPermissions();

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

        console.log(result);
        setImageUrl(result.assets[0].uri);
        // 이미지 업로드 결과 및 이미지 경로 업데이트

        // 서버에 요청
        const localUri = result.assets[0].uri;
        const filename = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename ?? '');
        const type = match ? `image/${match[1]}` : `image`;
        const formData = new FormData();
        formData.append('profile_img', { uri: localUri, name: filename, type });

        await axios({
            method: 'post',
            url: 'http://localhost:3000/posts/upload',
            headers: {
                'content-type': 'multipart/form-data',
            },
            data: formData,
        });
    };

    // const pickImage = async () => {
    //     const result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: false,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     if (!result.canceled) {
    //         setImage(result.assets[0].uri);
    //         // 이미지를 백엔드로 업로드
    //         console.log(result.assets[0].uri);
    //     }
    // };
    // 이미지 주소 받아오는 것 까지 완료, 서버 및 데이터베이스에 업로드 하는 방법 찾아봐야 함

    //   const uploadImage = async (imageUri) => {
    //     const result = createPost({
    //         item: {
    //             image
    //         }
    //     });
    //   };

    // write post code
    // const [createPost, { data, isLoading, error }] = useCreatePostMutation();

    // const onSubmitPasswordEditing = () => {
    // const result = createPost({
    //     item: {
    //         text
    //     }
    // });
    // }

    return (
        <Container>
            <NewPostInputBox>
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
                <NewPostFooterBox>
                    <ImgSelectIconBox onPress={uploadImage}>
                        <Ionicons name="ios-camera" size={28} color="#6b8a47" />
                    </ImgSelectIconBox>
                </NewPostFooterBox>
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

const NewPostSelectBox = styled.View`
    /* background-color: yellowgreen; */
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
`;

const QnACheckText = styled.Text`
    font-size: 16px;
    font-weight: 500;
    color: #353535;
`;

const QnACheckInput = styled(CheckBox)``;

export default NewPostScreen;
