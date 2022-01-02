import { Filter } from 'main/enums/sqlipc'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import EditFilterForm from 'tg_components/EditFilterForm'
import SimpleFormModal from 'tg_components/SimpleFormModal'
import UsedFiltersTable from 'tg_components/UsedFiltersTable'
import { closeModal } from 'tg_reducers/OpenedModalReducer'
import { initTable } from 'tg_reducers/UsedFiltersTableReducer'
import { useSql } from '../hooks/utilHooks'

export default function FiltersPage() {

	let {
		editId,
		isCopy
	} = useSelector((state:any) => {
		return state.usedFiltersPage
	})

	let {
		modalShow
	} = useSelector((state:any) => {
		return state.openedModal
	})


	let filterForm = useForm()

	let dispatch = useDispatch()
	let runSql = useSql()

	let formName = "editFilterForm"
	let formLabel = "Filter Form"

	const getFilters = async () => {
		console.log("Getting filters from")
		let result = await runSql(Filter.getFilters)
		dispatch(initTable(result))
		console.log('In React Renderer', result)
	  }

    const onSubmit = (handleSubmit:any, editId:any, isCopy:any) => {
		if(editId == 0) {
			return () => {
				let onSubmit = (data: any) => {
					runSql(Filter.insertFilter, {
					field: data._field,
					comparator: data._comparator,
					value: data._value
					})
					getFilters()
					closeForm()
					filterForm.reset()
				}
				handleSubmit(onSubmit)()
			}
		} else if(editId > 0 && !isCopy){
		  return () => {
			  	console.log("Submitting form")
				let onSubmit = (data: any) => {
					runSql(Filter.updateFilter, {
					id: editId,
					field: data._field,
					comparator: data._comparator,
					value: data._value
					})
					getFilters()
					closeForm()
					filterForm.reset()
				}
				handleSubmit(onSubmit)()
			}
		} else if(editId > 0 && isCopy) {
		  return () => {
				let onSubmit = (data: any) => {
					runSql(Filter.insertFilter, {
					field: data._field,
					comparator: data._comparator,
					value: data._value
					})
					getFilters()
					closeForm()
					filterForm.reset()
				}
				handleSubmit(onSubmit)()
			}
		}
		return
	  }

	let closeForm  = () => {
		dispatch(closeModal())
		filterForm.reset()
	}

	return (
		<>
			<SimpleFormModal
                show={modalShow}
                onCancel={closeForm}
                name={formName}
                label={formLabel}
                onSubmit={(e:any)=> {
					e.preventDefault()
					console.log("Form submitted from Modal")
				}}
              >
				<EditFilterForm
					form={filterForm}
					name={formName}
					isNew={(editId == 0)}
					filterId={editId}
					onSubmit={onSubmit(filterForm.handleSubmit, editId, isCopy)}
					isCopy={isCopy}
					prevId={0}
				/>
			</SimpleFormModal>
			<UsedFiltersTable
				getFilters={getFilters}
			/>
		</>
	)
}

