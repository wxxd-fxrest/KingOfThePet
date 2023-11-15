import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components/native';
import UserImg from '../../assets/user.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const DetailScreen = ({ route: params }) => {
    const item = params.params;
    const image = item.imgData;
    const [post, setPost] = useState(false);
    const [heart, setHeart] = useState(false);

    useEffect(() => {
        if (item.postData.text) {
            setPost(true);
        }
    }, [post]);

    // test master
    // test test
    // test test1

    return (
        <Container>
            <PostBox>
                <PostDataBox>
                    <PostNameQnA>
                        <PostProfileImgBox>
                            <PostProfileImg source={UserImg} />
                        </PostProfileImgBox>

                        <PostProfileName> {item.userData.username} </PostProfileName>
                        {item.postData.QnA === 'true' && (
                            <QnABox>
                                <PostQnA> 질문 </PostQnA>
                            </QnABox>
                        )}
                    </PostNameQnA>
                    {item.postData ? <PostText image={image}> {item.postData.text} </PostText> : null}
                    {item.imgData && (
                        <PostImgBox>
                            <PostImg source={{ uri: `http://localhost:3000/images/${item.imgData.filename}` }} />
                        </PostImgBox>
                    )}
                </PostDataBox>
                <BottomBox>
                    <LikeBtn
                        onPress={() => {
                            setHeart(!heart);
                        }}
                    >
                        <Ionicons name={heart === false ? 'heart-outline' : 'ios-heart'} size={24} color="#807d7d" />
                    </LikeBtn>
                </BottomBox>
            </PostBox>
        </Container>
    );
};

const Container = styled.ScrollView`
    background-color: white;
    flex: 1;
    padding: 5px 10px;
`;

const PostBox = styled.View`
    width: 100%;
    padding: 10px;
`;

const PostProfileImgBox = styled.View`
    background-color: gray;
    border-radius: 100px;
    justify-content: center;
    align-items: center;
`;

const PostProfileImg = styled.Image`
    width: 35px;
    height: 35px;
    border-radius: 100px;
`;

const PostDataBox = styled.View`
    align-items: flex-start;
`;

const PostNameQnA = styled.View`
    flex-direction: row;
    align-items: flex-end;
    margin-bottom: 15px;
`;

const PostProfileName = styled.Text`
    font-size: 16px;
    font-weight: 600;
    padding: 5px;
    color: #6b8a47;
`;

const QnABox = styled.View`
    background-color: #f7f0d6;
    border-color: #f6c914;
    border-width: 1px;
    border-radius: 5px;
    padding: 5px;
    margin-left: 5px;
`;

const PostQnA = styled.Text`
    color: #d4d4d4;
`;

const PostText = styled.Text`
    font-size: 16px;
    padding-bottom: ${(props) => (props.image === null ? '10px' : '0px')};
`;

const PostImgBox = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 15px 0px;
`;

const PostImg = styled.Image`
    width: 100%;
    aspect-ratio: 1.5;
    border-radius: 10px;
`;

const BottomBox = styled.View`
    border-top-color: #d4d4d4;
    border-top-width: 1px;
    padding: 8px 10px;
    flex-direction: row;
    justify-content: flex-end;
`;

const CommentBtn = styled.TouchableOpacity``;
const LikeBtn = styled.TouchableOpacity``;

export default DetailScreen;
