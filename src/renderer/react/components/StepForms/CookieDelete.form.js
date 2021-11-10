import React from 'react'
import PropTypes from 'prop-types'
import TextInput from 'tg_common/TextInput'
import { CURRENT_FORM_REDUCER } from 'tg_constants/TestTypes/StepForm.types'
import { CHANGE_COOKIE } from 'tg_constants/StepTypes/CookieDelete.types'

CookieDeleteForm.propTypes = {
}

export default function CookieDeleteForm(props) {

    const {reducer, selectedStep} = props

	let ss = selectedStep[0]

	let cookie = ss.form.cookie

	function handleChangeCookie(e){
		reducer({type:CURRENT_FORM_REDUCER, action: CHANGE_COOKIE, params: {cookie: e.target.value}})
	}

	return (
        <TextInput name="" label="Cookie" placeholder="Cookie..."
			handleChange={handleChangeCookie} value={cookie}
		/>
	)
}

