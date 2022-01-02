import { Condition, Filter } from 'main/enums/sqlipc'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import EditConditionForm from 'tg_components/EditConditionForm'
import EditFilterForm from 'tg_components/EditFilterForm'
import SelectFilterForm from 'tg_components/SelectFilterForm'
import SelectSubCondForm from 'tg_components/SelectSubCondForm'
import SimpleFormModal from 'tg_components/SimpleFormModal'
import UsedConditionsTable from 'tg_components/UsedConditionsTable'
import { closeModal } from 'tg_reducers/OpenedModalReducer'
import { changeForm, selectFilter, selectSubCond } from 'tg_reducers/UsedConditionsPageReducer'
import { useSql } from '../hooks/utilHooks'

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
				field: data._field,
				comparator: data._comparator,
				value: data._value
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
				} else {
					let prevPrevId = await runSql(Condition.getPrevConditionId, prevId)
					dispatch(changeForm(prevId,prevPrevId,"Condition",false))
				}
			}
			handleSubmit((data:any) => onSubmit(data))()
		}
	}

	useEffect(() => {

	},[selectedFilterId])

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

	const FormSwitch = ({id, prevId, type, links}:any) => {
		let form = <></>
		if(type == "Filter") {
			form = <EditFilterForm
				form={filterForm}
				name={formName}
				isNew={(id == 0)}
				prevId={prevId}
				filterId={id}
				onSubmit={onSubmitFilter(filterForm.handleSubmit, editId, prevId)}
				isCopy={false} />
		} else if(type == "Condition"){
			form = <EditConditionForm
				form={conditionForm}
				name={formName}
				isNew={(id == 0)}
				prevId={prevId}
				conditionId={id}
				selectedFilterId={selectedFilterId}
				selectedSubCondId={selectedSubCondId}
				onSubmit={onSubmitSubCond(conditionForm.handleSubmit, editId, prevId)} />
		} else if(type == "FilterSelect"){
			form = <SelectFilterForm
				prevId={prevId}
				conditionId={id}
				onSubmit={onSubmitSelectFilter} />
		} else if(type == "ConditionSelect"){
			form = <SelectSubCondForm
				prevId={prevId}
				conditionId={id}
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
			<UsedConditionsTable />
			<SimpleFormModal
				show={modalShow}
				onCancel={closeForm}
				name={formName}
				label={formLabel}
				onSubmit={(e:any) => {
					e.preventDefault()
					console.log("Submitted Form")
				}}>
				<FormSwitch id={editId} prevId={prevId} type={editType}  />
			</SimpleFormModal>
		</>
	)
}

