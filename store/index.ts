import { combineReducers } from 'redux'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'

import { api } from '../service/api'
import characters from './characters'
import storage from 'redux-persist/lib/storage'
import filters from './filters'

const reducers = combineReducers({
	characters: characters,
	filters: filters,
	[api.reducerPath]: api.reducer,
})

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat([api.middleware])
	},
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof persistedReducer>
export const persistor = persistStore(store)
export { store }
