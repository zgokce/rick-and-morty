import React from 'react'
import styles from '../styles/OtherCharacterBox.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'

type OtherCharacterBoxProps = {
	id: number
	locationId: string
	status: string
	image: string
	name: string
	origin: string
	type: string
	gender: string
}
const OtherCharacterBox = ({
	id,
	locationId,
	status,
	image,
	name,
	origin,
	type,
	gender,
}: OtherCharacterBoxProps) => {
	const router = useRouter()
	return (
		<div className={styles.container}>
			<div
				className={styles.imageWrapper}
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
				<Image src={image} alt={name} width={90} height={90} loading='lazy' />
			</div>
			<div className={styles.textWrapper}>
				<h2
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
					{name}
				</h2>
				<h3>{origin}</h3>
				<h3>
					{type} - {gender}
				</h3>
			</div>
		</div>
	)
}

export default OtherCharacterBox
