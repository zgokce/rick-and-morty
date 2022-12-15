import { createSlice } from '@reduxjs/toolkit'
import { api } from '../service/api'
import ICharacterResponse from '../interfaces/character-response.interface'
import { RootState } from './index'

const initialState: ICharacterResponse[] = []

const characters = createSlice({
	name: 'characters',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			api.endpoints.getCharacters.matchFulfilled,
			(state, { payload }) => {
				const tmp = [...state]
				payload.results.map((data: ICharacterResponse) => {
					const found = state.find((obj) => {
						return obj.id === data.id
					})
					if (!found) {
						tmp.push(data)
					}
				})
				return tmp
			},
		)
	},
})

export default characters.reducer

export const getCharactersByLocation = (
	state: RootState,
	locationId: string,
) => {
	return state.characters.filter(
		(x) =>
			x.location.url ===
			`https://rickandmortyapi.com/api/location/${locationId}`,
	)
}
export const getCharactersByStatus = (
	state: RootState,
	filter: any,
	locationId: string,
) => {
	const charactersData = getCharactersByLocation(state, locationId)
	const characters: ICharacterResponse[] = []
	charactersData.filter((x) => {
		Object.keys(filter).map((status) => {
			if (filter[status] === true && x.status === status) {
				characters.push(x)
			}
		})
	})
	return characters
}
