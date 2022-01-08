import { Rule } from 'main/enums/sqlipc'
import React from 'react'
import { Card } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import EditRuleForm from 'tg_components/forms/EditRuleForm'
import SelectActionForm from 'tg_components/forms/SelectActionForm'
import SelectSubCondForm from 'tg_components/forms/SelectSubCondForm'
import SelectTimetableForm from 'tg_components/forms/SelectTimetableForm'
import SimpleFormModal from 'tg_components/SimpleFormModal'
import UsedRulesTable from 'tg_components/tables/UsedRulesTable'
import { closeModal } from 'tg_reducers/OpenedModalReducer'
import { changeForm, selectAction, selectCondition, selectTimetable } from 'tg_reducers/UsedRulesPageReducer'
import { initTable } from 'tg_reducers/UsedRulesTableReducer'
import { useSql } from '../hooks/utilHooks'

export default function RulesPage() {

	let {
		editId,
		isCopy,
		editType,
		selectedActionId,
		selectedConditionId,
		selectedTimetableId,
	} = useSelector((state:any) => {
		return state.usedRulesPage
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

	let ruleForm = useForm({
		defaultValues: defaultValues
	})

	let dispatch = useDispatch()
	let runSql = useSql()

	let formName="editRuleForm"
	let formLabel="Rule Form"

	const onSubmit = (handleSubmit:any, editId:any, isCopy:any) => {
		if(editId == 0) {
			return () => {
				let onSubmit = (data: any) => {
					runSql(Rule.insertRule, {
						name: data.name,
						description: data.description,
						sourceId: data.sourceId,
						destinationId: data.destinationId,
						type: data.type,
						pattern: data.pattern,
						includeSubfolders: data.includeSubfolders
					})
					getRules()
					closeForm()
				}
				handleSubmit(onSubmit)()
			}
		} else if(editId > 0 && !isCopy){
			return () => {
				let onSubmit = (data: any) => {
					runSql(Rule.updateRule, {
						id: editId,
						name: data.name,
						description: data.description,
						sourceId: data.sourceId,
						destinationId: data.destinationId,
						type: data.type,
						pattern: data.pattern,
						includeSubfolders: data.includeSubfolders
					})
					getRules()
					closeForm()
				}
				handleSubmit(onSubmit)()
			}
		} else if(editId > 0 && isCopy) {
			return () => {
				let onSubmit = (data: any) => {
					runSql(Rule.insertRule, {
						name: data.name,
						description: data.description,
						sourceId: data.sourceId,
						destinationId: data.destinationId,
						type: data.type,
						pattern: data.pattern,
						includeSubfolders: data.includeSubfolders
					})
					getRules()
					closeForm()
				}
				handleSubmit(onSubmit)()
			}
		}
		return
	  }

	const getRules = async () => {
		console.log("Getting rules from")
		let result = await runSql(Rule.getRules)
		dispatch(initTable(result))
		console.log('In React Renderer', result)
	}

	let closeForm  = () => {
		dispatch(closeModal())
		ruleForm.reset()
	}

	let onSubmitSelectAction = async (actionId:any, prevId:any) => {
		dispatch(selectAction(actionId))
		dispatch(changeForm(prevId,"Rule",false))
	}

	let onSubmitSelectCondition = async (conditionId:any, prevId:any) => {
		dispatch(selectCondition(conditionId))
		dispatch(changeForm(prevId,"Rule",false))
	}

	let onSubmitSelectTimetable = async (timetableId:any, prevId:any) => {
		dispatch(selectTimetable(timetableId))
		dispatch(changeForm(prevId,"Rule",false))
	}

	const FormSwitch = ({id, type}:any) => {
		let form = <></>
		if(type == "Rule") {
			form = <EditRuleForm
				form={ruleForm}
				name={formName}
				isNew={(id == 0)}
				ruleId={id}
				selectedActionId={selectedActionId}
				selectedTimetableId={selectedTimetableId}
				selectedConditionId={selectedConditionId}
				onSubmit={onSubmit(ruleForm.handleSubmit, id, isCopy)}
			/>
		} else if(type == "ActionSelect"){
			form = <SelectActionForm
				prevId={id}
				onSubmit={onSubmitSelectAction} />
		} else if(type == "ConditionSelect"){
			form = <SelectSubCondForm
				prevId={id}
				onSubmit={onSubmitSelectCondition} />
		} else if(type == "TimetableSelect"){
			form = <SelectTimetableForm
				prevId={id}
				onSubmit={onSubmitSelectTimetable} />
		}
		return <>
			{form}
		</>
	}

	return (
		<>

			<Card.Header id="pageTitle">
				<h3>
					Used folders
				</h3>
			</Card.Header>
			<Card.Body>
				<SimpleFormModal
				show={modalShow}
				onCancel={closeForm}
				label={formLabel}
				htmlId={"rulesPageModal"}
				>
					<FormSwitch id={editId} type={editType}  />
				</SimpleFormModal>
				<UsedRulesTable
					getRules={getRules}
				/>
			</Card.Body>
		</>
	)
}

