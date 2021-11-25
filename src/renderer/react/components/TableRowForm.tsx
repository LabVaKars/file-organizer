import React from 'react'
// import { useDispatch } from 'react-redux'

import TextInput from 'tg_common/TextInput'
// import * as c from 'tg_constants/TableConsts'

// type Reducer<S, A> = (prevState: S, action: A) => S;

// interface RuleStructure {
// 	id: string,
// 	name: string
// }

// interface RulesStructureType {
// 	rules: Array<RuleStructure>
// }

// interface ChangeNameActionType {
// 	type: string,
// 	value: string,
// 	id: number
// }

// interface Props {
// 	selectedRow: Array<RuleStructure>,
// 	reducer: (action: ChangeNameActionType) => void
// }

type Props = any


export default function TableRowForm(props : Props) {

	const {selectedRow} = props

	if(selectedRow && selectedRow.length == 1){

		let sp = selectedRow[0]

		// const dispatch = useDispatch();

		console.log(sp);


		return (
			<>
				<div className="row">
					<div className="col-6">
						<TextInput
							label="Rule name" placeholder="Enter name for new rule..."
							handleChange={() => {}}
							value={sp.name}/>
					</div>
					{/* { sp.errors.name &&
						<div className="col-6">
							<div className="alert alert-danger small p-1">{sp.errors.name}</div>
						</div>
					} */}
				</div>
				{/* <TextInput
					label="Rule base URL" placeholder="Enter base URL for your project..."
					handleChange={(e) => reducer({type: CHANGE_BASE_URL, value: e.target.value, id: sp.id})}
					value={sp.baseUrl}/> */}
			</>
		)
	} else {
		return <>
			<div>Empty Form</div>
		</>
	}
}

