import React from 'react'
import PropTypes from 'prop-types'
import { CHANGE_VALUE } from 'tg_constants/StepTypes/ElemSetValue.types'
import TextInput from 'tg_common/TextInput'
import { CURRENT_FORM_REDUCER } from 'tg_constants/TestTypes/StepForm.types'
import { CHANGE_HEIGHT, CHANGE_WIDTH } from 'tg_constants/StepTypes/AssertWindowSize.types'

AssertWindowSizeForm.propTypes = {
}

export default function AssertWindowSizeForm(props) {

    const {reducer, selectedStep} = props

	let ss = selectedStep[0]

    let height = ss.form.height
    let width = ss.form.width

    function handleChangeHeight(e){
		reducer({type:CURRENT_FORM_REDUCER, action: CHANGE_HEIGHT, params: {height: e.target.value}})
	}

    function handleChangeWidth(e){
		reducer({type:CURRENT_FORM_REDUCER, action: CHANGE_WIDTH, params: {width: e.target.value}})
	}

	return (
        <>
            <TextInput label="Height:" type="number"
                handleChange={handleChangeHeight} value={height}
            />
            <TextInput label="Width:" type="number"
                handleChange={handleChangeWidth} value={width}
            />
        </>
	)
}

