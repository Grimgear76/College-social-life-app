import { createSlice } from '@reduxjs/toolkit';

const initialState = { //Global State and accessable throughout every webpage
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,

    //these are our actions{ functions of our app }
    reducers: { 
        //light mode or dark mode
        setMode: (state) => { 
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        //Login user
        setLogin: (state, action) => { 
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        //Logout user
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        //set friends for our local state
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent")
            }
        },
        //sets the posts
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        //relevant post update 
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;