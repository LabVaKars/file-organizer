import React from 'react'
import PropTypes from 'prop-types'

CookieDeleteRow.propTypes = {
	id: PropTypes.number,
}

export default function CookieDeleteRow(props) {

	const {form} = props

	return (
		<div>
            Delete cookie "<span className="text-danger">{form.cookie}</span>".  
		</div>
	)
}

