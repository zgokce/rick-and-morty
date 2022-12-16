import React from 'react'
import styles from '../styles/OtherCharacterBox.module.scss'
import ContentLoader from 'react-content-loader'

const OtherCharacterBoxLoader = () => {
	return (
		<div className={styles.container}>
			<ContentLoader
				speed={2}
				width={345}
				height={97}
				viewBox='0 0 345 97'
				backgroundColor='#f3f3f3'
				foregroundColor='#ecebeb'
			>
				<rect x='3' y='3' rx='15' ry='15' width='90' height='90' />
				<rect x='105' y='6' rx='3' ry='3' width='132' height='9' />
				<rect x='107' y='27' rx='3' ry='3' width='84' height='6' />
				<rect x='107' y='42' rx='3' ry='3' width='121' height='6' />
			</ContentLoader>
		</div>
	)
}

export default OtherCharacterBoxLoader
