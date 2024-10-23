import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Item, ItemState } from "../../types/types";

const initialState: ItemState = {
    value: null,
    status: "loading",
    error: null,
};

export const fetchProductId = createAsyncThunk<Item, string, { state: RootState; rejectValue: string }>(
    "items/fetchItemById", async (id: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error: unknown) {
            let message: string;

            if (error instanceof Error) {
                message = error.message;
            } else {
                message = "Something went wrong";
            }

            return rejectWithValue(message);
        }
    }

);

const productSlice = createSlice({
    name: "items",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductId.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(
                fetchProductId.fulfilled,
                (state, action: PayloadAction<Item>) => {
                    state.status = "succeeded";
                    state.value = action.payload;
                }
            )
            .addCase(
                fetchProductId.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.status = "failed";
                    state.error = action.payload || "Failed to fetch item data";
                }
            );
    },
});

export const { } = productSlice.actions;
export default productSlice.reducer;
