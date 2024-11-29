import { createAsyncThunk } from "@reduxjs/toolkit";
import { doFetch } from "../../fetcher";

const getPost = createAsyncThunk<{ id: number; title: string; body: string }[], { limit: number; page: number }>(
    'GET_POSTS',
    async (page) => {
        return doFetch<{ id: number; title: string; body: string }[]>(`posts?limit=${page.limit}&skip=${page.limit * page.page}`)
            .then(posts => posts)
            .catch(e => {
                console.log(e);
                throw e; // Ensure the error propagates to `rejected` case
            });
    }
);


const getCommnts = createAsyncThunk<any>(
    'GET_COMMENTS',
    async (postID) =>
        doFetch(`comments/post/${postID}`)
            .then(res => { return res; })
            .catch(e => {
                console.log(e);
            })
);

const getUserInfo = createAsyncThunk<any>(
    'GET_USER',
    async () =>
        doFetch(`auth/me`)
            .then(res => { return res; })
            .catch(e => {
                console.log(e);
            })
)

export { getPost, getCommnts, getUserInfo };
