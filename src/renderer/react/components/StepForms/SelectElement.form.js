import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import { CURRENT_FORM_REDUCER, ADD_ELEM_STEP } from 'tg_constants/TestTypes/StepForm.types'
import { CHANGE_NAME, CHANGE_CSS_SELECTOR } from 'tg_constants/StepTypes/SelectElem.types'
import TextInput from 'tg_common/TextInput'
import Button from 'tg_common/Button'
import { EMPTY_STEP, SELECT_ELEM } from 'tg_constants/Step.types'

SelectElementForm.propTypes = {
	id: PropTypes.number,
}

export default function SelectElementForm(props) {

	const {reducer, selectedStep} = props

	let ss = selectedStep[0]

	let name = ss.form.name
	let cssSelector = ss.form.cssSelector

	function changeName(e){
		reducer({type: CURRENT_FORM_REDUCER, action: CHANGE_NAME, params: {name: e.target.value}})
	}

	function changeCss(e){
		reducer({type: CURRENT_FORM_REDUCER, action: CHANGE_CSS_SELECTOR, params: {cssSelector: e.target.value}})
	}

	function addElementStep(){
		let id = shortid.generate()
		reducer({type: ADD_ELEM_STEP, id: id, stype: EMPTY_STEP, elemId: ss.id})
	}

	return (
		<>
			<div className="row">
				<div className="col-6">
					<TextInput label="Name" placeholder="Name..." name="name"
						handleChange={changeName} value={name}
					/>
				</div>
				{ss.errors[SELECT_ELEM] && ss.errors[SELECT_ELEM].name &&
					<div className="col-6">
						<div className="alert alert-danger small p-1">{ss.errors[SELECT_ELEM].name}</div>
					</div>
				}
			</div>
			<div className="row">
				<div className="col-6">
					<TextInput label="CSS selector" placeholder="CSS selector..." name="cssValue"
						handleChange={changeCss} value={cssSelector}
					/>
				</div>
				{ss.errors[SELECT_ELEM] && ss.errors[SELECT_ELEM].cssSelector &&
					<div className="col-6">
						<div className="alert alert-danger small p-1">{ss.errors[SELECT_ELEM].cssSelector}</div>
					</div>
				}
			</div>
			<Button name="Add Element Step" handleClick={addElementStep}/>
		</>
	)
}

