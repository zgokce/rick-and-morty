import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
	reducerPath: 'rickAndMortyApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
	endpoints: (builder) => ({
		getLocations: builder.query({
			query: (page: number) => {
				return {
					url: 'location',
					params: { page },
				}
			},
		}),
		getCharacters: builder.query({
			query: (page: number) => {
				return {
					url: 'character',
					params: { page },
				}
			},
		}),
		getCharacter: builder.query({
			query: (id: number) => {
				return {
					url: `character/${id}`,
				}
			},
		}),
	}),
})

export const {
	useGetLocationsQuery,
	useGetCharactersQuery,
	useGetCharacterQuery,
} = api
