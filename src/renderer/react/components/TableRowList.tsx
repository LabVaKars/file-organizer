import React from 'react'
import Loading from 'tg_common/Loading'

import TableRow from 'tg_components/TableRow'

type Props = any

export default function TableRowList(props: Props) {

	const {
		table,
		reducer,
		projectsLoading
	} = props

	console.log(table)

	let columnsOrder = table.columns.sort((fst: any, snd: any) => {
		return fst.order - snd.order;
	}).map((tableColumn: any) => {
		return tableColumn.name
	})


	return (
		<>
			<table className="table table-bordered">
				<thead>
					<tr>
						<th style={{width: '50px'}}>#</th>
						{table.columns.sort((fst: any, snd: any) => {
							return fst.order - snd.order;
						}).map((tableColumn: any) => {
							return tableColumn.visible
								? (<th key={tableColumn.name} style={{width: '50px'}}>{tableColumn.name}</th>) : ""
						})}
						<th style={{width: '100px'}}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{projectsLoading ? (
						<tr>
							<td colSpan={5} className="text-center">
								<Loading />
							</td>
						</tr>
					) :	(
						<>
							{table.rows.map((tableRow: any, i: number) => {
								return (<TableRow
									reducer={reducer}
									columnsOrder={columnsOrder}
									tableRow={tableRow}
									index={i}
								/>)
							})}
						</>
					)}
				</tbody>
			</table>
		</>
	)
}

