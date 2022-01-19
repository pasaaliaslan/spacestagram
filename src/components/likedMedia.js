import { createSlice } from "@reduxjs/toolkit";

const likedMedia = createSlice({
    name: "likedMedia",
    initialState: {
        mediaFiles: [],
    },
    reducers: {
        ADD: (state, action) => {
            state.mediaFiles = [...state.mediaFiles, action.payload];
        },
        REMOVE: (state, action) => {
            state.mediaFiles = state.mediaFiles.filter(media => media.date !== action.payload);
        },
    }
})

export const { ADD, REMOVE } = likedMedia.actions;

export default likedMedia.reducer;