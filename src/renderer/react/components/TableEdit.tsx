import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// import useTableForm from '../hooks/useTableForm'
import TableRowList from 'tg_components/TableRowList'
import TableRowForm from 'tg_components/TableRowForm'
import Button from 'tg_common/Button'

// import * as c from 'tg_constants/TableConsts'
import { initTable } from 'tg_reducers/TableFormReducer'
// type Props = any;

const tableSelector = (state:any) => state.table;

export default function TableEdit() {

	let tableState = useSelector(tableSelector)

	const dispatch = useDispatch()
	// let {
	// 	tableState,
	// 	tableReducer
	//  } = props;


	useEffect(() => {
		console.log("Effect");
		dispatch(
			initTable({
				name: "test",
				idVisible: true,
				columns: [
					{
						id: 1,
						state: {visible: true, sortable: true, filterable: true, groupable: true, orderable: true},
						data: {order: 1, name: "name"}
					}
				],
				rows: [
					{
						id: 1,
						state: {order: 1, isSelected: true},
						data: {name: "teksts1"}
					},
					{
						id: 2,
						state: {order: 2, isSelected: false},
						data: {name: "teksts2"}
					},
					{
						id: 3,
						state: {order: 3, isSelected: false},
						data: {name: "teksts3"}
					},
					{
						id: 4,
						state: {order: 4, isSelected: false},
						data: {name: "teksts4"}
					},
					{
						id: 5,
						state: {order: 5, isSelected: false},
						data: {name: "teksts5"}
					}
				]
			})
		);
		console.log(tableState);
	},[])
	let selectedProject
	// useEffect(() => {
	// 	console.log("tableState2", tableState)
	// 	selectedProject = tableState.table.rows.filter((row: any) => {
	// 		return row.isSelected == true
	// 	})
	// },[])

	return (
		<>
			<div className="card-header">
				<h3>{tableState.name}</h3>
			</div>
			{/* {tableState.hasChanges
				? <div className="alert alert-danger m-0">You have unsaved changes</div>
				: <div className="alert alert-success m-0">All changes saved</div>
			} */}
			<div className="card-header">
				<h4>Project Settings</h4>
			</div>
			<div className="card-header">
				<TableRowForm
					selectedProject={selectedProject}
				/>
			</div>
			<div className="card-body overflow-auto" style={{maxHeight: '300px', minHeight: '300px'}}>
				<TableRowList
					table={tableState}
				/>
			</div>
			<div className="card-footer">
				<Button
					name="Add Project"
					// icon={<i className="fas fa-plus-square"></i>}
					handleClick={
						// () => tableReducer({type: c.ADD_ROW, id:1})
						() => {}
						// () => dispatch(addRow(1))
					} />
				<Button
					name="Save Changes"
					disabled={false}
					// icon={<i className="fas fa-edit"></i>}
					handleClick={
						// () => tableReducer({type: c.SAVE_CHANGES})
						() => {}
					} />
			</div>
		</>
	)

}

