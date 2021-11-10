import React from 'react'
import PropTypes from 'prop-types'
import { EQUALS, STARTS_WITH, ENDS_WITH, CONTAIN, MATCH } from 'tg_constants/StepTypes/StepFormCommon.types'

import { comparatorOptions } from 'tg_constants/Selects'

AssertHTMLPropRow.propTypes = {
	id: PropTypes.number,
}


export default function AssertHTMLPropRow(props) {

	const {form, parentForm} = props

    console.log(form);


    let comparator = comparatorOptions.filter((o) => {
        return o.value == form.comparator
    })[0].name
    let sign = (form.sign) ? 'is' : 'is NOT'

	return (
		<div>
            Assert that HTML attribute "<span className="text-danger">{form.property}</span>" of element with css value
            "<span className="text-danger">{parentForm.cssSelector}</span>"&nbsp;
            <span className="text-danger">{sign} {comparator}</span>&nbsp;
            "<span className="text-danger">{form.text}</span>"
		</div>
	)
}

