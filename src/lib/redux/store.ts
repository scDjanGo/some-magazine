import { createWrapper } from 'next-redux-wrapper';
import { configureStore  } from "@reduxjs/toolkit";



import  selectFilters  from './slices/filtersSlice/filterSlice';
import  priceFilter  from './slices/priceFilter/priceFilterSlice';
import items from './slices/itemsSlice/itemsSlice'
import  loading  from './slices/loadingSlice/loadingSlice';
import favorite from "./slices/favorite/favorite"
import favoriteItems from "./slices/favoriteItems/favoriteitemsSlice"
import product from "./slices/productSlice/productSlice"

export const makeStore = () => {
    return configureStore({
        reducer: {
            selectFilters: selectFilters,
            priceFilter: priceFilter,
            items: items,
            loading: loading,
            favorite: favorite,
            favoriteItems: favoriteItems,
            product: product,
        }
    })
}


type Store = ReturnType<typeof makeStore>;
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];




export const wrapper = createWrapper<Store>(makeStore);