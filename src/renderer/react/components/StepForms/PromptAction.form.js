import React from 'react'
import PropTypes from 'prop-types'
import { CURRENT_FORM_REDUCER } from 'tg_constants/TestTypes/StepForm.types'
import { CHANGE_OPTION } from 'tg_constants/StepTypes/PromptAction.types'

PromptActionForm.propTypes = {
}

const options = [
	{value: '0', label: 'DECLINE'},
	{value: '1', label: 'ACCEPT'}
]

export default function PromptActionForm(props) {

	const {reducer, selectedStep} = props

	let ss = selectedStep[0]

	const {answer} = ss.form

	function handleChange(e){
		reducer({type:CURRENT_FORM_REDUCER, action: CHANGE_OPTION, params: {answer: e.target.value}})
	}

	return (
		<>
			{options.map((o, i) => {
				return (
					<div className="form-check form-check-inline">
						<input className="form-check-input" type="radio" name="inlineRadioOptions" id={`inlineRadio${i}`}
							onChange={handleChange} value={o.value} checked={o.value == answer} />
						<label className="form-check-label" htmlFor={`inlineRadio${i}`}>{o.label}</label>
					</div>
				)
			})}
		</>
	)
}

