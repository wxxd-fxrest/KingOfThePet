import React, { useState } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components";
import { Ionicons } from '@expo/vector-icons'; 

const {width: SCREENWIDTH, height : SCREENHEIGHT} = Dimensions.get("window");

const NewDiaryScreen = () => {
    const [newDiary, setNewDiary] = useState("");

    return (
        <Container>
            <NewPostInputBox>
                <NewPostInput value={newDiary} 
                    placeholder="내용을 입력해 주세요."
                    placeholderTextColor="gray"
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={300}
                    multiline={true}
                    returnKeyType="search"  
                    onChangeText={(text) => setNewDiary(text)}  
                />
                <NewPostFooterBox>
                    <ImgSelectIconBox>
                        <Ionicons name="ios-camera" size={28} color="#6b8a47" />
                    </ImgSelectIconBox>
                </NewPostFooterBox>
            </NewPostInputBox>
        </Container>
    )
};

const Container = styled.View`
    flex: 1;
    background-color: white;
    padding: 25px;
`;

const NewPostInputBox = styled.View`
    background-color: rgb(234, 234, 234);
    height: ${SCREENHEIGHT/ 3.5}px;
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

export default NewDiaryScreen; 