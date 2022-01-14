import { Action, Folder } from 'main/enums/sqlipc'
import React from 'react'
import { Card } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import EditActionForm from 'tg_components/forms/EditActionForm'
import SelectFolderForm from 'tg_components/forms/SelectFolderForm'
import SimpleFormModal from 'tg_components/SimpleFormModal'
import UsedActionsTable from 'tg_components/tables/UsedActionsTable'
import { closeModal } from 'tg_reducers/OpenedModalReducer'
// import { closeModal } from 'tg_reducers/OpenedModalReducer'
import { clearForm, moveToForm, saveDestinationFolder, saveSourceFolder } from 'tg_reducers/UsedActionsPageReducer'
import { initTable } from 'tg_reducers/UsedActionsTableReducer'
import { useSql } from '../hooks/utilHooks'

export default function ActionsPage() {

	let {
		editId,
		isCopy,
		editType,
		// selectedSourceFolderId,
		// selectedDestinationFolderId,
		actionFormState,
		toReload
	} = useSelector((state:any) => {
		return state.usedActionsPage
	})

	let {
		modalShow
	} = useSelector((state:any) => {
		return state.openedModal
	})

	let actionForm = useForm({
		defaultValues: {
			name: "",
			description: "",
			type: "",
			sourceId: 0,
			source: "",
			destinationId: 0,
			destination: "",
			pattern: "",
			includeSubfolders: ""
		}
	})

	let dispatch = useDispatch()
	let runSql = useSql()

	let formName="editActionForm"
	let formLabel="Action Form"

	const onSubmit = (handleSubmit:any, editId:any, isCopy:any) => {
		if(editId == 0) {
			return () => {
				let onSubmit = (data: any) => {
					runSql(Action.insertAction, {
						name: data.name,
						description: data.description,
						sourceId: data.sourceId,
						destinationId: data.destinationId,
						type: data.type,
						pattern: data.pattern,
						includeSubfolders: data.includeSubfolders
					})
					getActions()
					closeForm()
				}
				handleSubmit(onSubmit)()
			}
		} else if(editId > 0 && !isCopy){
			return () => {
				let onSubmit = (data: any) => {
					runSql(Action.updateAction, {
						id: editId,
						name: data.name,
						description: data.description,
						sourceId: data.sourceId,
						destinationId: data.destinationId,
						type: data.type,
						pattern: data.pattern,
						includeSubfolders: data.includeSubfolders
					})
					getActions()
					closeForm()
				}
				handleSubmit(onSubmit)()
			}
		} else if(editId > 0 && isCopy) {
			return () => {
				let onSubmit = (data: any) => {
					runSql(Action.insertAction, {
						name: data.name,
						description: data.description,
						sourceId: data.sourceId,
						destinationId: data.destinationId,
						type: data.type,
						pattern: data.pattern,
						includeSubfolders: data.includeSubfolders
					})
					getActions()
					closeForm()
				}
				handleSubmit(onSubmit)()
			}
		}
		return
	  }

	const getActions = async () => {
		console.log("Getting actions from")
		let result = await runSql(Action.getActions)
		dispatch(initTable(result))
		console.log('In React Renderer', result)
	}

	// const clearForm = () => {
	// 	let formValues = actionForm.getValues()
	// 	console.log("Before", formValues)
	// 	for(const key of Object.keys(formValues)){
	// 		console.log(key)
	// 		actionForm.setValue(key, "")
	// 	}
	// 	console.log("After", actionForm.getValues())

	// }

	let closeForm  = () => {
		dispatch(clearForm())
		dispatch(closeModal())
		actionForm.reset()
	}

	let onSubmitSelectSourceFolder = async (folderId:any, prevId:any) => {
		let folder =  await runSql(Folder.getFolderById, folderId)
		dispatch(saveSourceFolder(folderId, folder.path))
		dispatch(moveToForm("Action", false))
	}

	let onSubmitSelectDestinationFolder = async (folderId:any, prevId:any) => {
		let folder =  await runSql(Folder.getFolderById, folderId)
		dispatch(saveDestinationFolder(folderId, folder.path))
		dispatch(moveToForm("Action", false))
	}

	const FormSwitch = ({id, type}:any) => {
		let form = <></>
		if(type == "Action") {
			form = <EditActionForm
				form={actionForm}
				name={formName}
				isNew={(id == 0)}
				actionId={id}
				// selectedSourceFolderId={selectedSourceFolderId}
				// selectedDestinationFolderId={selectedDestinationFolderId}
				onSubmit={onSubmit(actionForm.handleSubmit, id, isCopy)}
				toReload={toReload}
				actionFormState={actionFormState}
			/>
		} else if(type == "SourceFolderSelect"){
			form = <SelectFolderForm
				prevId={id}
				onSubmit={onSubmitSelectSourceFolder} />
		} else if(type == "DestinationFolderSelect"){
			form = <SelectFolderForm
				prevId={id}
				onSubmit={onSubmitSelectDestinationFolder} />
		}
		return <>
			{form}
		</>
	}

	return (
		<>

			<Card.Header id="pageTitle">
				<h3>
					Used actions
				</h3>
			</Card.Header>
			<Card.Body>
				<SimpleFormModal
				show={modalShow}
				onCancel={closeForm}
				label={formLabel}
				htmlId={"actionsPageModal"}
				>
					<FormSwitch id={editId} type={editType}  />
				</SimpleFormModal>
				<UsedActionsTable
					getActions={getActions}
				/>
			</Card.Body>
		</>
	)
}

