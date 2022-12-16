import React from 'react'
import Image from 'next/image'
import styles from '../styles/CharacterBox.module.scss'
import useMediaQuery from '../hooks/useMediaQuery'
import { useRouter } from 'next/router'

type CharacterBoxProps = {
	id: number
	name: string
	image: string
	status: string
	origin?: string
	type?: string
	gender: string
	species: string
	locationId: number
}
const CharacterBox = ({
	id,
	name,
	image,
	status,
	origin,
	type,
	gender,
	species,
	locationId,
}: CharacterBoxProps) => {
	const router = useRouter()
	const matches = useMediaQuery('(max-width: 768px)')

	const truncateString = (text: string) => {
		if (text.length > 12) {
			return text.slice(0, 12) + '...'
		} else {
			return text
		}
	}
	return (
		<div
			className={styles.container}
			onClick={() =>
				router.push({
					pathname: '/character-details',
					query: {
						characterId: id,
						locationId: locationId,
						status: status,
					},
				})
			}
		>
			<div className={styles.imageWrapper}>
				<Image src={image} alt={name} width={336} height={336} loading='lazy' />
			</div>
			<h1>{matches ? truncateString(name) : name}</h1>
			<div className={styles.statusWrapper}>
				<h3>
					<div
						className={`${styles.status} ${
							status === 'Alive'
								? styles.alive
								: status === 'Dead'
								? styles.dead
								: styles.unknown
						}`}
					/>
					{status} - {species}
				</h3>
				{type && (
					<h3>
						{type} - {gender}
					</h3>
				)}
			</div>
			{origin && <h3>{origin}</h3>}
		</div>
	)
}

export default CharacterBox
