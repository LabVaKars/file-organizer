import React from 'react'
import PropTypes from 'prop-types'
import { CHOOSE_ACTION } from 'tg_constants/StepTypes/BrowserActionForm.types'
import { CURRENT_FORM_REDUCER } from 'tg_constants/TestTypes/StepForm.types'

BrowserActionForm.propTypes = {
}

const options = [
	{value: '1', label: 'BACK'},
	{value: '2', label: 'REFRESH'},
	{value: '3', label: 'FORWARD'}
]

export default function BrowserActionForm(props) {

	const {reducer, selectedStep} = props

	let ss = selectedStep[0]

	const {action} = ss.form

	function handleChange(e){
		reducer({type:CURRENT_FORM_REDUCER, action: CHOOSE_ACTION, params: {option:e.target.value}})
	}

	return (
		<>
			{options.map((o, i) => {
				return (
					<div className="form-check form-check-inline">
						<input className="form-check-input" type="radio" name="inlineRadioOptions" id={`inlineRadio${i}`}
							onChange={handleChange} value={o.value} checked={o.value == action} />
						<label className="form-check-label" htmlFor={`inlineRadio${i}`}>{o.label}</label>
					</div>
				)
			})}
		</>
	)
}

