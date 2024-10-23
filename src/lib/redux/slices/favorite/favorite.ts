
import { createSlice } from '@reduxjs/toolkit';
import { favorite } from '../../types/types';

const initialState: favorite = {
    data: [],
    loading: false,
    error: ""
}

const favorite_slice = createSlice({
    name: "favorite",
    initialState: initialState,
    reducers: {
        getFavorite(state) {
            state.data = JSON.parse(localStorage.getItem("favorite") || "[]") ?? []
        },
        setFavorite(state, action) {
            state.data = state.data.concat(action.payload)
            localStorage.setItem("favorite", JSON.stringify(state.data))
        },
        removeFavorite(state, action) {
            state.data = state.data.filter((item) => item != action.payload)
            localStorage.setItem("favorite", JSON.stringify(state.data))
        }
    }
})

export const { getFavorite, setFavorite, removeFavorite } = favorite_slice.actions
export default favorite_slice.reducer

