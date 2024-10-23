import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { setLoading } from "../loadingSlice/loadingSlice";
import { Item } from "../../types/types";
import { ItemsState } from "../../types/types";

const initialState: ItemsState = {
    value: null,
    status: "loading",
    error: null,
};

export const fetchFavoriteItems = createAsyncThunk<Item[], void, { state: RootState; rejectValue: string }>(
    "favoriteItems/fetchFavoriteItems",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://fakestoreapi.com/products?limit=9');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setLoading(true)
            return data;
        } catch (error: unknown) {
            let message;

            if (error instanceof Error) {
                message = error.message;
            } else {
                message = "Something went wrong";
            }

            return rejectWithValue(message);
        }
    }

);

const favoriteItems = createSlice({
    name: "favoriteItems",
    initialState,
    reducers: {
        setFavoriteItems: (state, action: PayloadAction<Item[]>) => {
            state.value = action.payload;
            state.status = "succeeded";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoriteItems.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(
                fetchFavoriteItems.fulfilled,
                (state, action: PayloadAction<Item[]>) => {
                    state.status = "succeeded";
                    state.value = action.payload;
                }
            )
            .addCase(
                fetchFavoriteItems.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.status = "failed";
                    state.error = action.payload || "Failed to fetch items data";
                }
            );
    },
});

export const { setFavoriteItems } = favoriteItems.actions;
export default favoriteItems.reducer;
