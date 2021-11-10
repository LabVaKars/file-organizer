import React, { useEffect } from 'react'

// import useTableForm from '../hooks/useTableForm'
import TableRowList from 'tg_components/TableRowList'
import TableRowForm from 'tg_components/TableRowForm'
import Button from 'tg_common/Button'

import * as c from 'tg_constants/TableTypes'

type Props = any;

export default function TableEdit(props : Props) {

	let {
		tableState,
		tableReducer
	 } = props;

	useEffect(() => {
		console.log("Effect");
		tableReducer({type:c.INIT_TABLE, table:{
				name: "test",
				columns: [
					{order: 1, name: "id", visible: true},
					{order: 2, name: "name", visible: true}
				],
				rows: [
					{id:1, name: "teksts1", isSelected: true},
					{id:2, name: "teksts2", isSelected: false},
					{id:3, name: "teksts3", isSelected: false},
					{id:4, name: "teksts4", isSelected: false},
					{id:5, name: "teksts5", isSelected: false},
				]
			}
		});
		console.log(tableState);
	},[])
	let selectedProject
	console.log("tableState1", tableState)
	useEffect(() => {
		console.log("tableState2", tableState)
		selectedProject = tableState.table.rows.filter((row: any) => {
			return row.isSelected == true
		})
	},[])

	return (
		<>
			<div className="card-header">
				<h3>{tableState.table.name}</h3>
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
					reducer={tableReducer}
					selectedProject={selectedProject}
				/>
			</div>
			<div className="card-body overflow-auto" style={{maxHeight: '300px', minHeight: '300px'}}>
				<TableRowList
					table={tableState.table}
					reducer={tableReducer}
				/>
			</div>
			<div className="card-footer">
				<Button
					name="Add Project"
					// icon={<i className="fas fa-plus-square"></i>}
					handleClick={() => tableReducer({type: c.ADD_ROW, id:1})} />
				<Button
					name="Save Changes"
					disabled={!tableState.hasChanges}
					// icon={<i className="fas fa-edit"></i>}
					handleClick={() => tableReducer({type: c.SAVE_CHANGES})} />
			</div>
		</>
	)

}

