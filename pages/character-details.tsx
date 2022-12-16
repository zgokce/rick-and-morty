import React, { useEffect, useState } from 'react'
import styles from '../styles/CharacterDetails.module.scss'
import MainLayout from '../layouts/main-layout'
import { useGetCharacterQuery } from '../service/api'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import ICharacterResponse from '../interfaces/character-response.interface'
import CharacterBox from '../components/character-box'
import OtherCharacterBox from '../components/other-character-box'

const CharacterDetails = () => {
	const router = useRouter()

	const allCharacters = useSelector((state: RootState) => state.characters)

	const {
		data: characterData,
		isLoading: characterIsLoading,
		refetch: characterRefetch,
	} = useGetCharacterQuery(router.query.characterId as unknown as number)

	const [otherCharacters, setOtherCharacters] = useState<ICharacterResponse[]>(
		[],
	)

	useEffect(() => {
		if (router.isReady) {
			const charactersByLocation = allCharacters.filter(
				(x: ICharacterResponse) =>
					x.location.url ===
					`https://rickandmortyapi.com/api/location/${router.query.locationId}`,
			)
			const charactersByStatus: ICharacterResponse[] = []
			charactersByLocation.filter((x: ICharacterResponse) => {
				if (x.status === router.query.status) {
					charactersByStatus.push(x)
				}
			})

			const otherCharactersData: ICharacterResponse[] = []
			charactersByLocation.map((data1: ICharacterResponse) => {
				if (charactersByStatus.some((data2) => data2.id === data1.id)) {
					otherCharactersData.push(data1)
				}
			})
			otherCharactersData.map((character, c) => {
				if (character.id === parseInt(router.query.characterId as any)) {
					console.log('gökçe:', character)
					otherCharactersData.splice(c, 1)
				}
			})
			setOtherCharacters(otherCharactersData)
		}
	}, [router, router.isReady])

	return (
		<MainLayout>
			{!router.isReady || characterIsLoading ? (
				<div>loading</div>
			) : (
				<div className={styles.container}>
					<div className={styles.characterBoxWrapper}>
						<CharacterBox
							id={characterData.id}
							name={characterData.name}
							image={characterData.image}
							status={router.query.status as string}
							gender={characterData.gender}
							species={characterData.species}
							locationId={characterData.locationId}
							origin={characterData.origin.name}
							type={characterData.type}
						/>
					</div>
					<div className={styles.otherCharactersWrapper}>
						<h1>Other Characters</h1>
						<div className={styles.otherCharacters}>
							{otherCharacters.map((character, c) => {
								return (
									<OtherCharacterBox
										key={`other-character-${c.toString()}`}
										id={character.id}
										locationId={router.query.locationId as string}
										status={router.query.status as string}
										image={character.image}
										name={character.name}
										origin={character.origin.name}
										type={character.type}
										gender={character.gender}
									/>
								)
							})}
						</div>
					</div>
				</div>
			)}
		</MainLayout>
	)
}

export default CharacterDetails
