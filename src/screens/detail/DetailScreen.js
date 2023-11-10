import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components/native';
import UserImg from '../../assets/user.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const DetailScreen = ({ route: params }) => {
    const item = params.params;
    const [post, setPost] = useState(false);
    const [heart, setHeart] = useState(false);

    useEffect(() => {
        if (item.postData.text) {
            setPost(true);
        }
    }, [post]);

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
                    {item.imgData && (
                        <PostImgBox>
                            <PostImg source={{ uri: `http://localhost:3000/images/${item.imgData.filename}` }} />
                        </PostImgBox>
                    )}
                    {item.postData ? <PostText post={post}> {item.postData.text} </PostText> : null}
                </PostDataBox>
                <BottomBox>
                    <CommentBtn>
                        <MaterialCommunityIcons name="comment-text-multiple" size={24} color="#6b8a47" />
                    </CommentBtn>
                    <LikeBtn
                        onPress={() => {
                            setHeart(!heart);
                        }}
                    >
                        <Ionicons name={heart === false ? 'heart-outline' : 'ios-heart'} size={24} color="#6b8a47" />
                    </LikeBtn>
                </BottomBox>
            </PostBox>
        </Container>
    );
};

const Container = styled.ScrollView`
    background-color: #d3e2c2;
    flex: 1;
    padding: 10px;
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
    width: 40px;
    height: 40px;
    border-radius: 100px;
`;

const PostDataBox = styled.View`
    align-items: flex-start;
`;

const PostNameQnA = styled.View`
    flex-direction: row;
    align-items: flex-end;
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
    color: #646462;
`;

const PostText = styled.Text`
    font-size: 16px;
    padding: ${(props) => (props.post === true ? '20px 0px' : '0')};
`;

const PostImgBox = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 20px;
`;

const PostImg = styled.Image`
    width: 90%;
    aspect-ratio: 1.3;
    border-radius: 10px;
`;

const BottomBox = styled.View`
    border-top-color: #c0cfb0;
    border-top-width: 1px;
    padding: 15px 10px;
    flex-direction: row;
`;

const CommentBtn = styled.TouchableOpacity``;
const LikeBtn = styled.TouchableOpacity``;

export default DetailScreen;
