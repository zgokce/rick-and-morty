import React from 'react'
import styles from '../styles/CharacterBox.module.scss'
import ContentLoader from 'react-content-loader'

const CharacterBoxLoader = () => {
	return (
		<div className={styles.container}>
			<ContentLoader
				speed={2}
				width={369}
				height={467}
				viewBox='0 0 369 467'
				backgroundColor='#f3f3f3'
				foregroundColor='#ecebeb'
			>
				<rect x='12' y='12' rx='15' ry='15' width='344' height='344' />
				<rect x='11' y='375' rx='0' ry='0' width='115' height='19' />
				<circle cx='21' cy='416' r='9' />
				<rect x='37' y='409' rx='0' ry='0' width='79' height='13' />
			</ContentLoader>
		</div>
	)
}

export default CharacterBoxLoader
