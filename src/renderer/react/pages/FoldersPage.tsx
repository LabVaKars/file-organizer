import { Folder } from 'main/enums/sqlipc'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import EditFolderForm from 'tg_components/EditFolderForm'
import SimpleFormModal from 'tg_components/SimpleFormModal'
import UsedFoldersTable from 'tg_components/UsedFoldersTable'
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
			<SimpleFormModal
			show={modalShow}
			onCancel={closeForm}
			name={formName}
			label={formLabel}
			onSubmit={()=> {console.log("Form submitted from Modal")}}
			>
				<EditFolderForm
					form={folderForm}
					name={formName}
					isNew={(editId == 0)}
					folderId={editId}
					onSubmit={onSubmit(folderForm.handleSubmit, editId, isCopy)}
				/>
			</SimpleFormModal>
			<UsedFoldersTable
				getFolders={getFolders}
			/>
		</>
	)
}

