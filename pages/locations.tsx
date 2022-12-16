import React, { useEffect, useState } from 'react'
import { useGetLocationsQuery } from '../service/api'
import LocationBox from '../components/location-box'
import styles from '../styles/Locations.module.scss'
import ILocationResponse from '../interfaces/location-response.interface'
import MainLayout from '../layouts/main-layout'
import Pagination from '../components/pagination'
import LocationBoxLoader from '../components/location-box-loader'

const Locations = () => {
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPageCount, setTotalPageCount] = useState<number>(1)

	const {
		data: locationsData,
		isLoading: locationsIsLoading,
		refetch: locationsRefetch,
	} = useGetLocationsQuery(currentPage)

	useEffect(() => {
		if (locationsData && locationsData.info) {
			setTotalPageCount(locationsData.info.pages)
		}
	}, [locationsData])

	return (
		<MainLayout>
			<div>
				{locationsIsLoading ? (
					<div className={styles.wrapper}>
						{[...Array(20)].map((data, d) => {
							return (
								<div key={`location-loader-${d.toString()}`}>
									<LocationBoxLoader />
								</div>
							)
						})}
					</div>
				) : (
					<div>
						<div className={styles.wrapper}>
							{locationsData.results.map(
								(data: ILocationResponse, d: number) => {
									return (
										<div key={`location-${d.toString()}`}>
											<LocationBox
												id={data.id}
												name={data.name}
												type={data.type}
												dimension={data.dimension}
												residentCount={data.residents.length}
											/>
										</div>
									)
								},
							)}
						</div>
						<Pagination
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							totalPageCount={totalPageCount}
						/>
					</div>
				)}
			</div>
		</MainLayout>
	)
}

export default Locations
