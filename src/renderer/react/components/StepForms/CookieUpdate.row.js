import React from 'react'
import PropTypes from 'prop-types'

CookieUpdateRow.propTypes = {
	id: PropTypes.number,
}

export default function CookieUpdateRow(props) {

	const {form} = props

	return (
		<div>
            Update cookie "<span className="text-danger">{form.cookie}</span>" 
			with value "<span className="text-danger">{form.value}</span>".  
		</div>
	)
}

