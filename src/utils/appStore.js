import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../utils/appSlice"
const appStore = configureStore({
    reducer:{
        app: appReducer,
    }
})

export default appStore;