import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    Posts: [],
}
const PostsReducer = createSlice({
    name: 'PostsReducer',
    initialState,
    reducers: { 
        getPosts : (state,action) =>{
            state.Posts = action.payload
        },
    }
})

export const {getPosts} = PostsReducer.actions;
export default PostsReducer.reducer;