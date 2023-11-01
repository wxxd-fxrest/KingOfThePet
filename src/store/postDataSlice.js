import { createSlice } from "@reduxjs/toolkit";
import postData from "../data/postData";

const initialState = {
    postdata: postData,
    selectedMaindata: null, 
};

export const postDataSlice = createSlice({
    name: 'postdata',
    initialState,
    reducers: {
        setSelectedMaindata: (state, action) => {
            const postDataID = action.payload;
            state.selectedMaindata = state.products.find((p) => p.id === postDataID);
        }
    },
});