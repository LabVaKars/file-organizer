import React from 'react'
import { useParams } from 'react-router'

interface Props {
    isNew: boolean
}

export default function EditFilterPage({isNew} : Props) {

	const { filter_id } = useParams()

	console.log("Params", filter_id)

	return (
		<>
			{/* <EditFilterForm isNew={isNew} filterId={filter_id} /> */}
		</>
	)
}
