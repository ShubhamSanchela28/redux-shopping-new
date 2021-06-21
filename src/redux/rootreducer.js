import { combineReducers } from "redux";
import shoppingReducer from "./Shopping/shopping-reducer";
import cartReducer from "./Shopping/cart-reducer";

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


// const persistProductConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['shop']
// }

const persistCartConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    shop: shoppingReducer,
    cart: persistReducer(persistCartConfig, cartReducer)
});

export default rootReducer