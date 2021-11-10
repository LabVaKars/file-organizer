import React from 'react'
import PropTypes from 'prop-types'

import { comparatorOptions } from 'tg_constants/Selects'

WindowSetCoorRow.propTypes = {
	id: PropTypes.number,
}


export default function WindowSetCoorRow(props) {

	const {form} = props

	return (
		<div>
            Set browser window coordinates to values&nbsp;
            X:<span className="text-danger"> {form.x}</span>&nbsp;
            Y:<span className="text-danger"> {form.y}</span>&nbsp;
		</div>
	)
}

