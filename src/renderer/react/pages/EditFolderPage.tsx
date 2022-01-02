import React from 'react'
import { useParams } from 'react-router'

// import EditFolderForm from 'tg_components/EditFolderForm'

interface Props {
    isNew: boolean
}

export default function EditFolderPage({isNew} : Props) {

	const { folder_id } = useParams()

	console.log("Params", folder_id)

	return (
		<>
			{/* <EditFolderForm isNew={isNew} folderId={folder_id} /> */}
		</>
	)
}
