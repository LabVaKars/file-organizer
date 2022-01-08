import { Folder } from 'main/enums/sqlipc'
import React from 'react'
import { Card } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import EditFolderForm from 'tg_components/forms/EditFolderForm'
import SimpleFormModal from 'tg_components/SimpleFormModal'
import UsedFoldersTable from 'tg_components/tables/UsedFoldersTable'
import { closeModal } from 'tg_reducers/OpenedModalReducer'
import { initTable } from 'tg_reducers/UsedFoldersTableReducer'
import { useSql } from '../hooks/utilHooks'

export default function FoldersPage() {

	let {
		editId,
		isCopy
	} = useSelector((state:any) => {
		return state.usedFoldersPage
	})

	let {
		modalShow
	} = useSelector((state:any) => {
		return state.openedModal
	})

	const defaultValues = {
		name: "",
		path: ""
	  }

	let folderForm = useForm({
		defaultValues: defaultValues
	})

	let dispatch = useDispatch()
	let runSql = useSql()

	let formName="editFolderForm"
	let formLabel="Folder Form"

	const onSubmit = (handleSubmit:any, editId:any, isCopy:any) => {
		if(editId == 0) {
			return () => {
				let onSubmit = (data: any) => {
					runSql(Folder.insertFolder, {
					name: data.name,
					description: data.description,
					path: data.path
					})
					getFolders()
					closeForm()
				}
				handleSubmit(onSubmit)()
			}
		} else if(editId > 0 && !isCopy){
			return () => {
				let onSubmit = (data: any) => {
					runSql(Folder.updateFolder, {
					id: editId,
					name: data.name,
					description: data.description,
					path: data.path
					})
					getFolders()
					closeForm()
				}
				handleSubmit(onSubmit)()
			}
		} else if(editId > 0 && isCopy) {
			return () => {
				let onSubmit = (data: any) => {
					runSql(Folder.insertFolder, {
					name: data.name,
					description: data.description,
					path: data.path
					})
					getFolders()
					closeForm()
				}
				handleSubmit(onSubmit)()
			}
		}
		return
	  }

	const getFolders = async () => {
		console.log("Getting folders from")
		let result = await runSql(Folder.getFolders)
		dispatch(initTable(result))
		console.log('In React Renderer', result)
	}

	let closeForm  = () => {
		dispatch(closeModal())
		folderForm.reset()
	}

	return (
		<>
			<Card.Header id="pageTitle">
				<h3>
					Used folders
				</h3>
			</Card.Header>

			<Card.Body>
				<UsedFoldersTable
					getFolders={getFolders}
				/>
				<SimpleFormModal
					show={modalShow}
					onCancel={closeForm}
					label={formLabel}
					htmlId={"foldersPageModal"}
				>
					<EditFolderForm
						form={folderForm}
						name={formName}
						isNew={(editId == 0)}
						folderId={editId}
						onSubmit={onSubmit(folderForm.handleSubmit, editId, isCopy)}
					/>
				</SimpleFormModal>
			</Card.Body>
		</>
	)
}

