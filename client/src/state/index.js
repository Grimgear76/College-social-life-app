//cleaned code
//global state manager (every component updates instantly)
import { createSlice } from '@reduxjs/toolkit';

/* --- Initial State --- */
const initialState = { //Global State and accessible globally
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

/* --- State Actions --- */
//these are our actions{ functions of our app }
export const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: { 
        //light mode or dark mode
        setLightDarkMode: (state) => { 
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
                state.user.friends = [];
            }
        },

        //sets the posts
        setPosts: (state, action) => {
            state.posts = Array.isArray(action.payload) ? action.payload : [];
        },

        //relevant post update 
        setPost: (state, action) => {
            state.posts = Array.isArray(action.payload) ? action.payload : [];
        },

        removePostFromFeed: (state, action) => {
            state.posts = state.posts.filter(
                (post) => post._id !== action.payload
            );
        },
    }
})

//test login functionality
export const { setLightDarkMode, setLogin, setLogout, setFriends, setPosts, setPost, removePostFromFeed } = authSlice.actions;
export default authSlice.reducer;