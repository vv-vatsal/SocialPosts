// import { configureStore } from "@reduxjs/toolkit";
// import  HomeReducer from './homeSlice';

// const store = configureStore({
//     reducer:{
//         home:HomeReducer,
//     },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeReducer from "./homeSlice";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, HomeReducer);

const store = configureStore({
    reducer: {
        home: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);

export { persistor };
export default store;
