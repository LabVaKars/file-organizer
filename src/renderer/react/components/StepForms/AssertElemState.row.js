import React from 'react'
import PropTypes from 'prop-types'
import { IS_PRESENT, IS_VISIBLE, IS_ENABLED, IS_FOCUSED, IS_SELECTED } from 'tg_constants/StepTypes/AssertElemState.types'
import { elemStateOptions } from 'tg_constants/Selects'

AssertElemStateRow.propTypes = {
	id: PropTypes.number,
}


export default function AssertElemStateRow(props) {

	const {form, parentForm} = props

    let estype = elemStateOptions.filter((o) => {
        return o.value == form.estype
    })[0].name
    let sign = (form.sign) ? 'is' : 'is NOT'

    console.log(estype, " ", sign);


	return (
		<div>
            Assert that element with css value "<span className="text-danger">{parentForm.cssSelector}</span>" <span className="text-danger">{sign} {estype}</span>
		</div>
	)
}

