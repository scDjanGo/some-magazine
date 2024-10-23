import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    select: ""
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        selectFilters: (state, action: PayloadAction<string>) => {
            state.select = action.payload;
        },
        unChooseFilters: (state) => {
            state.select = ""
        }
    }
})

export const { selectFilters, unChooseFilters} = filterSlice.actions
export default filterSlice.reducer