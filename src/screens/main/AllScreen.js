import React from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import styled from 'styled-components';
import { useGetAllPostsQuery } from '../../store/apiSlice';
import UserImg from '../../assets/user.png';

const AllScreen = ({ navigation }) => {
    const { data, error, isLoading } = useGetAllPostsQuery();

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        console.log(error.error);
        return <Text> {error.error} </Text>;
    }

    const postdata = data?.data;

    return (
        <Container>
            <FlatList
                data={postdata}
                renderItem={({ item }) => (
                    <PostBox onPress={() => navigation.navigate('MainStack', { screen: 'DetailScreen', params: item })}>
                        <PostProfileImgBox>
                            <PostProfileImg source={UserImg} />
                        </PostProfileImgBox>
                        <PostDataBox>
                            <PostNameQnA>
                                <PostProfileName> {item.userData.username} </PostProfileName>
                                {item.postData.QnA === 'true' && (
                                    <QnABox>
                                        <PostQnA> 질문 </PostQnA>
                                    </QnABox>
                                )}
                            </PostNameQnA>
                            {item.imgData && (
                                <PostImgBox>
                                    <PostImg
                                        source={{ uri: `http://localhost:3000/images/${item.imgData.filename}` }}
                                    />
                                </PostImgBox>
                            )}
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

const Container = styled.View`
    flex: 1;
    background-color: white;
`;

const PostBox = styled.TouchableOpacity`
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

export default AllScreen;
