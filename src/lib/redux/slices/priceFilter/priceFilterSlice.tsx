import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    select: ""
}

const priceSlice = createSlice({
    name: "priceSlice",
    initialState,
    reducers: {
        priceFilter: (state, action: PayloadAction<string>) => {
            state.select = action.payload;
        },
        unChooseFilter: (state) => {
            state.select = ""
        }
    }
})

export const { priceFilter, unChooseFilter} = priceSlice.actions
export default priceSlice.reducer