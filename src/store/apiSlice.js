import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3000/';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: () => 'posts',
        }),
        getPost: builder.query({
            query: (id) => `posts/${id}`,
        }),
        createPost: builder.mutation({
            query: (newPost) => ({
                url: 'posts/upload-posts',
                method: 'POST',
                body: newPost,
            }),
        }),

        getAllDiarys: builder.query({
            query: () => 'diarys',
        }),
        getDiary: builder.query({
            query: (id) => `diarys/${id}`,
        }),
        createDiary: builder.mutation({
            query: (newDiary) => ({
                url: 'diarys/upload-diarys',
                method: 'POST',
                body: newDiary,
            }),
        }),

        createAuth: builder.mutation({
            query: (newAuth) => ({
                url: 'auths',
                method: 'POST',
                body: newAuth,
            }),
        }),
        getAllAuths: builder.query({
            query: () => 'auths',
        }),
        getAuth: builder.query({
            query: (useremail) => `auths/${useremail}`,
        }),
    }),
});

export const {
    useCreateAuthMutation,
    useGetAuthQuery,
    useGetAllAuthsQuery,

    useGetAllPostsQuery,
    useGetPostQuery,
    useCreatePostMutation,

    useGetAllDiarysQuery,
    useGetDiaryQuery,
    useCreateDiaryMutation,
} = apiSlice;
