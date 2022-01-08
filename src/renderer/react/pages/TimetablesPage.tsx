import { Timetable } from 'main/enums/sqlipc'
import React from 'react'
import { Card } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import EditTimetableForm from 'tg_components/forms/EditTimetableForm'
import SimpleFormModal from 'tg_components/SimpleFormModal'
import UsedTimetablesTable from 'tg_components/tables/UsedTimetablesTable'
import { closeModal } from 'tg_reducers/OpenedModalReducer'
import { initTable } from 'tg_reducers/UsedTimetablesTableReducer'
import { useSql } from '../hooks/utilHooks'

export default function TimetablesPage() {

	let {
		editId,
		isCopy
	} = useSelector((state:any) => {
		return state.usedTimetablesPage
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

	let timetableForm = useForm({
		defaultValues: defaultValues
	})

	let dispatch = useDispatch()
	let runSql = useSql()

	let formName="editTimetableForm"
	let formLabel="Timetable Form"

	const onSubmit = (handleSubmit:any, editId:any, isCopy:any) => {
		if(editId == 0) {
			return () => {
				let onSubmit = (data: any) => {
					runSql(Timetable.insertTimetable, {
						name: data.name,
						description: data.description,
						startDate: data.startDate,
						startTime: data.startTime,
						frequency: data.frequency,
						frequencyMeasure: data.frequencyMeasure,
					})
					getTimetables()
					closeForm()
				}
				handleSubmit(onSubmit)()
			}
		} else if(editId > 0 && !isCopy){
			return () => {
				let onSubmit = (data: any) => {
					runSql(Timetable.updateTimetable, {
						id: editId,
						name: data.name,
						description: data.description,
						startDate: data.startDate,
						startTime: data.startTime,
						frequency: data.frequency,
						frequencyMeasure: data.frequencyMeasure,
					})
					getTimetables()
					closeForm()
				}
				handleSubmit(onSubmit)()
			}
		} else if(editId > 0 && isCopy) {
			return () => {
				let onSubmit = (data: any) => {
					runSql(Timetable.insertTimetable, {
						name: data.name,
						description: data.description,
						startDate: data.startDate,
						startTime: data.startTime,
						frequency: data.frequency,
						frequencyMeasure: data.frequencyMeasure,
					})
					getTimetables()
					closeForm()
				}
				handleSubmit(onSubmit)()
			}
		}
		return
	  }

	const getTimetables = async () => {
		console.log("Getting timetables from")
		let result = await runSql(Timetable.getTimetables)
		dispatch(initTable(result))
		console.log('In React Renderer', result)
	}

	let closeForm  = () => {
		dispatch(closeModal())
		timetableForm.reset()
	}

	return (
		<>
			<Card.Header id="pageTitle">
				<h3>
					Used folders
				</h3>
			</Card.Header>
			<Card.Body>
				<UsedTimetablesTable
					getTimetables={getTimetables}
				/>
				<SimpleFormModal
					show={modalShow}
					onCancel={closeForm}
					label={formLabel}
					htmlId={"timetablePageModal"}				>
					<EditTimetableForm
						form={timetableForm}
						name={formName}
						isNew={(editId == 0)}
						timetableId={editId}
						onSubmit={onSubmit(timetableForm.handleSubmit, editId, isCopy)}
					/>
				</SimpleFormModal>
			</Card.Body>
		</>
	)
}

