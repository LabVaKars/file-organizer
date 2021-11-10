import React from 'react'
import PropTypes from 'prop-types'
import { CHANGE_VALUE } from 'tg_constants/StepTypes/ElemSetValue.types'
import TextInput from 'tg_common/TextInput'
import { CURRENT_FORM_REDUCER } from 'tg_constants/TestTypes/StepForm.types'
import Select from 'tg_common/Select'
import { CHANGE_PROPERTY, CHANGE_SIGN, CHANGE_TEXT, CHANGE_COMPARATOR } from 'tg_constants/StepTypes/AssertElemValue.types'
import { signOptions, comparatorOptions} from 'tg_constants/Selects'
import { CHANGE_X_COOR, CHANGE_Y_COOR } from 'tg_constants/StepTypes/AssertElemCoor.types'
import { CHANGE_HEIGHT, CHANGE_WIDTH } from 'tg_constants/StepTypes/AssertElemSize.types'

AssertElemSizeForm.propTypes = {
}

export default function AssertElemSizeForm(props) {

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

