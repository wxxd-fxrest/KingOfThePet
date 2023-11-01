import React, { useState } from "react";
import { ActivityIndicator, FlatList, Text, TextInput } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useCreatePostMutation, useGetAllPostsQuery, useGetPostQuery } from "../../store/apiSlice";

const AllScreen = ({ currentUser }) => {
    // const postdata = useSelector((state) => state.postdata.postdata);
    // console.log("all", currentUser.email)

    const { data, error, isLoading } = useGetAllPostsQuery();

    if (isLoading) {
        return <ActivityIndicator />;
    }
    
    if(error) {
        console.log(error.error)
        return <Text> {error.error} </Text>
    }

    const postdata = data.data; 

    return (
        <Container>
            <FlatList data={postdata}
                renderItem={({ item }) => (
                    <PostBox>
                        <PostProfileImg source={{uri: item.userimg}}/>
                        <PostDataBox>
                            <PostNameQnA>
                                <PostProfileName> {item.username} </PostProfileName>
                                {item.qna_boolen === true &&
                                    <QnABox>
                                        <PostQnA> 질문 </PostQnA>
                                    </QnABox>
                                }
                            </PostNameQnA>
                            {item.image &&
                                <PostImgBox>
                                    <PostImg source={{uri: item.image}} />
                                </PostImgBox>
                            }
                            {item.description &&
                                <PostText> {item.description} </PostText>
                            }
                        </PostDataBox>
                    </PostBox>
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    )
};

const Container = styled.View`
    flex: 1;
    background-color: white;
    /* padding: 0px 15px; */
`;

const PostBox = styled.View`
    flex-direction: row;
    /* background-color: rgba(107, 138, 71, 0.4); */
    background-color: #d3e2c2;
    margin: 18px 20px;
    padding: 10px;
    border-radius: 20px;
`;

const PostProfileImg = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 100px;
    position: absolute;
    top: -10px;
    right: -10px;
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