import React from 'react'
import styles from '../styles/Layout.module.scss'
import Logo from '../assets/images/Logo.svg'
import IconArrowLeft from '../assets/icons/ArrowLeft.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

type MainLayoutProps = {
	children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
	const router = useRouter()

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>
					<Link href='/'>
						<Image src={Logo} alt='logo' width={210} loading='lazy' />
					</Link>
					<div onClick={() => router.back()}>
						<Image
							src={IconArrowLeft}
							alt='arrow-left'
							width={36}
							loading='lazy'
						/>
					</div>
				</div>
			</div>
			<div className={styles.childrenWrapper}>{children}</div>
		</div>
	)
}

export default MainLayout
