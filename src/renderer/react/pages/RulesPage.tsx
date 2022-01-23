import { Action, Condition, Rule, Timetable } from 'main/enums/sqlipc'
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
import { changeForm, clearForm, saveAction, saveCondition, saveTimetable } from 'tg_reducers/UsedRulesPageReducer'
import { initTable } from 'tg_reducers/UsedRulesTableReducer'
import { useRemoveSchedule, useRuleApply, useSetSchedule, useSql } from '../hooks/utilHooks'

export default function RulesPage() {

	let {
		editId,
		isCopy,
		editType,
		// selectedActionId,
		// selectedConditionId,
		// selectedTimetableId,
		ruleFormState,
		toReload
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
	let ruleApply = useRuleApply()
	let setSchedule = useSetSchedule()
	let removeSchedule = useRemoveSchedule()

	let formName="editRuleForm"
	let formLabel="Rule Form"

	const onSubmit = (handleSubmit:any, editId:any, isCopy:any) => {
		if(editId == 0) {
			return () => {
				let onSubmit = (data: any) => {
					runSql(Rule.insertRule, {
						name: data.name,
						description: data.description,
						actionId: data.actionId,
						conditionId: data.conditionId,
						timetableId: data.timetableId,
						active: data.scheduleActive,
					})
					getRules()
					closeForm()
					handleSchedules(data.scheduleActive == 1, editId, data.timetableId)
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
						actionId: data.actionId,
						conditionId: data.conditionId,
						timetableId: data.timetableId,
						active: data.scheduleActive,
					})
					getRules()
					closeForm()
					handleSchedules(data.scheduleActive == 1, editId, data.timetableId)
				}
				handleSubmit(onSubmit)()
			}
		} else if(editId > 0 && isCopy) {
			return () => {
				let onSubmit = (data: any) => {
					runSql(Rule.insertRule, {
						name: data.name,
						description: data.description,
						actionId: data.actionId,
						conditionId: data.conditionId,
						timetableId: data.timetableId,
						active: data.scheduleActive,
					})
					getRules()
					closeForm()
					handleSchedules(data.scheduleActive == 1, editId, data.timetableId)
				}
				handleSubmit(onSubmit)()
			}
		}
		return
	}

	function handleSchedules(isActive: boolean, ruleId:number, timetableId:number){
		if(timetableId && ruleId){
			if(isActive){
				removeSchedule(ruleId)
				setSchedule(timetableId, ruleId)
			} else {
				removeSchedule(ruleId)
			}
		} else {
			console.log("Missing Ids")
		}
	}

	const getRules = async () => {
		console.log("Getting rules from")
		let result = await runSql(Rule.getRules)
		dispatch(initTable(result))
		console.log('In React Renderer', result)
	}

	let closeForm  = () => {
		dispatch(clearForm())
		dispatch(closeModal())
		ruleForm.reset()
	}

	let onSubmitSelectAction = async (actionId:any, prevId:any) => {
		let action = await runSql(Action.getActionById, actionId)
		dispatch(saveAction(actionId, action.name))
		dispatch(changeForm(prevId,"Rule", false, false))
	}

	let onSubmitSelectCondition = async (conditionId:any, prevId:any) => {
		let condition = await runSql(Condition.getConditionById, conditionId)
		dispatch(saveCondition(conditionId, condition.name))
		dispatch(changeForm(prevId,"Rule", false, false))
	}

	let onSubmitSelectTimetable = async (timetableId:any, prevId:any) => {
		let timetable = await runSql(Timetable.getTimetableById, timetableId)
		dispatch(saveTimetable(timetableId, timetable.name))
		dispatch(changeForm(prevId,"Rule", false, false))
	}

	let onApply = async (ruleId:any) => {
		await ruleApply(ruleId)
		console.log("Rule applied")
	}

	const FormSwitch = ({id, type}:any) => {
		let form = <></>
		if(type == "Rule") {
			form = <EditRuleForm
				form={ruleForm}
				name={formName}
				isNew={(id == 0)}
				ruleId={id}
				// selectedActionId={selectedActionId}
				// selectedTimetableId={selectedTimetableId}
				// selectedConditionId={selectedConditionId}
				onSubmit={onSubmit(ruleForm.handleSubmit, id, isCopy)}
				onApply={onApply}
				toReload={toReload}
				ruleFormState={ruleFormState}
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
					Used rules
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

