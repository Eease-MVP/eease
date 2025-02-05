import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import React, {ReactNode} from 'react'
import {ActivityIndicator} from "react-native"
import {userApi} from "./user-api"

// for testing purpose. Uncomment if you want to clear all the data
// AsyncStorage.clear()

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [userApi.reducerPath] // Don't persist API cache
}

const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat(userApi.middleware),
})

const persistor = persistStore(store)

interface ReduxProviderProps {
    children: ReactNode
}

export default function ReduxProvider({children}: ReduxProviderProps) {
    return (
        <Provider store={store}>
            <PersistGate
                loading={<ActivityIndicator size="large" color="#0000ff"/>}
                persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

// Export types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
