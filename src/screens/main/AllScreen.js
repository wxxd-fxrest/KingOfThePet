import React from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import styled from 'styled-components';
import { useGetAllPostsQuery } from '../../store/apiSlice';
import UserImg from '../../assets/user.png';

const AllScreen = ({ currentUser }) => {
    const { data, error, isLoading } = useGetAllPostsQuery();
    // console.log(data?.data);
    // let imgdata = data?.data[3].imgData.path;
    console.log(data?.data[1].imgData.path);

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        console.log(error.error);
        return <Text> {error.error} </Text>;
    }

    const postdata = data?.data;

    // 이미지 바인딩... 해야 해...

    return (
        <Container>
            <FlatList
                data={postdata}
                renderItem={({ item }) => (
                    <PostBox>
                        <PostProfileImgBox>
                            {/* <PostProfileImg
                                source={
                                    item.userData && item.userData.userimg ? { uri: item.imgData.filename } : UserImg
                                }
                            /> */}
                            <PostProfileImg source={UserImg} />
                        </PostProfileImgBox>
                        <PostDataBox>
                            <PostNameQnA>
                                <PostProfileName> {item.userData.username} </PostProfileName>
                                {item.postData.QnA === true && (
                                    <QnABox>
                                        <PostQnA> 질문 </PostQnA>
                                    </QnABox>
                                )}
                            </PostNameQnA>
                            {/* {item.imgData && (
                                <PostImgBox>
                                    <PostImg
                                        source={item.imgData && item.imgData.path ? { uri: item.imgData.path } : ''}
                                    />
                                </PostImgBox>
                            )} */}

                            <PostImg source={{ uri: item.imgData.filename }} />

                            {item.postData && <PostText> {item.postData.text} </PostText>}
                        </PostDataBox>
                    </PostBox>
                )}
                keyExtractor={(item) => item._id + ''}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    );
};
// /Users/drizzle/KingOfThePet/KingOfThePetBackend/images
const Container = styled.View`
    flex: 1;
    background-color: white;
`;

const PostBox = styled.View`
    flex-direction: row;
    background-color: #d3e2c2;
    margin: 18px 20px;
    padding: 10px;
    border-radius: 20px;
`;

const PostProfileImgBox = styled.View`
    background-color: gray;
    position: absolute;
    top: -10px;
    right: -10px;
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
    padding: 5px 10px;
`;

const PostNameQnA = styled.View`
    flex-direction: row;
    align-items: center;
`;

const PostProfileName = styled.Text`
    font-size: 16px;
    font-weight: 600;
    padding: 5px;
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
    padding-top: 10px;
    font-size: 16px;
`;

const PostImgBox = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px 0px;
`;

const PostImg = styled.Image`
    width: 100%;
    aspect-ratio: 1;
    border-radius: 10px;
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

export default AllScreen;
