import { Condition, Filter } from 'main/enums/sqlipc'
import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import EditConditionForm from 'tg_components/forms/EditConditionForm'
import EditFilterForm from 'tg_components/forms/EditFilterForm'
import SelectFilterForm from 'tg_components/forms/SelectFilterForm'
import SelectSubCondForm from 'tg_components/forms/SelectSubCondForm'
import SimpleFormModal from 'tg_components/SimpleFormModal'
import UsedConditionsTable from 'tg_components/tables/UsedConditionsTable'
import { closeModal } from 'tg_reducers/OpenedModalReducer'
import { changeForm, removeSelect, selectFilter, selectSubCond } from 'tg_reducers/UsedConditionsPageReducer'
import {initTable as initTableCond} from 'tg_reducers/UsedConditionsTableReducer'
import {initTable as initTableSubCond} from 'tg_reducers/SubConditionsTableReducer'
import { filterValueToJson, useSql } from '../hooks/utilHooks'

export default function ConditionsPage() {

	let {
		selectedFilterId,
		selectedSubCondId,
		editId,
		prevId,
		editType,
		formName,
		formLabel
	} = useSelector((state:any) => {
		return state.usedConditionsPage
	})

	useEffect(() => {
		console.log("EDIT ID CHANGED!!!!!!!!!!!!!!!!!!!!!!")
	},[editId])

	let {
		modalShow
	} = useSelector((state:any) => {
		return state.openedModal
	})

	let runSql = useSql()
	let dispatch = useDispatch()


	const condFormDefaults = {
        name: "New Condition",
        description: "",
        assosiation: "OR"
    }

	const getConditions = async () => {
		console.log("Getting conditions from")
		let result = await runSql(Condition.getConditions)
		dispatch(initTableCond(result))
		console.log('In React Renderer', result)
		return
	}

	const filterForm = useForm()

	const conditionForm = useForm({
        mode: "all",
        reValidateMode: "onChange",
        defaultValues: {
			name: condFormDefaults.name,
			description: condFormDefaults.description,
			assosiation: condFormDefaults.assosiation
		}
    })


	let onSubmitFilter = (handleSubmit:any, filterId:any, prevId:any) => {
		return () => {
			let onSubmit= async (data:any) => {
				console.log("Submitting filter form")
				await runSql(Filter.updateFilter, {
					id: filterId,
					name: data._name,
					description: data._description,
					field: data._field,
					comparator: data._comparator,
					value: filterValueToJson(data)
				})
				let prevPrevId = await runSql(Filter.getPrevConditionId, prevId)
				dispatch(changeForm(prevId,prevPrevId,"Condition",false))
			}
			handleSubmit((data:any) => onSubmit(data))()
		}
	}

	let onSubmitSubCond = (handleSubmit:any, conditionId:any, prevId:any) => {
		return () => {
			let onSubmit= async (data:any) => {
				console.log("Submitting subCondition form")
				await runSql(Condition.updateCondition, {
					id: conditionId,
					name: data.name,
					description: data.description,
					assosiation: data.assosiation,
				})
				if(prevId == 0){ // root
					dispatch(closeModal())
					getConditions()
				} else {
					let prevPrevId = await runSql(Condition.getPrevConditionId, prevId)
					dispatch(changeForm(prevId,prevPrevId,"Condition",false))
				}
			}
			handleSubmit((data:any) => onSubmit(data))()
		}
	}



	let onSubmitSelectFilter = async (filterId:any, prevId:any) => {
		dispatch(selectFilter(filterId))
		let prevPrevId = await runSql(Filter.getPrevConditionId, prevId)
		dispatch(changeForm(prevId,prevPrevId,"Condition",false))
	}

	let onSubmitSelectSubCond = async (conditionId:any, prevId:any) => {
		dispatch(selectSubCond(conditionId))
		let prevPrevId = await runSql(Condition.getPrevConditionId, prevId)
		dispatch(changeForm(prevId,prevPrevId,"Condition",false))
	}

	const getSubConditions = async (conditionId: any) => {
		console.log("Getting conditions from")
		let result = await runSql(Condition.getSubConditions, conditionId)
		dispatch(initTableSubCond(result))
		console.log('In React Renderer', result)
	  }

	  const addExistingFilter = async (editId:any, existId:any) => {
		await runSql(Condition.addFilter, editId, existId)
		dispatch(removeSelect())
		getSubConditions(editId)
	  }

	  const addExistingSubCond = async (editId:any, existId:any) => {
		await runSql(Condition.addSubCondition, editId, existId)
		dispatch(removeSelect())
		getSubConditions(editId)
	  }


	  useEffect(() => {
		if(selectedFilterId != 0) addExistingFilter(editId, selectedFilterId)
	  },[selectedFilterId])

	  useEffect(() => {
		if(selectedSubCondId != 0) addExistingSubCond(editId, selectedSubCondId)
	  },[selectedSubCondId])

	const FormSwitch = ({id, prevId, type, links}:any) => {
		let form = <></>
		if(type == "Filter") {
			form = <EditFilterForm
				form={filterForm}
				name={formName}
				isNew={(id == 0)}
				filterId={id}
				onSubmit={onSubmitFilter(filterForm.handleSubmit, editId, prevId)}
			/>
		} else if(type == "Condition"){
			form = <EditConditionForm
				form={conditionForm}
				name={formName}
				isNew={(id == 0)}
				prevId={prevId}
				conditionId={id}
				selectedFilterId={selectedFilterId}
				selectedSubCondId={selectedSubCondId}
				onSubmit={onSubmitSubCond(conditionForm.handleSubmit, editId, prevId)}
			/>
		} else if(type == "FilterSelect"){
			form = <SelectFilterForm
				prevId={prevId}
				onSubmit={onSubmitSelectFilter} />
		} else if(type == "ConditionSelect"){
			form = <SelectSubCondForm
				prevId={prevId}
				onSubmit={onSubmitSelectSubCond} />
		}

		return <>
		  {/* <Breadcrumb links={links} changeBreadcrumb={changeBreadcrumb} /> */}
		  {form}
		</>
	}

	let closeForm  = () => {
		dispatch(closeModal())
	}

	return (
		<>

			<Card.Header id="pageTitle">
				<h3>
					Used conditions
				</h3>
			</Card.Header>
			<Card.Body>
				<UsedConditionsTable
					getConditions={getConditions}
				/>
				<SimpleFormModal
					show={modalShow}
					onCancel={closeForm}
					label={formLabel}
					htmlId={"conditionsPageModal"}>
					<FormSwitch id={editId} prevId={prevId} type={editType}  />
				</SimpleFormModal>
			</Card.Body>
		</>
	)
}

