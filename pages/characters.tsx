import React, { useEffect, useMemo, useState } from 'react'
import styles from '../styles/Characters.module.scss'
import { useRouter } from 'next/router'
import MainLayout from '../layouts/main-layout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import {
	getCharactersByStatus,
	getCharactersByLocation,
} from '../store/characters'
import { ADD_FILTER } from '../store/filters'
import ICharacterResponse from '../interfaces/character-response.interface'
import CharacterBox from '../components/character-box'
import Pagination from '../components/pagination'

const Characters = () => {
	const router = useRouter()
	const dispatch = useDispatch()

	const [characters, setCharacters] = useState<ICharacterResponse[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPageCount, setTotalPageCount] = useState<number>(1)
	const perPage = 20

	const filters = useSelector((state: RootState) => state.filters)

	const charactersDataByLocation = useSelector((state: RootState) =>
		getCharactersByLocation(state, router.query.locationId as string),
	)
	const charactersByFilter = useSelector((state: RootState) =>
		getCharactersByStatus(state, filters, router.query.locationId as string),
	)

	useEffect(() => {
		if (router.isReady) {
			let tmpCharacters
			setLoading(false)
			if (filters.Dead || filters.Alive || filters.unknown) {
				setCurrentPage(1)
				if (charactersByFilter) {
					tmpCharacters = charactersByFilter
				} else {
					tmpCharacters = charactersDataByLocation
				}
			} else {
				tmpCharacters = charactersDataByLocation
			}
			console.log('-->', tmpCharacters)
			setCharacters(tmpCharacters)

			setTotalPageCount(Math.ceil(tmpCharacters.length / perPage))
			console.log('page count:', Math.ceil(tmpCharacters.length / perPage))
			console.log('character count:', tmpCharacters.length)
		}
	}, [router.isReady, filters])

	const charactersData = useMemo(() => {
		return characters.slice(
			(currentPage - 1) * perPage,
			(currentPage - 1) * perPage + perPage,
		)
	}, [characters, currentPage, filters])

	return (
		<MainLayout>
			<div>
				<div className={styles.filterWrapper}>
					<div>
						<h3>Filter by status:</h3>
					</div>
					<div className={styles.filterButtons}>
						<button
							className={`${styles.dead} ${
								filters.Dead ? styles.activeDead : ''
							}`}
							onClick={() => dispatch(ADD_FILTER({ status: 'Dead' }))}
						>
							<div />
							Dead
						</button>
						<button
							className={`${styles.alive} ${
								filters.Alive ? styles.activeAlive : ''
							}`}
							onClick={() => dispatch(ADD_FILTER({ status: 'Alive' }))}
						>
							<div />
							Alive
						</button>
						<button
							className={`${styles.unknown} ${
								filters.unknown ? styles.activeUnknown : ''
							}`}
							onClick={() => dispatch(ADD_FILTER({ status: 'unknown' }))}
						>
							<div />
							Unknown
						</button>
					</div>
				</div>
			</div>
			{loading ? (
				<div>loading</div>
			) : (
				<div>
					<div className={styles.charactersContainer}>
						{charactersData.map((character, c) => {
							return (
								<div
									key={`character-${c.toString()}`}
									className={styles.characterBoxWrapper}
								>
									<CharacterBox
										id={character.id}
										name={character.name}
										image={character.image}
										status={character.status}
										gender={character.gender}
										species={character.species}
										locationId={router.query.locationId as unknown as number}
									/>
								</div>
							)
						})}
					</div>
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						totalPageCount={totalPageCount}
					/>
				</div>
			)}
		</MainLayout>
	)
}

export default Characters
