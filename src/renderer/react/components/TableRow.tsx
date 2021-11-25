import React from 'react'

// import {useDrag, useDrop} from 'react-dnd'
// import {useHistory} from 'react-router-dom'
// import * as c from 'tg_constants/TableConsts'


// interface Props{

// }

type Props = any

export default function TableRow(props: Props) {

	// let history = useHistory()

	const {
		columnsOrder,
		tableRow,
		// errors,
		index,
	} = props

	let bgColor = '#ffffff'
	// if(Object.keys(errors).length > 0) bgColor = '#f8d7da'
	if(tableRow.isSelected) bgColor = '#d4edda'

	let trStyle = {
		backgroundColor: bgColor
	}

	console.log("tableRow",tableRow)

	return (
		<>
			<tr /*ref={ref}*/ style={trStyle} onClick={() => {}} >
				<td style={{width: '50px'}}>
					<div className="input-group">
						{index + 1}
					</div>
				</td>
				{columnsOrder.map((column: any) => {
					return <td>{tableRow[column]}</td>
				})}
				<td>
					<div className="d-flex align-items-center justify-content-around">
						<i className="fas fa-trash-alt text-danger" onClick={(e) => {
							e.stopPropagation()
							// reducer({type: c.DELETE_ROW, id:tableRow.id})
						}}></i>
					</div>
				</td>
			</tr>
		</>
	)
}

