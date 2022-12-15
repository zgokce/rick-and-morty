import React from 'react'
import styles from '../styles/LocationBox.module.scss'
import { useRouter } from 'next/router'

type LocationBoxProps = {
	id: number
	name: string
	type: string
	dimension: string
	residentCount: number
}

const LocationBox = ({
	id,
	name,
	type,
	dimension,
	residentCount,
}: LocationBoxProps) => {
	const router = useRouter()

	return (
		<div
			className={styles.container}
			onClick={() =>
				router.push({
					pathname: '/characters',
					query: {
						locationId: id,
					},
				})
			}
		>
			<h2>{name}</h2>
			<div className={styles.description}>
				<h4>Type</h4>
				<h4>
					<span>:</span>
					{type}
				</h4>
			</div>
			<div className={styles.description}>
				<h4>Dimension</h4>
				<h4>
					<span>:</span>
					{dimension}
				</h4>
			</div>
			<div className={styles.description}>
				<h4>Resident count</h4>
				<h4>
					<span>:</span>
					{residentCount}
				</h4>
			</div>
		</div>
	)
}

export default LocationBox
