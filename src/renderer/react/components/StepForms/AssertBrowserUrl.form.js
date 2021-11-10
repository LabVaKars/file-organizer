import React from 'react'
import PropTypes from 'prop-types'
import { CURRENT_FORM_REDUCER } from 'tg_constants/TestTypes/StepForm.types'
import Select from 'tg_common/Select'
import { CHANGE_SIGN, CHANGE_TEXT, CHANGE_COMPARATOR } from 'tg_constants/StepTypes/AssertBrowserUrl.types'
import { signOptions, comparatorOptions} from 'tg_constants/Selects'

AssertBrowserUrlForm.propTypes = {
}

export default function AssertBrowserUrlForm(props) {

    const {reducer, selectedStep} = props

	let ss = selectedStep[0]

    let sign = ss.form.sign
    let comparator = ss.form.comparator
    let text = ss.form.text

    function handleChangeSign(e){
		reducer({type:CURRENT_FORM_REDUCER, action: CHANGE_SIGN, params: {sign: e.target.value}})
	}

	function handleChangeComparator(e){
		reducer({type:CURRENT_FORM_REDUCER, action: CHANGE_COMPARATOR, params: {comparator: e.target.value}})
	}

    function handleTextChange(e){
        reducer({type:CURRENT_FORM_REDUCER, action: CHANGE_TEXT, params: {text: e.target.value}})
    }

    let selectedSignIdx = signOptions.findIndex((o) => {
        return o.value == sign
    })

    let selectedComparatorIdx = comparatorOptions.findIndex((o) => {
        return o.value == comparator
    })



	return (
        <>
            <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Element </span>
                </div>
                <Select options={signOptions} handleChange={handleChangeSign} selectedIdx={selectedSignIdx}/>
                <Select options={comparatorOptions} handleChange={handleChangeComparator} selectedIdx={selectedComparatorIdx}/>
                <input className="form-control" placeholder="Text to compare..." type="text" name=""
                    onChange={handleTextChange} value={text}/>
                <div className="input-group-append">
                    <span className="input-group-text">&nbsp;</span>
                </div>
            </div>
        </>
	)
}

