import React from 'react'
import PropTypes from 'prop-types'

import { comparatorOptions } from 'tg_constants/Selects'

AssertCookieRow.propTypes = {
	id: PropTypes.number,
}


export default function AssertCookieRow(props) {

	const {form} = props

    let comparator = comparatorOptions.filter((o) => {
        return o.value == form.comparator
    })[0].name
    let sign = (form.sign) ? 'is' : 'is NOT'

	return (
		<div>
            Assert that cookie <span className="text-danger">{form.cookie}</span>&nbsp;
            <span className="text-danger">{sign} {comparator}</span>&nbsp;
            "<span className="text-danger">{form.text}</span>"
		</div>
	)
}

