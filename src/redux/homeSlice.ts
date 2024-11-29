/* eslint-disable @typescript-eslint/no-shadow */
import { ActionReducerMapBuilder, createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { getCommnts, getPost, getUserInfo } from "./homeApiFun";
interface Post {
    id: string;
    title: string;
    views: number;
    reactions: {
        likes: number;
        dislikes: number;
        likedByUser: 'like' | 'dislike' | 'none'
    };
    comments: []
}

interface PostData {
    posts: Post[];
}

interface InitialStateProps {
    page: number;
    postData: PostData;
    comments: [];
    userData: {};
    hasMore: boolean;
}


const fetchPosts = (builder: ActionReducerMapBuilder<InitialStateProps>) => {
    builder.addCase(getPost.pending, () => {
        console.log('pending');
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
        const previousData = current(state.postData);
        if (action.payload.posts.length === 0) {
            state.hasMore = false;
        }
        if (previousData.posts) {
            state.postData = {
                posts: [...previousData.posts, ...action.payload.posts],
            };
        }
        else {
            state.postData = {
                posts: [...action.payload.posts],
            };
        }
        state.page = state.page + 1;
    });
    builder.addCase(getPost.rejected, () => {
        console.log('rejected');
    });
};

const fetchComments = (builder: ActionReducerMapBuilder<InitialStateProps>) => {
    builder.addCase(getCommnts.pending, () => {
        console.log('pending');
    });
    builder.addCase(getCommnts.fulfilled, (state, action) => {
        // state.comments = action.payload;
        const post = state.postData.posts.find((post: Post) => post.id === action.payload.comments[0].postId);
        if (post) {
            post.comments = action.payload;
        }
    });
    builder.addCase(getCommnts.rejected, () => {
        console.log('rejected');
    });
}

const fetchUserInfo = (builder: ActionReducerMapBuilder<InitialStateProps>) => {
    builder.addCase(getUserInfo.pending, () => {
        console.log('pending');
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
        state.userData = action.payload;
    });
    builder.addCase(getUserInfo.rejected, () => {
        console.log('rejected');
    });
};
interface Post {

}

const initialState: InitialStateProps = {
    page: 0,
    postData: [],
    comments: [],
    userData: [],
    hasMore: true,
};

const homeSlice = createSlice({
    name: 'homeSlice',
    initialState,
    reducers: {
        incrementLike: (state, action: PayloadAction<string>) => {
            const post = state.postData.posts.find((post: Post) => post.id === action.payload);
            if (post) {
                post.reactions.likes = post.reactions.likes + 1;
                post.reactions.likedByUser = 'like';
            }
        },
        decrementLike: (state, action: PayloadAction<string>) => {
            const post = state.postData.posts.find((post: Post) => post.id === action.payload);
            if (post) {
                post.reactions.likes = post.reactions.likes - 1;
                post.reactions.likedByUser = 'none';
            }
        },
        incrementDislike: (state, action: PayloadAction<string>) => {
            const post = state.postData.posts.find((post: Post) => post.id === action.payload);
            if (post) {
                post.reactions.dislikes = post.reactions.dislikes + 1;
                post.reactions.likedByUser = 'dislike';
            }
        },
        decrementDislike: (state, action: PayloadAction<string>) => {
            const post = state.postData.posts.find((post: Post) => post.id === action.payload);
            if (post) {
                post.reactions.dislikes = post.reactions.dislikes - 1;
                post.reactions.likedByUser = 'none';
            }
        },
        resetPage(state) {
            state.page = 0;
            state.postData = [];
        },
    },
    extraReducers: (builder) => {
        fetchPosts(builder);
        fetchComments(builder);
        fetchUserInfo(builder);
    },
});

export const { incrementLike, incrementDislike, decrementLike, decrementDislike, resetPage } = homeSlice.actions;

export default homeSlice.reducer;
