import React from 'react'
import styles from '../styles/Pagination.module.scss'

type PaginationProps = {
	currentPage: number
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
	totalPageCount: number
}

const Pagination = ({
	currentPage,
	setCurrentPage,
	totalPageCount,
}: PaginationProps) => {
	return (
		<div className={styles.container}>
			<button
				onClick={() => setCurrentPage(currentPage - 1)}
				disabled={currentPage - 1 === 0}
			>
				{'<'}
			</button>
			{[...Array(totalPageCount)].map((page, p) => {
				return (
					<div
						key={`pagination-${p.toString()}`}
						className={`${currentPage === p + 1 ? styles.activePage : ''}`}
						onClick={() => setCurrentPage(p + 1)}
					>
						{p + 1}
					</div>
				)
			})}
			<button
				onClick={() => setCurrentPage(currentPage + 1)}
				disabled={currentPage + 1 > totalPageCount}
			>
				{'>'}
			</button>
		</div>
	)
}

export default Pagination
