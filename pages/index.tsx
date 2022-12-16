import { useRouter } from 'next/router'
import styles from '../styles/Home.module.scss'
import ImageBanner from '../assets/images/banner.png'
import GifPortal from '../assets/images/portal.gif'
import Image from 'next/image'
import { useGetCharactersQuery } from '../service/api'
import { useEffect, useState } from 'react'

export default function Home() {
	const router = useRouter()
	const [currentPage, setCurrentPage] = useState<number>(1)

	const { data: charactersData } = useGetCharactersQuery(currentPage)

	useEffect(() => {
		if (charactersData && charactersData.info) {
			if (currentPage + 1 <= charactersData.info.pages) {
				setCurrentPage(currentPage + 1)
			}
		}
	}, [charactersData])

	return (
		<div className={styles.container}>
			<div className={styles.portalWrapper}>
				<Image src={GifPortal} alt='portal' loading='lazy' />
				<button onClick={() => router.push('/locations')}>LOCATIONS</button>
			</div>
			<div className={styles.imageWrapper}>
				<Image src={ImageBanner} alt='banner' loading='lazy' />
			</div>
		</div>
	)
}
