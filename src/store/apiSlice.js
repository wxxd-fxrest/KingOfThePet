import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3000/';

// Define a service using a base URL and expected endpoints
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
                url: 'posts',
                method: 'POST',
                body: newPost,
            }),
        }),
        createAuth: builder.mutation({
            query: (newAuth) => ({
                url: 'auths',
                method: 'POST',
                body: newAuth,
            }),
        }),
        getAuth: builder.query({
            query: (ref) => `auths/${ref}`,
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateAuthMutation, useGetAuthQuery, useGetAllPostsQuery, useGetPostQuery, useCreatePostMutation } = apiSlice;