import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
};

// Create Post
export const createPost = createAsyncThunk(
  "post/createPost",
  async (params) => {
    try {
      const { data } = await axios.post("/posts", params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Get All Posts
export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  try {
    const { data } = await axios.get("/posts");
    return data;
  } catch (error) {
    console.log(error);
  }
});

// Remove Post
export const removePost = createAsyncThunk("post/removePost", async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`, id);
    return data;
  } catch (error) {
    console.log(error);
  }
});

// Update Post
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (updatedPost) => {
    try {
      const { data } = await axios.put(`/posts/${updatedPost.id}`, updatedPost);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Post Slice
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    // Create Post
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    },
    [createPost.rejected]: (state) => {
      state.loading = false;
    },

    // Get All Posts
    [getAllPosts.pending]: (state) => {
      state.loading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts;
      state.popularPosts = action.payload.popularPosts;
    },
    [getAllPosts.rejected]: (state) => {
      state.loading = false;
    },

    // Remove Post
    [removePost.pending]: (state) => {
      state.loading = true;
    },
    [removePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = state.post.filter(
        (post) => post._id !== action.payload._id
      );
    },
    [removePost.rejected]: (state) => {
      state.loading = false;
    },

    // Update Post
    [updatePost.pending]: (state) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.posts.findIndex(
        (post) => post.id === action.payload._id
      );
      state.posts[index] = action.payload;
    },
    [updatePost.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default postSlice.reducer;
