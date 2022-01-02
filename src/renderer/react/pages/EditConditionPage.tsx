import React from 'react'
import { useParams } from 'react-router'


interface Props {
    isNew: boolean
}

export default function EditConditionPage({isNew} : Props) {

	const { condition_id } = useParams()

	console.log("Params", condition_id)

	return (
		<>
			{/* <EditConditionForm isNew={isNew} conditionId={condition_id} /> */}
		</>
	)
}
