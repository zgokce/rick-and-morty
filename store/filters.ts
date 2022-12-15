import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type FiltersInitialState = {
	Dead: boolean
	Alive: boolean
	unknown: boolean
}
const initialState: FiltersInitialState = {
	Dead: false,
	Alive: false,
	unknown: false,
}

const filters = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		ADD_FILTER: (
			state,
			{ payload }: PayloadAction<{ status: 'Dead' | 'Alive' | 'unknown' }>,
		) => {
			state[payload.status] = !state[payload.status]
		},
	},
	extraReducers: (builder) => {},
})

export default filters.reducer
export const { ADD_FILTER } = filters.actions
